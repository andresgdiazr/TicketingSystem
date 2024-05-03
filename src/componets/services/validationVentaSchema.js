const validationVentaSchema = {
  codigoEntrada: [
    (value) =>
      value.trim() === "" ? "El número de entrada es requerído" : undefined,
  ],
  nombreComprador: [
    (value) =>
      value.trim() === "" ? "El Nombre del Comprador es requerído" : undefined,
    (value) =>
      value.length < 3 ? "Nombre debe tener almenos 3 caracteres" : undefined,
  ],
  emailComprador: [
    (value) =>
      value.trim() === "" ? "El Email del Comprador es requerído" : undefined,
    (value) =>
      !/^\S+@\S+\.\S+$/.test(value) ? "Email no es válido" : undefined,
  ],
  nomtoPago: [
    (value) =>
      value.trim() === "" ? "El monto pagado es requerído" : undefined,
    (value) =>
      value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined,
  ],
  formaPago: [
    (value) =>
      value.trim() === "" ? "El tipo de pago es requerído" : undefined,
  ],
  metodoPago: [
    (value) =>
      value.trim() === "" ? "El método de pago es requerído" : undefined,
  ],
};

export default validationVentaSchema;
