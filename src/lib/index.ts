export function formattCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  }).format(value);
}

export const formattDate = (date: string) => {
  const fecha = new Date(date).toLocaleDateString();
  return fecha;
};
