import { useState } from "react";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths.ts";
import Icon from "../iconify/Icon.tsx";

export default function UserMenu() {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
        <button 
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center 
        hover:bg-gray-300 transition-colors duration-200 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
        >            

            <Icon icon="mdi:user" />
        </button>
        {isOpen && (
        <div className="absolute top-11 right-4 w-48 bg-white shadow-md rounded-md" >
            <ul>
                <li>    
                    <button className="flex items-center gap-2 p-2" onClick={() => navigate(paths.auth.login)} >
                        <Icon icon="mdi:login" width={20} height={20} />
                        <span className="text-sm font-medium">Iniciar sesión</span>
                    </button>
                </li>
            </ul>
        </div>
        )}
    </div>
  )
}
