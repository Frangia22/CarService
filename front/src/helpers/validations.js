export const validateRequired = (value, fieldName) => {
  return String(value) ? '' : `${fieldName} es requerido`
}
export const validateIsNumber = (value, fieldName) => {
  return !isNaN(value) && value > 0 ? '' : `${fieldName} debe ser un numero`
}
export const validatePatent = (value) => {
  const patentRegex = /^(?:[A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{1})$/
  return patentRegex.test(value) ? '' : 'Patente debe tener el formato ABC999 o AA999BC'
}
