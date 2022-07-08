import React, {FC} from 'react';
import styles from './ButtonStandart.module.scss';
import cn from 'classnames'



interface ButtonProps{
    variant? : "primary" | "secondary",
    children: React.ReactNode
}
const ButtonStandart : FC<ButtonProps> = ( {children,variant = "primary"} ) => {
    return (
        <button className={cn(styles.btn,styles[`${variant}`])}>
            { children }
        </button>
    );
}

export default ButtonStandart;