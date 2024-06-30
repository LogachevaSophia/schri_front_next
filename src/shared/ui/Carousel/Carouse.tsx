import React, { useState } from "react";
import styles from "./Carousel.module.scss"; // Подключаем SCSS стили
type Props = {
    children: React.ReactNode,
    slidesToShow?: number;
    slidesToScroll?: number;
}
const CustomCarousel: React.FC<Props> = ({ children , slidesToShow = 1, slidesToScroll = 1, ...props}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);
    console.log(slidesToShow)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + slidesToScroll;
            return nextIndex >= totalSlides ? 0 : nextIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex - slidesToScroll;
            return nextIndex < 0 ? totalSlides - slidesToShow : nextIndex;
        });
    };

    const disablePrev = currentIndex === 0;
    const disableNext = currentIndex + slidesToShow >= totalSlides;

    return (
        <div className={styles["custom-carousel"]} {...props}>
            <div className={styles["carousel-slides"]} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {React.Children.map(children, (child, index) => (
                    <div className={styles["slide"]}>{child}</div>
                ))}
            </div>
            <button className={styles["prev-button"]} onClick={prevSlide} disabled={disablePrev}>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_5131_4436)">
                        <rect x="4" y="4" width="48" height="48" rx="24" fill="white" shapeRendering="crispEdges" />
                        <path d="M32 39.56C31.7467 39.56 31.4934 39.4667 31.2934 39.2667L22.6 30.5734C21.1867 29.16 21.1867 26.84 22.6 25.4267L31.2934 16.7334C31.68 16.3467 32.32 16.3467 32.7067 16.7334C33.0934 17.12 33.0934 17.76 32.7067 18.1467L24.0134 26.84C23.3734 27.48 23.3734 28.52 24.0134 29.16L32.7067 37.8534C33.0934 38.24 33.0934 38.88 32.7067 39.2667C32.5067 39.4534 32.2534 39.56 32 39.56Z" 
                        fill={disablePrev ? "#ABABAB" : "#1B1F23"} />
                    </g>
                    <defs>
                        <filter id="filter0_d_5131_4436" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5131_4436" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5131_4436" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </button>
            <button className={styles["next-button"]} onClick={nextSlide} disabled={disableNext}>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_5131_4388)">
                        <rect x="4" y="4" width="48" height="48" rx="24" fill="white" shapeRendering="crispEdges" />
                        <path d="M23.88 39.56C23.6266 39.56 23.3733 39.4667 23.1733 39.2667C22.7866 38.88 22.7866 38.24 23.1733 37.8534L31.8666 29.16C32.5066 28.52 32.5066 27.48 31.8666 26.84L23.1733 18.1467C22.7866 17.76 22.7866 17.12 23.1733 16.7334C23.56 16.3467 24.2 16.3467 24.5866 16.7334L33.28 25.4267C33.96 26.1067 34.3466 27.0267 34.3466 28C34.3466 28.9734 33.9733 29.8934 33.28 30.5734L24.5866 39.2667C24.3866 39.4534 24.1333 39.56 23.88 39.56Z" fill={disableNext ? "#ABABAB" : "#1B1F23"}/>
                    </g>
                    <defs>
                        <filter id="filter0_d_5131_4388" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5131_4388" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5131_4388" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </button>
        </div>
    );
};

export default CustomCarousel;
