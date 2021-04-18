export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 8) return 'Password must be at least 8 characters long.'
  return ''
}

export function ConfirmPasswordValidator(repeatPassword, password) {
  if (!repeatPassword) return "Confirm passwords can't be empty."
  if (repeatPassword.length < 8) return 'Password must be at least 8 characters long.'
  if (password !== repeatPassword) return 'Passwords must match.'
  return ''
}

