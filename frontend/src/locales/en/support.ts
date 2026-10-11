const support = {
  hero: {
    badge: "Mistli Support",
    title: "How can we",
    titleHighlight: "help you?",
    description:
      "Find answers to frequently asked questions or send us a message. Our team will get back to you as soon as possible.",
  },

  categories: {
    account: "Account & access",
    security: "Security",
    billing: "Billing",
    integrations: "Integrations",
  },

  faq: {
    sectionLabel: "Help center",
    title: "Frequently asked questions",
    items: [
      {
        question: "How can I reset my password?",
        answer:
          "Go to the login page and select the password recovery option. You will receive a link by email to create a new password.",
      },
      {
        question: "Can I pay for software in installments?",
        answer:
          "Yes. You can pay in 2, 3, or up to 12 installments depending on the software you purchase. Contact us for more information.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes, if we previously developed a module for you or your business that supports data export, you can. Otherwise, you will not be able to. If you already have a module for this and it is not working, contact us.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can request cancellation through the support form.",
      },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    title: "Contact support",
    description:
      "Didn't find the answer? Send us a message and we'll help you with your case.",

    success: {
      title: "Message sent.",
      description: "We received your request and will reply to",
      asap: "as soon as possible.",
      newMessage: "Send another message",
    },

    form: {
      name: {
        label: "Name *",
        placeholder: "Your name",
      },
      email: {
        label: "Email *",
        placeholder: "you@company.com",
      },
      subject: {
        label: "Subject",
        placeholder: "How can we help you?",
      },
      message: {
        label: "Message *",
        placeholder: "Tell us what is happening or what you need...",
      },

      submit: {
        sending: "Sending...",
        send: "Send message",
      },

      privacy:
        "Your information will only be used to handle your request.",
    },
  },

  validation: {
    required: "Complete your name, email, and message.",
    shortMessage: "Please tell us a little more about the problem.",
    sendError: "We couldn't send your message.",
  },
} as const;


export default support;