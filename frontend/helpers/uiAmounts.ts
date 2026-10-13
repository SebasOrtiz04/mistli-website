export const formatearDinero = (cantidad: number): string => {
  const opciones: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "MXN",
  };

  return cantidad.toLocaleString("es-MX", opciones);
};


export function usernamePro(): string {
  const words = ["mistli","zen","nova","byte","orbit","lunar"];
  const word = words[Math.floor(Math.random() * words.length)];
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2,5);

  return `${word}_${time}${rand}`;
}