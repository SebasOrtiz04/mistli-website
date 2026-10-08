const login = {
  navigation: {
    documentation: "Documentation",
    support: "Support",
  },

  hero: {
    title: "Welcome back",
    description: "Access the secure Mistli management portal.",
  },

  form: {
    email: {
      label: "Work Email",
      placeholder: "name@company.com",
    },

    password: {
      label: "Password",
      forgot: "Forgot password?",
      placeholder: "••••••••",
      show: "Show password",
      hide: "Hide password",
    },

    keepSigned: "Keep me signed in for 30 days",

    submit: {
      loading: "Signing in...",
      default: "Sign In to Portal",
    },

    divider: "or",

    google: "Continue with Single Sign-On",
  },

  security: {
    protectedBy: "Protected by Google Firebase",
    workspace: "Secure access to your Mistli workspace",
  },

  validation: {
    required: "Please enter your email and password.",
    googleError: "Could not sign in with Google.",
    registerError: "Could not create the account. Please verify your information.",
    wrongPassword: "Incorrect password.",
    generic: "An error occurred while signing in.",
  },

  footer: {
    copyright: "© 2024 Mistli Technologies Inc. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    status: "System Status",
  },
} as const;

export default login;