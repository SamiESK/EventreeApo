export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 8) return 'Password must be at least 8 characters long.'
  return ''
}

export function ConfirmPasswordValidator(confirm_password, password) {
  if (!confirm_password) return "Confirm passwords can't be empty."
  if (confirm_password.length < 8) return 'Password must be at least 8 characters long.'
  if (password !== confirm_password) return 'Passwords must match.'
  return ''
}

