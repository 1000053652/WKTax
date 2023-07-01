export default UserErrorValidation = value => {
  switch (value) {
    case 'UserAlreadyExists':
      return alert('User already exists.')
    case 'DuplicateUserName':
      return alert('The username is already used by another user.')
    case 'DuplicateEmail':
      return alert('The email is already used by another user.')
    case 'InvalidCredentials':
      return alert('The credentials are invalid.')
    case 'UserNameAsPassword':
      return alert(
        'Not more than 3 adjacent characters of User ID allowed in password.'
      )
    case 'InvalidToken':
      return alert('Invalid token.')
    case 'InvalidIdOrToken':
      return alert('Registration link is not valid.')
    case 'ConfirmationPending':
      return alert("The user's email is not confirmed yet.")
    case 'InvalidMfaSession':
      return alert('MFA session is invalid.')
    case 'InvalidId':
      return alert('Invalid Id.')
    case 'InvalidPassword':
      return alert('Your current password is invalid.')
    case 'ViolationLastPasswordsCannotUse':
      return alert('You cannot repeat the last 5 passwords.')
    case 'ViolationMaxTimePasswordCanChangeIn24Hours':
      alert(
        'To protect your account, you cannot change your password more than 5 times in a day. Please wait 24 hours to reset your password.'
      )
      break
    case 'NotFound':
      return alert('Not Found.')
    case 'InvalidCountryCodeOrPhoneNumber':
      return alert('PhoneNumber or CountryCode is invalid.')
    case 'TokenExpired':
      return alert('Login token is expired.')
    case 'InvalidCaptcha':
      return alert('Captcha is not valid, Please try again.')

    default:
      return alert('Something went wrong')
  }
}
