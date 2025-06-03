import styles from '../../../styles/animated.module.css';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import Icon from "../../../components/iconify/Icon.tsx";
import { PLANSAUTO,PLANSFULL,PLANSIA, PLANSMOBILE } from './Planes.ts';

const Pricing: React.FC = () => {
    const idioma = useSelector((state: RootState) => state.locale.language);
    const [selected, setSelected] = useState<'IA' | 'Automation' | 'Fullstack' | 'Mobile'>('IA');
    const PLANS={
        IA:PLANSIA,
        Automation:PLANSAUTO,
        Fullstack:PLANSFULL,
        Mobile:PLANSMOBILE
    }
    const disclaimer = {
        ES: "*Precio de desarrollo únicamente. Costos adicionales por separado: APIs de IA, servicios cloud, hardware especializado (GPU), integración con tus APIs/servicios existentes (CRM, ERP, sistemas de pago, etc.) y mantenimiento técnico según uso real.",
        EN: "*Development price only. Additional costs billed separately: AI APIs, cloud services, specialized hardware (GPU), integration with your existing APIs/services (CRM, ERP, payment systems, etc.) and technical maintenance based on actual usage."
    }


    const areas = {
        IA: { ES: "IA", EN: "AI" },
        Automation: { ES: "Automatización", EN: "Automation" },
        Fullstack: { ES: "FullStack", EN: "FullStack" },
        Mobile: { ES: "Móvil", EN: "Mobile" }
    } as const;

    type AreaKey = keyof typeof areas;
    type PlanKey = keyof typeof PLANSAUTO; // Todas las áreas comparten keys: basic, standard, premium

    return (
        <div className={styles.gradientBackground}>
            <div className="flex flex-wrap gap-3 mb-8 p-1 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                {(Object.keys(areas) as AreaKey[]).map((clave: AreaKey) => (
                    <label
                        key={clave}
                        className={`group cursor-pointer px-6 py-3 rounded-xl font-medium text-sm
                            transition-all duration-300 ease-out transform hover:scale-105
                            relative overflow-hidden backdrop-blur-sm
                            ${selected === clave
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/25 border-0'
                            : 'bg-white/70 text-gray-700 border border-gray-200/50 hover:bg-white hover:shadow-md hover:border-gray-300/70 hover:text-gray-900'
                        }`}
                    >
                        {/* Efecto de brillo en hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                            ${selected === clave ? 'opacity-100' : 'opacity-50'}`} />
                        
                        <input
                            type="radio"
                            name="opcion"
                            value={clave}
                            className="hidden"
                            checked={selected === clave}
                            onChange={() => setSelected(clave)}
                        />
                        
                        {/* Indicador de selección */}
                        {selected === clave && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm
                                animate-pulse" />
                        )}
                        
                        <span className="relative z-10 flex items-center gap-2">
                            {areas[clave][idioma]}
                            {selected === clave && (
                                <svg className={`${styles.animateFadeIn} w-4 h-4`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </span>
                    </label>
                ))}
            </div>
<div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full">
    {(Object.keys(PLANS[selected]) as PlanKey[]).map((planKey) => {
        const plan = PLANS[selected][planKey];
        return (
            <div 
                key={planKey}
                className={`${styles.planCard} ${plan.popular ? styles.popularPlan : styles.regularPlan}
                    relative overflow-visible backdrop-blur-lg rounded-3xl p-8
                    transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-3
                    flex flex-col justify-between group`}
            >
                {/* Badge Popular mejorado - FUERA del contenedor principal */}
                {plan.popular && (
                    <div className={`${styles.popularBadge} absolute -top-4 -right-4 z-50`}>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl border-2 border-white/20">
                            <span className="flex items-center gap-1">
                                ⭐ Most Popular
                            </span>
                        </div>
                    </div>
                )}

                {/* Efectos de fondo animados */}
                <div className={`${styles.backgroundGlow} absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                <div className={`${styles.backgroundPattern} absolute inset-0 opacity-10 rounded-3xl`} />

                <div className="relative z-10">
                    {/* Header del plan */}
                    <div className="mb-8">
                        <h2 className={`${styles.planTitle} text-2xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent`}>
                            {plan.title[idioma]}
                        </h2>
                        <p className="text-blue-200/80 text-base leading-relaxed">
                            {plan.description[idioma]}
                        </p>
                    </div>

                    {/* Separador elegante */}
                    <div className={`${styles.divider} relative mb-8`}>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
                        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent blur-sm" />
                    </div>

                    {/* Precio con estilo destacado */}
                    <div className="mb-8">
                        <h3 className={`${styles.price} text-4xl font-black mb-2 bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent`}>
                            {plan.cost[idioma]}
                        </h3>
                    </div>

                    {/* Lista de características mejorada */}
                    <ul className="space-y-4 mb-8">
                        {plan.items[idioma].map((item, index) => (
                            <li 
                                key={index} 
                                className={`${styles.featureItem} flex items-start gap-3 text-blue-100 group/item`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`${styles.checkIcon} flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center mt-0.5`}>
                                    <Icon icon="line-md:confirm" className="w-4 h-4 text-white" />
                                </div>
                                <span className="group-hover/item:text-blue-50 transition-colors duration-300">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Botón de WhatsApp mejorado */}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={plan.whatsAppText[idioma]}
                    className={`${styles.whatsappButton} relative mt-auto overflow-hidden
                        bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500
                        text-white font-semibold text-center py-4 px-6 rounded-2xl
                        transition-all duration-300 ease-out
                        hover:shadow-2xl hover:shadow-green-500/25 hover:-translate-y-1
                        flex items-center justify-center gap-3 group/button`}
                    aria-label="Abrir WhatsApp"
                >
                    {/* Efecto de brillo en el botón */}
                    <div className={`${styles.buttonShimmer} absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        transform -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700`} />
                    
                    <Icon 
                        icon="logos:whatsapp-icon" 
                        className="w-6 h-6 group-hover/button:scale-110 transition-transform duration-300" 
                    />
                    <span className="relative z-10">{plan.textButton[idioma]}</span>
                    
                    {/* Flecha animada */}
                    <svg 
                        className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        );
    })}
</div>
            <div>{disclaimer[idioma]}</div>
        </div>
    );
};

export default Pricing;