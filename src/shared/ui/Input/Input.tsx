import React from "react";
import styles from '../../ui/Input/Input.module.scss'
import classnames from "classnames";
// import classnames from "classnames";


export interface inputProps {
    placeholder?: string;
    label?: string;
    error?: string;
    isRequired: boolean;
    onChange: () => void;
}


const Input: React.FC<inputProps> = ({ label, error, isRequired = false, ...props }) => {
    // console.log(props)
    return (
        <div>
            <label>
                <span>
                    {label}
                    {isRequired && <span style={{ color: '#F04075' }}>*</span>} {/* Отображаем звездочку, если поле обязательно */}
                </span>


                <input 
                
                 {...props}
                 className={classnames(styles.input, {[styles.error]: !!error})} 
                  />
            </label>
            <br></br>
            {error && <span style={{ color: '#F04075' }}>{error}</span>}
        </div>


    )

}

export default Input;