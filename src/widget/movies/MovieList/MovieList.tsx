import React from "react";
import MovieCard, { MovieCardType } from "../MovieCard/MovieCard";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Pagination from "../../../features/Pagination/Pagination";
import { useRouter } from "next/router";

export type List = {
    cards: MovieCardType[];
    onChangeInput: (title: string) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const MovieList: React.FC<List> = ({ cards, onChangeInput, currentPage, totalPages, onPageChange }) => {
    const router = useRouter();

    const handleCardClick = (id: number) => {
        router.push(`/movie/${id}`);
    };

    return (
        <div>
            <SearchInput placeholder="Поиск..." onChange={onChangeInput} />
            {cards.map((el) => (
                <MovieCard {...el} key={el?.id} onClick={() => handleCardClick(el?.id)} />
            ))}
            {cards.length === 0 && (
                <>
                    <br />
                    <label>Фильмы не найдены</label>
                </>
            )}
            {cards.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
        </div>
    );
};

export default MovieList;
