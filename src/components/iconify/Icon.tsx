import { Icon as Iconify } from '@iconify/react';
import { memo } from 'react';

const Icon = ({
    icon, 
    className,
    width = 24,
    height = 24  
}: {
    icon:string, 
    className?:string,
    width?:number,
    height?:number
}) => {
  return <Iconify icon={icon} className={className} width={width} height={height} />
}

export default memo(Icon);
