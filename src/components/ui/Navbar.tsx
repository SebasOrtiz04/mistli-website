import Icon from "../iconify/Icon";

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { toggleLanguage } from '../../redux'

export default function Nabvar() {
    const idioma = useSelector((state: RootState) => state.locale.language)
    const dispatch = useDispatch<AppDispatch>()
    const Bandera=idioma=="ES"?"circle-flags:mx":"circle-flags:us-um"
    return (
        <nav className="hidden sm:flex justify-between py-4 text-lg gap-7">
            <a href="#ia">IA</a>
            <a href="#backend">Backend</a>
            <a href="#frontend">Frontend</a>
            <a href="#mobile">Mobile</a>
            <a href="#automatizaciones">Automatizaciones</a>
            <div
                className=" hover:cursor-pointer"
                onClick={() => dispatch(toggleLanguage())}
            >
                <Icon icon={Bandera} />
            </div>
        </nav>
    )
}