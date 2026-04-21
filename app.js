const treatmentSelect = document.getElementById("treatment");
const doctorOrderValueInput = document.getElementById("doctorOrderValue");
const doctorOrderUnitSelect = document.getElementById("doctorOrderUnit");
const weightInput = document.getElementById("weightKg");
const form = document.getElementById("doseForm");
const resultBox = document.getElementById("result");
const formulaInfoBox = document.getElementById("formulaInfo");

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

function showResult(value, treatment) {
  resultBox.classList.remove("hidden");
  const unit = treatment.mode === "mgToMlConversion" ? "ml" : "ml/hr";
  resultBox.innerHTML = `
    <h2>Calculated rate</h2>
    <p><strong>${formatNumber(value)} ${unit}</strong></p>
  `;
}

function validateInputs(treatment, doctorOrderValue, weightKg, orderMode) {
  if (!treatment) return "Please select treatment.";
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

  const validationMessage = validateInputs(
    treatment,
    doctorOrderValue,
    weightKg,
    orderMode
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
  showResult(rate, treatment);
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
