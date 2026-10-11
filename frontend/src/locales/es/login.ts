const login = {
  navigation: {
    documentation: "Documentación",
    support: "Soporte",
  },

  hero: {
    title: "Bienvenido de nuevo",
    description: "Accede al portal seguro de administración de Mistli.",
  },

  form: {
    email: {
      label: "Correo de trabajo",
      placeholder: "nombre@empresa.com",
    },

    password: {
      label: "Contraseña",
      forgot: "¿Olvidaste tu contraseña?",
      placeholder: "••••••••",
      show: "Mostrar contraseña",
      hide: "Ocultar contraseña",
    },

    keepSigned: "Mantener mi sesión iniciada durante 30 días",

    submit: {
      loading: "Iniciando sesión...",
      default: "Iniciar sesión en el portal",
    },

    divider: "o",

    google: "Continuar con Single Sign-On",
  },

  security: {
    protectedBy: "Protegido por Google Firebase",
    workspace: "Acceso seguro a tu espacio de trabajo de Mistli",
  },

  validation: {
    required: "Por favor ingresa tu correo y contraseña.",
    googleError: "No se pudo iniciar sesión con Google.",
    registerError: "No se pudo crear la cuenta. Verifica tus datos.",
    wrongPassword: "Contraseña incorrecta.",
    generic: "Ocurrió un error al iniciar sesión.",
  },

  footer: {
    copyright: "© 2024 Mistli Technologies Inc. Todos los derechos reservados.",
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    status: "Estado del sistema",
  },
} as const;


export default login;