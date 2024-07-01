import React, { ChangeEvent, useEffect, useRef, useState } from "react"

import styles from "./SerachInput.module.scss"
import classNames from "classnames";
import { useLocation, useParams } from "react-router-dom";
import { useRouter } from "next/router";

type SearchInput = {
    placeholder: string,
    onChange: (title: string) => void ,
    value?: string,
}


const SearchInput: React.FC<SearchInput> = ({ placeholder, onChange, value="" }) => {

    const [focused, setFocused] = useState(false);
    const [value_, setValue] = useState(value);
    const router = useRouter();

    useEffect(() => {
        const { title } = router.query;
        console.log(title)
        if (typeof title === "string") {
            setValue(title)
          console.log("Title from URL:", title);
        }
      }, [router.query]);

    const onFocusEvent = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.type === "focus") {
            setFocused(true);
        }
        if (event.type === "blur") {
            setFocused(false);
        }

        setFocused(event.type === "focus");
    };

    const onRemove = () => {
        
        console.log("remove")
        setValue("");
        onChange("");
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange(event.target.value);
    }


    return (
        <div className={classNames(styles["search-input-container"], { [styles.active]: value_ })}>
            <input
                className={classNames(styles["search-input"], { [styles.active]: value_ })}
                onChange={onChangeInput}
                onBlur={onFocusEvent}
                onFocus={onFocusEvent}
                value={value_}
                placeholder={placeholder}
            />
            <div className={styles["search-icon"]}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.833313 7.66683C0.833313 11.4335 3.89998 14.5002 7.66665 14.5002C11.4333 14.5002 14.5 11.4335 14.5 7.66683C14.5 3.90016 11.4333 0.833496 7.66665 0.833496C3.89998 0.833496 0.833313 3.90016 0.833313 7.66683ZM1.83331 7.66683C1.83331 4.4535 4.44665 1.8335 7.66665 1.8335C10.8866 1.8335 13.5 4.4535 13.5 7.66683C13.5 10.8802 10.8866 13.5002 7.66665 13.5002C4.44665 13.5002 1.83331 10.8802 1.83331 7.66683ZM14.3133 15.0201C14.4133 15.1201 14.54 15.1667 14.6666 15.1667C14.7933 15.1667 14.92 15.1201 15.02 15.0201C15.2133 14.8268 15.2133 14.5068 15.02 14.3134L13.6866 12.9801C13.4933 12.7867 13.1733 12.7867 12.98 12.9801C12.7866 13.1734 12.7866 13.4934 12.98 13.6868L14.3133 15.0201Z" fill="#999FA6" />
                </svg>
            </div>
            {value_ && <button className={styles["delete-icon"]} onClick={onRemove}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 15.1667C4.04659 15.1667 0.833252 11.9534 0.833252 8.00004C0.833252 4.04671 4.04659 0.833374 7.99992 0.833374C11.9533 0.833374 15.1666 4.04671 15.1666 8.00004C15.1666 11.9534 11.9533 15.1667 7.99992 15.1667ZM7.99992 1.83337C4.59992 1.83337 1.83325 4.60004 1.83325 8.00004C1.83325 11.4 4.59992 14.1667 7.99992 14.1667C11.3999 14.1667 14.1666 11.4 14.1666 8.00004C14.1666 4.60004 11.3999 1.83337 7.99992 1.83337ZM6.11325 10.3867C5.98658 10.3867 5.85991 10.34 5.75991 10.24C5.56658 10.0467 5.56658 9.72666 5.75991 9.53332L7.29325 7.99999L5.75991 6.46666C5.56658 6.27332 5.56658 5.95332 5.75991 5.75999C5.95325 5.56666 6.27325 5.56666 6.46658 5.75999L7.99991 7.29332L9.53325 5.75999C9.72658 5.56666 10.0466 5.56666 10.2399 5.75999C10.4332 5.95332 10.4332 6.27332 10.2399 6.46666L8.70658 7.99999L10.2399 9.53332C10.4332 9.72666 10.4332 10.0467 10.2399 10.24C10.1399 10.34 10.0132 10.3867 9.88658 10.3867C9.75991 10.3867 9.63325 10.34 9.53325 10.24L7.99991 8.70666L6.46658 10.24C6.37325 10.34 6.23991 10.3867 6.11325 10.3867Z" fill="#999FA6" />
                </svg>

            </button>}
        </div>
    );
}

export default SearchInput;