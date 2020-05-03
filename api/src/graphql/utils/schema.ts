export function getCommonResponseFields(): string {
  return `
    code: String!
    success: Boolean!
    message: String
    errors: JSON
  `;
}
