type Plan = {
  title: string;
  description: string;
  cost: string;
  items: string;
  textButton: string;
  whatsAppText: string;
  popular: boolean;
};

type Plans = {
  basic: Plan;
  standard: Plan;
  premium: Plan;
};


/* ======================================================
   AUTOMATIZACIÓN EMPRESARIAL
====================================================== */
export const PLANSAUTO: Plans = {
  basic: {
    popular: false,
    title: "home.pricing.plansauto.basic.title",
    description: "home.pricing.plansauto.basic.description",
    cost: "home.pricing.plansauto.basic.cost",
    items: "home.pricing.plansauto.basic.items",
    textButton: "home.pricing.plansauto.basic.textButton",
    whatsAppText: "home.pricing.plansauto.basic.whatsAppText",
  },

  standard: {
    popular: true,
    title: "home.pricing.plansauto.standard.title",
    description: "home.pricing.plansauto.standard.description",
    cost: "home.pricing.plansauto.standard.cost",
    items: "home.pricing.plansauto.standard.items",
    textButton: "home.pricing.plansauto.standard.textButton",
    whatsAppText: "home.pricing.plansauto.standard.whatsAppText",
  },

  premium: {
    popular: false,
    title: "home.pricing.plansauto.premium.title",
    description: "home.pricing.plansauto.premium.description",
    cost: "home.pricing.plansauto.premium.cost",
    items: "home.pricing.plansauto.premium.items",
    textButton: "home.pricing.plansauto.premium.textButton",
    whatsAppText: "home.pricing.plansauto.premium.whatsAppText",
  },
};

/* ======================================================
   DESARROLLO WEB
====================================================== */
export const PLANSFULL: Plans = {
  basic: {
    popular: false,
    title: "home.pricing.plansfull.basic.title",
    description: "home.pricing.plansfull.basic.description",
    cost: "home.pricing.plansfull.basic.cost",
    items: "home.pricing.plansfull.basic.items",
    textButton: "home.pricing.plansfull.basic.textButton",
    whatsAppText: "home.pricing.plansfull.basic.whatsAppText",
  },

  standard: {
    popular: true,
    title: "home.pricing.plansfull.standard.title",
    description: "home.pricing.plansfull.standard.description",
    cost: "home.pricing.plansfull.standard.cost",
    items: "home.pricing.plansfull.standard.items",
    textButton: "home.pricing.plansfull.standard.textButton",
    whatsAppText: "home.pricing.plansfull.standard.whatsAppText",
  },

  premium: {
    popular: false,
    title: "home.pricing.plansfull.premium.title",
    description: "home.pricing.plansfull.premium.description",
    cost: "home.pricing.plansfull.premium.cost",
    items: "home.pricing.plansfull.premium.items",
    textButton: "home.pricing.plansfull.premium.textButton",
    whatsAppText: "home.pricing.plansfull.premium.whatsAppText",
  },
};

export const PLANSIA: Plans = {
  basic: {
    popular: false,
    title: "home.pricing.plansia.basic.title",
    description: "home.pricing.plansia.basic.description",
    cost: "home.pricing.plansia.basic.cost",
    items: "home.pricing.plansia.basic.items",
    textButton: "home.pricing.plansia.basic.textButton",
    whatsAppText: "home.pricing.plansia.basic.whatsAppText",
  },

  standard: {
    popular: true,
    title: "home.pricing.plansia.standard.title",
    description: "home.pricing.plansia.standard.description",
    cost: "home.pricing.plansia.standard.cost",
    items: "home.pricing.plansia.standard.items",
    textButton: "home.pricing.plansia.standard.textButton",
    whatsAppText: "home.pricing.plansia.standard.whatsAppText",
  },

  premium: {
    popular: false,
    title: "home.pricing.plansia.premium.title",
    description: "home.pricing.plansia.premium.description",
    cost: "home.pricing.plansia.premium.cost",
    items: "home.pricing.plansia.premium.items",
    textButton: "home.pricing.plansia.premium.textButton",
    whatsAppText: "home.pricing.plansia.premium.whatsAppText",
  },
};

export const PLANSMOBILE: Plans = {
  basic: {
    popular: true,
    title: "home.pricing.plansmobile.basic.title",
    description: "home.pricing.plansmobile.basic.description",
    cost: "home.pricing.plansmobile.basic.cost",
    items: "home.pricing.plansmobile.basic.items",
    textButton: "home.pricing.plansmobile.basic.textButton",
    whatsAppText: "home.pricing.plansmobile.basic.whatsAppText",
  },

  standard: {
    popular: false,
    title: "home.pricing.plansmobile.standard.title",
    description: "home.pricing.plansmobile.standard.description",
    cost: "home.pricing.plansmobile.standard.cost",
    items: "home.pricing.plansmobile.standard.items",
    textButton: "home.pricing.plansmobile.standard.textButton",
    whatsAppText: "home.pricing.plansmobile.standard.whatsAppText",
  },

  premium: {
    popular: false,
    title: "home.pricing.plansmobile.premium.title",
    description: "home.pricing.plansmobile.premium.description",
    cost: "home.pricing.plansmobile.premium.cost",
    items: "home.pricing.plansmobile.premium.items",
    textButton: "home.pricing.plansmobile.premium.textButton",
    whatsAppText: "home.pricing.plansmobile.premium.whatsAppText",
  },
};
