import React, { useEffect, useState } from "react";
import styles from "./MovieCard.module.scss"
import Rating from "../../Rating/Rating";
import { useSelector } from "react-redux";

import { actor } from "./BigMovieCard/BigMovieCard";
import { RootState } from "@/services/store/store";
import Image from "next/image";


export type MovieCardType = {
    id: number,
    poster: string,
    title: string,
    genre: string,
    release_year: number,
    description: string,
    rating: string,
    children?: React.ReactNode;
    actors: actor[],
    onClick?: () =>  void,

}

const MovieCard: React.FC<MovieCardType> = ({ poster, title, genre, release_year, description, rating, children, id, onClick }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const [selectedRating, setSelectedRating] = useState<number>(() => {
        // Инициализация из localStorage при первоначальной загрузке
        const storedRating = localStorage.getItem(`selectedRating-${id}`);
        return !storedRating ?  parseFloat(rating):  parseInt(storedRating) ;
    });


    useEffect(()=>{

        const storedRating = localStorage.getItem(`selectedRating-${id}`);
        setSelectedRating(!storedRating ?  parseFloat(rating):  parseInt(storedRating) )

    }, [rating])


    const handleChangeRating = (rating: number) => {
        setSelectedRating(rating)
        
    }

    useEffect(()=>{
        localStorage.setItem(`selectedRating-${id}`, selectedRating.toString())

    },[selectedRating])

    return (
        <div className={styles.card} onClick={onClick}>
            <Image src={poster} className={styles.img} alt={title} loading="lazy" width={400} height={500}/>
            {/* <img src={poster} className={styles.img}>
            </img> */}
            <div className={styles.container_description}>
                <div>
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th className={styles.disable}>
                                    Жанр
                                </th>
                                <th>
                                    {genre}
                                </th>
                            </tr>
                            <tr>
                                <th className={styles.disable}>
                                    Год выпуска
                                </th>
                                <th>
                                    {release_year}
                                </th>
                            </tr>
                            <tr>
                                <th className={styles.disable}>
                                    Описание
                                </th>
                                <th>
                                    {description}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {isAuthenticated && <div className={styles.score}>
                    <Rating rating={selectedRating} onChange={handleChangeRating}/>
                </div>}

            </div>


        </div>
    )

}

export default MovieCard;