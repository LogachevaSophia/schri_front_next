import React from "react";

import { Modal as ModalAnt } from "antd";
import Button from "../Button/Button";


interface ModalProps {
    open: boolean;
    // onClick?: () => void; // Обработчик клика
    children: React.ReactNode; // Текст или вложенные компоненты
    // className?: string; // Дополнительный класс для стилизации
    onCancel: ()=> void;
    title: string;
    width: any;
}

const Modal: React.FC<ModalProps> = ({open, children, title, onCancel, ...props}) => {
    const footer = [
        // <Button key="back" >
        //   Войти
        // </Button>,
        // <Button key="submit" variant={"outlined"} >
        //   Отменить
        // </Button>,
      ]

    return (

        <ModalAnt
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}
            {...props}
            >
                {children}

        </ModalAnt>
    )



}

export default Modal;