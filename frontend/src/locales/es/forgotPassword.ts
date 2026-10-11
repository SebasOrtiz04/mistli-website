const forgotPassword = {
  close: "Cerrar",

  form: {
    title: "Restablece tu contraseña",
    description:
      "Ingresa tu correo de trabajo y te enviaremos un enlace para restablecer tu contraseña.",

    email: {
      label: "Correo de trabajo",
      placeholder: "nombre@empresa.com",
    },

    submit: {
      sending: "Enviando...",
      send: "Enviar enlace de recuperación",
    },

    back: "Volver a iniciar sesión",
  },

  sent: {
    title: "Revisa tu bandeja de entrada",
    description: "Enviamos un enlace para restablecer tu contraseña a",

    info: "Revisa tu bandeja de entrada y sigue el enlace para crear una nueva contraseña. No olvides revisar tu carpeta de spam.",

    back: "Volver a iniciar sesión",

    retry: {
      question: "¿No lo recibiste?",
      action: "Intentar de nuevo",
    },
  },

  validation: {
    invalidEmail: "Ingresa un correo válido.",
    userNotFound: "No encontramos una cuenta con ese correo.",
    invalidEmailFormat: "El formato del correo no es válido.",
    sendError: "No se pudo enviar el correo. Intenta de nuevo.",
  },
} as const;

export default forgotPassword;