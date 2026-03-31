import Icon from "../iconify/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { toggleLanguage } from '../../redux'

export default function Nabvar({role}:{role:string}) {
    const idioma = useSelector((state: RootState) => state.locale.language)
    const dispatch = useDispatch<AppDispatch>()
    const Bandera=idioma=="ES"?"circle-flags:mx":"circle-flags:us-um"
    const navigate = useNavigate()
    
    return (
        <nav className="hidden sm:flex justify-between py-4 text-lg gap-7">
            <button onClick={() => navigate("/#ia")}>IA</button>
            <button onClick={() => navigate("/#backend")}>Backend</button>
            <button onClick={() => navigate("/#frontend")}>Frontend</button>
            <button onClick={() => navigate("/#documentos")}>Documentos</button>
            {/* <a href="#automatizaciones">Automatizaciones</a> */}
            <button onClick={() => navigate("/noticias")}>Noticias</button>
            {role === "admin" && (
                <button onClick={() => navigate("/createnews")}>Crear Noticia</button>
            )}
            <div
                className=" hover:cursor-pointer"
                onClick={() => dispatch(toggleLanguage())}
            >
                <Icon icon={Bandera} />
            </div>
        </nav>
    )
}