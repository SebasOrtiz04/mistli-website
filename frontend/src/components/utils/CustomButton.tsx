import Icon from "../iconify/Icon";

type ButtonColor =
  | 'primary'
  | 'gradient'
  | 'cyan'
  | 'magenta'
  | 'white'
  | 'dark';


interface ICustomButtonProps {
    label: string;
    color?: ButtonColor;
    href?: string;
    target?: string;
    onClick?: () => void;
    icon?: string;
}

export default function CustomButton({
    label,
    color = 'primary',
    href ,
    target = '_blank',
    onClick,
    icon
}: ICustomButtonProps) {

    const colorDict = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white",

  gradient:
    "bg-gradient-to-r from-cyan-400 via-brand-500 to-magenta-400 text-white",

  cyan:
    "bg-cyan-400 hover:bg-cyan-500 text-ink-950",

  magenta:
    "bg-magenta-400 hover:bg-magenta-500 text-white",

  white:
    "bg-white hover:bg-ink-100 text-ink-950",

  dark:
    "bg-ink-800 hover:bg-ink-700 text-white",
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
