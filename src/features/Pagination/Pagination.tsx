import React, { useEffect } from "react";
import styles from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}>
                {isFirstPage ?
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_5134_4748)">
                            <rect x="4" y="4" width="32" height="32" rx="16" fill="#E9EAED" shapeRendering="crispEdges" />
                            <path d="M21.9995 25.78C21.8729 25.78 21.7462 25.7333 21.6462 25.6333L17.2995 21.2867C16.5929 20.58 16.5929 19.42 17.2995 18.7133L21.6462 14.3667C21.8395 14.1733 22.1595 14.1733 22.3529 14.3667C22.5462 14.56 22.5462 14.88 22.3529 15.0733L18.0062 19.42C17.6862 19.74 17.6862 20.26 18.0062 20.58L22.3529 24.9267C22.5462 25.12 22.5462 25.44 22.3529 25.6333C22.2529 25.7267 22.1262 25.78 21.9995 25.78Z" fill="#ABABAB" />
                        </g>
                        <defs>
                            <filter id="filter0_d_5134_4748" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5134_4748" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5134_4748" result="shape" />
                            </filter>
                        </defs>
                    </svg>

                    : <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_5134_4805)">
                            <rect x="4" y="4" width="32" height="32" rx="16" fill="white" shapeRendering="crispEdges" />
                            <path d="M21.9995 25.78C21.8729 25.78 21.7462 25.7333 21.6462 25.6333L17.2995 21.2867C16.5929 20.58 16.5929 19.42 17.2995 18.7133L21.6462 14.3667C21.8395 14.1733 22.1595 14.1733 22.3529 14.3667C22.5462 14.56 22.5462 14.88 22.3529 15.0733L18.0062 19.42C17.6862 19.74 17.6862 20.26 18.0062 20.58L22.3529 24.9267C22.5462 25.12 22.5462 25.44 22.3529 25.6333C22.2529 25.7267 22.1262 25.78 21.9995 25.78Z" fill="#1B1F23" />
                        </g>
                        <defs>
                            <filter id="filter0_d_5134_4805" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5134_4805" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5134_4805" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                }
            </button>
            {currentPage}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}>
                {isLastPage ?

                    <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                        <g filter="url(#filter0_d_5134_4807)">
                            <rect x="4" y="4" width="32" height="32" rx="16" fill="E9EAED" shapeRendering="crispEdges" />
                            <path d="M17.9397 25.78C17.8131 25.78 17.6864 25.7333 17.5864 25.6333C17.3931 25.44 17.3931 25.12 17.5864 24.9267L21.9331 20.58C22.2531 20.26 22.2531 19.74 21.9331 19.42L17.5864 15.0733C17.3931 14.88 17.3931 14.56 17.5864 14.3667C17.7797 14.1733 18.0997 14.1733 18.2931 14.3667L22.6397 18.7133C22.9797 19.0533 23.1731 19.5133 23.1731 20C23.1731 20.4867 22.9864 20.9467 22.6397 21.2867L18.2931 25.6333C18.1931 25.7267 18.0664 25.78 17.9397 25.78Z" fill="#ABABAB" />
                        </g>
                        <defs>
                            <filter id="filter0_d_5134_4748" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5134_4748" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5134_4748" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    : <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_5134_4807)">
                            <rect x="4" y="4" width="32" height="32" rx="16" fill="white" shapeRendering="crispEdges" />
                            <path d="M17.9397 25.78C17.8131 25.78 17.6864 25.7333 17.5864 25.6333C17.3931 25.44 17.3931 25.12 17.5864 24.9267L21.9331 20.58C22.2531 20.26 22.2531 19.74 21.9331 19.42L17.5864 15.0733C17.3931 14.88 17.3931 14.56 17.5864 14.3667C17.7797 14.1733 18.0997 14.1733 18.2931 14.3667L22.6397 18.7133C22.9797 19.0533 23.1731 19.5133 23.1731 20C23.1731 20.4867 22.9864 20.9467 22.6397 21.2867L18.2931 25.6333C18.1931 25.7267 18.0664 25.78 17.9397 25.78Z" fill="#1B1F23" />
                        </g>
                        <defs>
                            <filter id="filter0_d_5134_4807" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5134_4807" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5134_4807" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                }
            </button>


        </div>
    );
};

export default Pagination;
