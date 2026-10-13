const documents = {
  badge: "Document Processing",

  hero: {
    title: "Turn documents",
    titleHighlight: "into useful information.",
    description:
      "We automate document reading, extraction, classification, and validation so your team can stop entering information manually.",
    button: "Automate your documents",
  },

  solutions: {
    eyebrow: "Document AI",
    title: "From file to data.",

    items: [
      {
        icon: "mdi:file-document-multiple-outline",
        title: "Information Extraction",
        description:
          "We extract data from documents to eliminate manual data entry and turn files into usable information.",
      },
      {
        icon: "mdi:text-box-search-outline",
        title: "Classification",
        description:
          "We automatically classify documents and content according to the rules or categories of your operation.",
      },
      {
        icon: "mdi:file-check-outline",
        title: "Validation",
        description:
          "We detect missing information, inconsistencies, and conditions that require review.",
      },
      {
        icon: "mdi:database-arrow-right-outline",
        title: "Documents → Systems",
        description:
          "We move processed information into databases, APIs, ERPs, or other tools.",
      },
    ],
  },

  flow: {
    eyebrow: "Workflow",
    title: "A document can trigger an entire process.",
    description:
      "Extracted information does not have to remain on a screen. We can validate it, store it, send it to another system, and use it to trigger automated workflows.",

    steps: [
      {
        icon: "mdi:file-upload-outline",
        title: "Document received",
      },
      {
        icon: "mdi:text-search",
        title: "Information detected",
      },
      {
        icon: "mdi:shield-check-outline",
        title: "Data validated",
      },
      {
        icon: "mdi:database-arrow-right-outline",
        title: "Information recorded",
      },
      {
        icon: "mdi:lightning-bolt-outline",
        title: "Process activated",
      },
    ],
  },

  cta: {
    title: "Does your team capture data from documents?",
    description:
      "We can turn that manual work into a digital process.",
    button: "Talk to Mistli",
  },
};

export default documents;