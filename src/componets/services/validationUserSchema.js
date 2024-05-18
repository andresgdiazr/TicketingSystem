const validationSchema = {
  email: [
    (value) => (value.trim() === "" ? "El Email es requerido" : undefined),
    (value) =>
      !/^\S+@\S+\.\S+$/.test(value) ? "Email no es válido" : undefined,
  ],
};

export default validationSchema;
