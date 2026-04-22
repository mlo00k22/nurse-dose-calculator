const TREATMENTS = [
  {
    id: "norepinephrine",
    name: "NOR-EPINEPHRINE INFUSION",
    stockAmount: 12,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "38 ml D5W/NS + 12 ml Nor-epinephrine = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 0.05, max: 1 }, emergency: { min: 0.1, max: 1 }, stable: { min: 0.05, max: 0.5 } },
      pediatric: { icu: { min: 0.05, max: 1 }, emergency: { min: 0.1, max: 1 }, stable: { min: 0.05, max: 0.5 } },
      adult: { icu: { min: 0.05, max: 1 }, emergency: { min: 0.1, max: 2 }, stable: { min: 0.05, max: 0.5 } }
    }
  },
  {
    id: "dopamine",
    name: "DOPAMINE INFUSION",
    stockAmount: 200,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "45 ml D5W/NS + 5 ml Dopamine = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } },
      pediatric: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } },
      adult: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } }
    }
  },
  {
    id: "rocuronium",
    name: "ROCURONIUM INFUSION",
    stockAmount: 50,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "45 ml D5W/NS + 5 ml Rocuronium = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 5, max: 12 }, emergency: { min: 8, max: 12 }, stable: { min: 5, max: 10 } },
      pediatric: { icu: { min: 5, max: 12 }, emergency: { min: 8, max: 12 }, stable: { min: 5, max: 10 } },
      adult: { icu: { min: 5, max: 12 }, emergency: { min: 8, max: 12 }, stable: { min: 5, max: 10 } }
    }
  },
  {
    id: "ketamine",
    name: "KETAMINE INFUSION",
    stockAmount: 200,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mg/kg/min",
    preparation: "30 ml D5W/NS + 20 ml Ketamine = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 0.05, max: 0.3 }, emergency: { min: 0.1, max: 0.5 }, stable: { min: 0.05, max: 0.2 } },
      pediatric: { icu: { min: 0.05, max: 0.3 }, emergency: { min: 0.1, max: 0.5 }, stable: { min: 0.05, max: 0.2 } },
      adult: { icu: { min: 0.05, max: 0.3 }, emergency: { min: 0.1, max: 0.5 }, stable: { min: 0.05, max: 0.2 } }
    }
  },
  {
    id: "dobutamine",
    name: "DOBUTAMINE INFUSION",
    stockAmount: 250,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "45 ml D5W/NS + 5 ml Dobutamine = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } },
      pediatric: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } },
      adult: { icu: { min: 2, max: 20 }, emergency: { min: 5, max: 20 }, stable: { min: 2, max: 10 } }
    }
  },
  {
    id: "lasix",
    name: "LASIX INFUSION",
    stockAmount: 100,
    stockUnit: "mg",
    dilutionMl: 30,
    timeFactor: 1,
    unitNote: "Order usually in mg/kg/hr",
    preparation: "20 ml D5W/NS + 10 ml Lasix = 30 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 0.1, max: 0.4 }, emergency: { min: 0.2, max: 0.5 }, stable: { min: 0.1, max: 0.3 } },
      pediatric: { icu: { min: 0.1, max: 0.4 }, emergency: { min: 0.2, max: 0.5 }, stable: { min: 0.1, max: 0.3 } },
      adult: { icu: { min: 0.1, max: 0.4 }, emergency: { min: 0.2, max: 0.5 }, stable: { min: 0.1, max: 0.3 } }
    }
  },
  {
    id: "heparin",
    name: "HEPARIN INFUSION",
    concentrationAmount: 25000,
    concentrationUnit: "IU",
    quantityMl: 50,
    unitNote: "Use direct desired dose in units",
    preparation: "45 ml NS + 25,000 IU Heparin = 50 ml",
    mode: "quantityByConcentration",
    ranges: {
      neonate: { icu: { min: 10, max: 20 }, emergency: { min: 15, max: 25 }, stable: { min: 10, max: 15 } },
      pediatric: { icu: { min: 10, max: 20 }, emergency: { min: 15, max: 25 }, stable: { min: 10, max: 15 } },
      adult: { icu: { min: 10, max: 20 }, emergency: { min: 15, max: 25 }, stable: { min: 10, max: 15 } }
    }
  },
  {
    id: "fentanyl",
    name: "FENTANYL INFUSION",
    stockAmount: 500,
    stockUnit: "mcg",
    dilutionMl: 30,
    timeFactor: 1,
    unitNote: "Order usually in mcg/kg/hr",
    preparation: "20 ml D5W/NS + 10 ml Fentanyl = 30 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 1, max: 5 }, emergency: { min: 2, max: 7 }, stable: { min: 1, max: 3 } },
      pediatric: { icu: { min: 1, max: 5 }, emergency: { min: 2, max: 7 }, stable: { min: 1, max: 3 } },
      adult: { icu: { min: 1, max: 5 }, emergency: { min: 2, max: 7 }, stable: { min: 1, max: 3 } }
    }
  },
  {
    id: "midazolam",
    name: "MIDAZOLAM INFUSION",
    stockAmount: 45,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "41 ml D5W/NS + 9 ml Midazolam = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 0.05, max: 0.2 }, emergency: { min: 0.1, max: 0.3 }, stable: { min: 0.05, max: 0.1 } },
      pediatric: { icu: { min: 0.05, max: 0.2 }, emergency: { min: 0.1, max: 0.3 }, stable: { min: 0.05, max: 0.1 } },
      adult: { icu: { min: 0.05, max: 0.2 }, emergency: { min: 0.1, max: 0.3 }, stable: { min: 0.05, max: 0.1 } }
    }
  },
  {
    id: "epinephrine",
    name: "EPINEPHRINE INFUSION",
    stockAmount: 1,
    stockUnit: "mg",
    dilutionMl: 50,
    timeFactor: 60,
    unitNote: "Order usually in mcg/kg/min",
    preparation: "40 ml D5W/NS + 10 ml Epinephrine = 50 ml",
    mode: "weightedWithStock",
    ranges: {
      neonate: { icu: { min: 0.01, max: 0.3 }, emergency: { min: 0.05, max: 0.5 }, stable: { min: 0.01, max: 0.1 } },
      pediatric: { icu: { min: 0.01, max: 0.3 }, emergency: { min: 0.05, max: 0.5 }, stable: { min: 0.01, max: 0.1 } },
      adult: { icu: { min: 0.01, max: 0.5 }, emergency: { min: 0.05, max: 1 }, stable: { min: 0.01, max: 0.2 } }
    }
  }
];
