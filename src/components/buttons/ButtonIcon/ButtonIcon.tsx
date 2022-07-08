import React, {FC} from 'react';
import styles from './ButtonIcon.module.scss';
import cn from "classnames";


interface ButtonProps{
    variant? : "red" | "purple" | "blue",
    children: React.ReactNode
}
const ButtonIcon : FC<ButtonProps> = ({ children, variant}) => {
    return (
        <button className={cn(styles.btn,styles[`${variant}`])}>
            { children }
        </button>
    );
}

export default ButtonIcon;