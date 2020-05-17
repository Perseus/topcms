export function getCommonResponseFields(): string {
  return `
    code: String!
    success: Boolean!
    message: String
    errors: JSON
  `;
}

export function getCommonRequestFields(): string {
  return `
  code
  message
  success
  errors
  `;
}
