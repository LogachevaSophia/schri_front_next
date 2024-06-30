import React from "react";
import styles from "./Button.module.scss"
import classnames from "classnames"

export interface IButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    isDisabled?: boolean;
    variant?: ButtonVariant;
    isActive?: boolean;
    onclick?: (e: React.MouseEvent) => void;
    loading?: boolean;
}
export type ButtonVariant = "outlined" | "text" | "icon" | "fullfied";


const Button: React.FC<IButtonProps> = ({ className,
    isDisabled = false,
    type,
    variant = "fullfied",
    children = "Button",
    onclick,
    isActive = false,
    loading = false,
    ...rest }) => {


    return (
        <button
            className={classnames(
                styles.button,
                styles[variant]
            )}
            type={type}
            disabled={isActive}
            onClick={onclick}
            {...rest}>
            {children}


        </button>
        
    )

}

export default Button;