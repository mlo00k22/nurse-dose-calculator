const treatmentSelect = document.getElementById("treatment");
const doctorOrderValueInput = document.getElementById("doctorOrderValue");
const doctorOrderUnitSelect = document.getElementById("doctorOrderUnit");
const weightInput = document.getElementById("weightKg");
const form = document.getElementById("doseForm");
const resultBox = document.getElementById("result");
const formulaInfoBox = document.getElementById("formulaInfo");
const ageGroupSelect = document.getElementById("ageGroup");
const conditionSelect = document.getElementById("condition");

function formatNumber(value) {
  return Number(value).toFixed(3).replace(/\.?0+$/, "");
}

function getSelectedTreatment() {
  const selectedId = treatmentSelect.value;
  return TREATMENTS.find((item) => item.id === selectedId);
}

function renderTreatments() {
  TREATMENTS.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    treatmentSelect.appendChild(option);
  });
}

function renderFormulaInfo(treatment) {
  formulaInfoBox.classList.remove("hidden");
  formulaInfoBox.innerHTML = `
    <h2>Formula details</h2>
    <p><strong>Preparation:</strong> ${treatment.preparation}</p>
    <p><strong>Input guidance:</strong> ${treatment.unitNote}</p>
  `;
}

function getCalculatedRate(treatment, doctorOrderValue, weightKg, orderMode) {
  const effectiveOrder =
    orderMode === "kg_based" ? doctorOrderValue * weightKg : doctorOrderValue;

  if (treatment.mode === "weightedWithStock") {
    return (
      (effectiveOrder * treatment.timeFactor * treatment.dilutionMl) /
      1000 /
      treatment.stockAmount
    );
  }

  if (treatment.mode === "weightedNoStock") {
    return (effectiveOrder * treatment.timeFactor * treatment.dilutionMl) / 1000;
  }

  if (treatment.mode === "quantityByConcentration") {
    return (effectiveOrder * treatment.quantityMl) / treatment.concentrationAmount;
  }

  if (treatment.mode === "quantityByStock") {
    return (effectiveOrder * treatment.quantityMl) / treatment.stockAmount;
  }

  if (treatment.mode === "mgToMlConversion") {
    return effectiveOrder * treatment.conversionFactor;
  }

  return NaN;
}

// ✅ التعديل المهم هنا (ربط العمر + الحالة + التحذير)
function showResult(value, treatment, ageGroup, condition) {
  resultBox.classList.remove("hidden");

  const unit = treatment.mode === "mgToMlConversion" ? "ml" : "ml/hr";

  let warning = "";
  let color = "#15803d";
console.log("DEBUG:", treatment, ageGroup, condition, range);
  const range = treatment.ranges?.[ageGroup]?.[condition];

  if (range) {
    if (value < range.min) {
      warning = "⚠️ Below recommended range";
      color = "#d97706";
    } 
    else if (value > range.max * 1.5) {
      warning = "🚨 CRITICAL OVERDOSE";
      color = "#7f1d1d";

      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
      audio.play();
    }
    else if (value > range.max) {
      warning = "⚠️ Above recommended range";
      color = "#b91c1c";
    } 
    else {
      warning = "✔ Within recommended range";
      color = "#15803d";
    }
  } else {
    warning = "No reference range available";
    color = "#6b7280";
  }

  resultBox.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #ffffff, #f0f9ff);
      border-left: 6px solid ${color};
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      text-align: center;
    ">
      <h2 style="margin:0; color:#0f6f87;">Calculated Dose</h2>
      
      <p style="font-size:28px; font-weight:bold; margin:10px 0; color:#114e60;">
        ${formatNumber(value)} ${unit}
      </p>

      <p style="font-size:14px; font-weight:bold; color:${color};">
        ${warning}
      </p>

      <p style="font-size:12px; color:#666;">
        Medication: ${treatment.name}
      </p>
    </div>
  `;
}

function validateInputs(treatment, doctorOrderValue, weightKg, orderMode, ageGroup, condition) {
  if (!treatment) return "Please select treatment.";
  if (!ageGroup) return "Please select age group.";
  if (!condition) return "Please select patient condition.";

  if (!Number.isFinite(doctorOrderValue) || doctorOrderValue <= 0) {
    return "Doctor order value must be greater than zero.";
  }

  if (orderMode === "kg_based" && (!Number.isFinite(weightKg) || weightKg <= 0)) {
    return "Weight must be greater than zero for per-kilogram orders.";
  }

  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const button = document.querySelector("button");
  button.innerText = "Calculating...";
  button.disabled = true;

  const treatment = getSelectedTreatment();
  const doctorOrderValue = Number(doctorOrderValueInput.value);
  const weightKg = Number(weightInput.value);
  const orderMode = doctorOrderUnitSelect.value;
  const ageGroup = ageGroupSelect.value;
  const condition = conditionSelect.value;

  const validationMessage = validateInputs(
    treatment,
    doctorOrderValue,
    weightKg,
    orderMode,
    ageGroup,
    condition
  );

  if (validationMessage) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `<p class="error">${validationMessage}</p>`;

    button.innerText = "Calculate";
    button.disabled = false;
    return;
  }

  const rate = getCalculatedRate(treatment, doctorOrderValue, weightKg, orderMode);

  if (!Number.isFinite(rate)) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `<p class="error">Unable to calculate. Check formula setup.</p>`;

    button.innerText = "Calculate";
    button.disabled = false;
    return;
  }

  setTimeout(() => {
    showResult(rate, treatment, ageGroup, condition); // ✅ التعديل هنا
    renderFormulaInfo(treatment);

    button.innerText = "Calculate";
    button.disabled = false;
  }, 800);
});

treatmentSelect.addEventListener("change", () => {
  const treatment = getSelectedTreatment();
  if (!treatment) {
    formulaInfoBox.classList.add("hidden");
    return;
  }
  renderFormulaInfo(treatment);
});

renderTreatments();
