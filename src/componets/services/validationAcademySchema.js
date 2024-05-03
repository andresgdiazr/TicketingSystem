const validationSchema = {
  codigo: [
    (value) => (value.trim() === "" ? "El código es requerído" : undefined),
    (value) =>
      value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined,
  ],
  nombre: [
    (value) => (value.trim() === "" ? "El Nombre es requerído" : undefined),
  ],
  telefono: [
    (value) =>
      value.trim() === "" ? "El número de teléfono es requerído" : undefined,
    (value) =>
      value.length < 9
        ? "El  número debe tener almenos 9 caracteres"
        : undefined,
  ],
  email: [
    (value) => (value.trim() === "" ? "El Email es requerído" : undefined),
    (value) =>
      !/^\S+@\S+\.\S+$/.test(value) ? "Email no es válido" : undefined,
  ],
  url: [(value) => (value.trim() === "" ? "La URL es requerída" : undefined)],
  // ubicacion: [
  //   (value) => (value.trim() === "" ? "La ubicacion es requerída" : undefined),
  // ],
  adress: [
    (value) =>
      value.trim() === ""
        ? "La descripción de habitación es requerída"
        : undefined,
  ],
};

export default validationSchema;
