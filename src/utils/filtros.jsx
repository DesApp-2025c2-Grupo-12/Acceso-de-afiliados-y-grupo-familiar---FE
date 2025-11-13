export const normalizar = (txt) =>
  String(txt || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export const coincide = (obj, campos, term) =>
  campos.some((c) => normalizar(obj[c]).includes(term));