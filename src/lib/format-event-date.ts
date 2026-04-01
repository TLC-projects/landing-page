export function formatEventDate(dateStr: string, locale = 'es-CO') {
  const [year, month, day] = dateStr.slice(0, 10).split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  return {
    dia: fecha.toLocaleDateString(locale, { day: '2-digit' }),
    mes: fecha.toLocaleDateString(locale, { month: 'long' })
  };
}
