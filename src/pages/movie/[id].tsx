


import React from "react"

import { useParams } from "react-router-dom";

import styles from "@/widget/movies/MovieCard/BigMovieCard/MovieCard.module.scss"
import { MovieCardType } from "@/widget/movies/MovieCard/MovieCard";
import { useGetMovieByIdQuery } from "@/features/MovieList/api";
import CustomCarousel from "@/shared/ui/Carousel/Carouse";
import BigMovieCard from "@/widget/movies/MovieCard/BigMovieCard/BigMovieCard";
import { useRouter } from "next/router";



const FilmPage: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading, isFetching } = useGetMovieByIdQuery(id ? { id } : { id: "0" });
  console.log(data)
  const defaultMovieData: MovieCardType = {
    id: data?.id ?? 0,
    poster: data?.poster ?? 'default-poster.jpg',
    title: data?.title ?? 'No title',
    genre: data?.genre ?? 'Unknown genre',
    release_year: data?.release_year ?? 0,
    description: data?.description ?? 'No description available',
    rating: data?.rating ?? 'N/A',
    actors: data?.actors ?? []
  };
  return (

    <>

      <BigMovieCard {...defaultMovieData} />
      <CustomCarousel slidesToShow={data?.actors && data?.actors?.length > 5 ? 5 : data?.actors?.length}>
        {data?.actors?.map((actor, index) => (
          <div className={styles.card_actor} key={index}>
            <img src={actor.photo} alt={actor.name} />
            <span>{actor.name}</span>
          </div>
        ))}
      </CustomCarousel>

    </>)
}

export default FilmPage;
