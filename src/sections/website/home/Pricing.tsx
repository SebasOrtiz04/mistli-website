import { formatearDinero } from "../../../helpers/uiAmounts.ts";
import styles from '../../../styles/animated.module.css';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import Icon from "../../../components/iconify/Icon.tsx";

type idiomaString = {
    ES: string;
    EN: string;
};

type Language = "EN" | "ES";

type Items = {
    [key in Language]: string[];
};

type Plan = {
    title: idiomaString;
    description: idiomaString;
    cost: idiomaString;
    items: Items;
    textButton: idiomaString;
    whatsAppText: idiomaString;
    popular: boolean;
};

type Plans = {
    basic: Plan;
    standard: Plan;
    premium: Plan;
};

const baseWhats = "https://wa.me/2213295628?text=";

const Pricing: React.FC = () => {

    const idioma = useSelector((state: RootState) => state.locale.language);
    const [selected, setSelected] = useState<'IA' | 'Automation' | 'Fullstack'>('IA');

    const PLANSAUTO: Plans = {
        basic: {
            popular: false,
            title: {
                ES: "Automatización básica",
                EN: "Basic Automation",
            },
            description: {
                ES: "Automatización básica para su empresa",
                EN: "Basic automation for your company",
            },
            cost: {
                ES: `${formatearDinero(2000)} MXN`,
                EN: `${formatearDinero(100)} USD`,
            },
            items: {
                EN: ["10 Users Included", "2 GB of Storage", "Help Center Access", "Email Support"],
                ES: ["10 usuarios Incluidos", "2 GB de Almacenamiento", "Acceso a Centro de Ayuda", "Soporte vía Email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar los servicios de automatización básica para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring basic automation services for my business."),
            },
        },
        standard: {
            popular: true,
            title: {
                ES: "Automatización estándar",
                EN: "Standard Automation",
            },
            description: {
                ES: "Automatización intermedia para su empresa",
                EN: "Standard automation for your company",
            },
            cost: {
                ES: `${formatearDinero(5000)} MXN`,
                EN: `${formatearDinero(250)} USD`,
            },
            items: {
                EN: ["20 users included", "10 GB of storage", "Help center access", "Priority email support"],
                ES: ["20 usuarios incluidos", "10 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte prioritario vía email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan estándar de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard automation plan for my business."),
            },
        },
        premium: {
            popular: false,
            title: {
                ES: "Automatización premium",
                EN: "Premium Automation",
            },
            description: {
                ES: "Automatización avanzada para su empresa",
                EN: "Premium automation for your company",
            },
            cost: {
                ES: `${formatearDinero(10000)} MXN`,
                EN: `${formatearDinero(500)} USD`,
            },
            items: {
                EN: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
                ES: ["50 usuarios incluidos", "30 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte telefónico y por email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan premium de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium automation plan for my business."),
            },
        },
    };
    const PLANSFULL = {
        basic: {
            popular: false,
            title: {
                ES: "Software completo",
                EN: "complete soft",
            },
            description: {
                ES: "Automatización básica para su empresa",
                EN: "Basic automation for your company",
            },
            cost: {
                ES: `${formatearDinero(2000)} MXN`,
                EN: `${formatearDinero(100)} USD`,
            },
            items: {
                EN: ["10 Users Included", "2 GB of Storage", "Help Center Access", "Email Support"],
                ES: ["10 usuarios Incluidos", "2 GB de Almacenamiento", "Acceso a Centro de Ayuda", "Soporte vía Email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar los servicios de automatización básica para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring basic automation services for my business."),
            },
        },
        standard: {
            popular: true,
            title: {
                ES: "Automatización estándar",
                EN: "Standard Automation",
            },
            description: {
                ES: "Automatización intermedia para su empresa",
                EN: "Standard automation for your company",
            },
            cost: {
                ES: `${formatearDinero(5000)} MXN`,
                EN: `${formatearDinero(250)} USD`,
            },
            items: {
                EN: ["20 users included", "10 GB of storage", "Help center access", "Priority email support"],
                ES: ["20 usuarios incluidos", "10 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte prioritario vía email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan estándar de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard automation plan for my business."),
            },
        },
        premium: {
            popular: false,
            title: {
                ES: "Automatización premium",
                EN: "Premium Automation",
            },
            description: {
                ES: "Automatización avanzada para su empresa",
                EN: "Premium automation for your company",
            },
            cost: {
                ES: `${formatearDinero(10000)} MXN`,
                EN: `${formatearDinero(500)} USD`,
            },
            items: {
                EN: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
                ES: ["50 usuarios incluidos", "30 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte telefónico y por email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan premium de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium automation plan for my business."),
            },
        },
    };
    const PLANSIA: Plans = {
        basic: {
            popular: false,
            title: {
                ES: "Automatización básica",
                EN: "Basic Automation",
            },
            description: {
                ES: "Automatización básica para su empresa",
                EN: "Basic automation for your company",
            },
            cost: {
                ES: `${formatearDinero(2000)} MXN`,
                EN: `${formatearDinero(100)} USD`,
            },
            items: {
                EN: ["10 Users Included", "2 GB of Storage", "Help Center Access", "Email Support"],
                ES: ["10 usuarios Incluidos", "2 GB de Almacenamiento", "Acceso a Centro de Ayuda", "Soporte vía Email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar los servicios de automatización básica para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring basic automation services for my business."),
            },
        },
        standard: {
            popular: true,
            title: {
                ES: "Automatización estándar",
                EN: "Standard Automation",
            },
            description: {
                ES: "Automatización intermedia para su empresa",
                EN: "Standard automation for your company",
            },
            cost: {
                ES: `${formatearDinero(5000)} MXN`,
                EN: `${formatearDinero(250)} USD`,
            },
            items: {
                EN: ["20 users included", "10 GB of storage", "Help center access", "Priority email support"],
                ES: ["20 usuarios incluidos", "10 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte prioritario vía email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan estándar de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard automation plan for my business."),
            },
        },
        premium: {
            popular: false,
            title: {
                ES: "Automatización premium",
                EN: "Premium Automation",
            },
            description: {
                ES: "Automatización avanzada para su empresa",
                EN: "Premium automation for your company",
            },
            cost: {
                ES: `${formatearDinero(10000)} MXN`,
                EN: `${formatearDinero(500)} USD`,
            },
            items: {
                EN: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
                ES: ["50 usuarios incluidos", "30 GB de almacenamiento", "Acceso al centro de ayuda", "Soporte telefónico y por email"],
            },
            textButton: {
                EN: "WhatsApp",
                ES: "WhatsApp",
            },
            whatsAppText: {
                ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan premium de automatización para mi negocio"),
                EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium automation plan for my business."),
            },
        },
    };

    const areas = {
        IA: { ES: "IA", EN: "AI" },
        Automation: { ES: "Automatización", EN: "Automation" },
        Fullstack: { ES: "FullStack", EN: "FullStack" }
    } as const;

    type AreaKey = keyof typeof areas;

    return (
        <div className={styles.gradientBackground}>
            <div className="flex gap-4 mb-8">
                {(Object.keys(areas) as AreaKey[]).map((clave) => (
                    <label
                        key={clave}
                        className={`cursor-pointer px-4 py-2 rounded-full border transition-all 
                            ${selected === clave
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                        <input
                            type="radio"
                            name="opcion"
                            value={clave}
                            className="hidden"
                            checked={selected === clave}
                            onChange={() => setSelected(clave)}
                        />
                        {areas[clave][idioma]}
                    </label>
                ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
                {Object.keys(PLANS).map((planKey) => {
                    const plan = PLANS[planKey as keyof typeof PLANS];
                    return (
                        <div 
                            key={planKey}
                            className={`${plan.popular ? "bg-[#2a2a3d] border border-blue-600 shadow-xl" : "bg-[#1f1f2f] shadow-lg"} 
                            transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl 
                            rounded-2xl p-6 relative flex flex-col justify-between`}
                        >
                            <div>
                                {plan.popular && (
                                    <span className="absolute top-4 right-4 bg-blue-800 text-xs text-white px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                )}
                                <h2 className="text-xl font-semibold mb-2">{plan.title[idioma]}</h2>
                                <p className="text-sm text-gray-400 mb-6">{plan.description[idioma]}</p>
                                <hr className="border-gray-700 mb-6" />
                                <h3 className="text-3xl font-bold mb-4">{plan.cost[idioma]}</h3>
                                <ul className="space-y-2 mb-6 text-sm">
                                    {plan.items[idioma].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2 text-blue-400">
                                            <Icon icon="line-md:confirm" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={plan.whatsAppText[idioma]}
                                className="mt-auto bg-green-700 hover:bg-blue-600 text-white text-center py-2 rounded-xl transition"
                            >
                                {plan.textButton[idioma]}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pricing;