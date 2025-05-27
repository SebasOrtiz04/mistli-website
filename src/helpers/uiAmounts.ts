export const formatearDinero = (cantidad: number): string => {
  const opciones: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "MXN",
  };

  return cantidad.toLocaleString("es-MX", opciones);
};
