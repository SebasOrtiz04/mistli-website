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


    const areas = {
        IA: { ES: "IA", EN: "AI" },
        Automation: { ES: "Automatización", EN: "Automation" },
        Fullstack: { ES: "FullStack", EN: "FullStack" },
        Mobile: { ES: "Móbil", EN: "Mobile" }
    } as const;

    type AreaKey = keyof typeof areas;
    type PlanKey = keyof typeof PLANSAUTO; // Todas las áreas comparten keys: basic, standard, premium

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
                {(Object.keys(PLANS[selected]) as PlanKey[]).map((planKey) => {
                    const plan = PLANS[selected][planKey];
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
                                className="mt-auto bg-green-700 hover:bg-green-800 text-white text-center py-2 px-4 rounded-xl transition flex items-center justify-center gap-2"
                                aria-label="Abrir WhatsApp"
                            >
                                <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                                <span>{plan.textButton[idioma]}</span>
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pricing;