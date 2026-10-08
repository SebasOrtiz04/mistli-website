const forgotPassword = {
  close: "Close",

  form: {
    title: "Reset your password",
    description:
      "Enter your work email and we'll send you a link to reset your password.",

    email: {
      label: "Work Email",
      placeholder: "name@company.com",
    },

    submit: {
      sending: "Sending...",
      send: "Send Reset Link",
    },

    back: "Back to sign in",
  },

  sent: {
    title: "Check your inbox",
    description: "We sent a password reset link to",

    info: "Check your inbox and follow the link to create a new password. Don't forget to check your spam folder.",

    back: "Back to sign in",

    retry: {
      question: "Didn't receive it?",
      action: "Try again",
    },
  },

  validation: {
    invalidEmail: "Enter a valid email address.",
    userNotFound: "We couldn't find an account with that email.",
    invalidEmailFormat: "The email format is not valid.",
    sendError: "We couldn't send the email. Please try again.",
  },
} as const;


export default forgotPassword;