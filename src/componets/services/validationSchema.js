const validationSchema = {
  dni: [
    (value) =>
      value.trim() === "" ? "El número de documento es requerído" : undefined,
    (value) =>
      value.length < 8 ? "El DNI debe tener almenos 8 caracteres" : undefined,
    (value) =>
      value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined,
  ],
  nombre: [
    (value) => (value.trim() === "" ? "El Nombre es requerído" : undefined),
    (value) =>
      value.length < 3 ? "Nombre debe tener almenos 3 caracteres" : undefined,
  ],
  celular: [
    (value) =>
      value.trim() === "" ? "El número de celular es requerído" : undefined,
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
  // academia: [
  //   (value) =>
  //     value.trim() === "" ? "El nombre de la academia es requerído" : undefined,
  // ],
  adress: [
    (value) =>
      value.trim() === ""
        ? "La descripción de habitación es requerída"
        : undefined,
  ],
};

export default validationSchema;
