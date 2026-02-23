import Icon from "../iconify/Icon";

type ButtonColor = 'blue' | 'purple' | 'white';

interface ICustomButtonProps {
    label: string;
    color?: ButtonColor;
    href?: string;
    target?: string;
    onClick?: () => void;
    icon?: string;
}

type IColorDict = Record<ButtonColor, string>;

export default function CustomButton({
    label,
    color = 'blue',
    href ,
    target = '_blank',
    onClick,
    icon
}: ICustomButtonProps) {

    const colorDict : IColorDict = {
        blue: "bg-blue-600 hover:bg-blue-700 text-white",
        purple: "bg-purple-600 hover:bg-purple-700 text-white",
        white: "bg-white hover:bg-gray-300 text-blue-900"
    };

    const baseClassName = ` ${colorDict[color]} inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl
                 font-semibold text-lg
                transition transform hover:scale-105 hover:shadow-lg`;

    if(href)
        return (
            <a href={href} target={target} className={baseClassName}>
            {icon && <Icon icon={icon} className="w-5 h-5" />}
            {label}
            </a>
        )
  
    return (
            <button
                onClick={onClick}
                className={baseClassName}
            >
                {icon && <Icon icon={icon} className="w-5 h-5" />}
                {label}
            </button>
    )
}
