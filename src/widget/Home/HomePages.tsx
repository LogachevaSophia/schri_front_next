import React, { useCallback, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {debounce} from "lodash";
import { QuerySearchParams, useGetSearchResultsQuery } from "@/features/MovieList/api";
import Filter from "../Filter/Filter";
import MovieList from "../movies/MovieList/MovieList";
import Spinner from "@/shared/ui/Spinner/Spinner";

const HomePage: React.FC = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<QuerySearchParams>({});
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isFetching } = useGetSearchResultsQuery({
        ...searchParams,
        page: currentPage,
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const genre = params.get("genre");
        const release_year = params.get("release_year");
        const title = params.get("title");
        const updatedParams: QuerySearchParams = {
          ...(genre && genre !== "0" && { genre }),
          ...(release_year && release_year !== "0" && { release_year }),
          ...(title && { title }),
        };
    
        setSearchParams(updatedParams);
    }, [location.search]);

    const handleFilterChange = useCallback((newParams: { genre?: string; release_year?: string; title?: string }) => {
      const updatedParams = { ...searchParams, ...newParams };
      setSearchParams(updatedParams);

      const params = new URLSearchParams(updatedParams).toString();
      const url = `${window.location.pathname}?${params}`;
      window.location.replace(url);
      setCurrentPage(1);
  }, [searchParams]);

    const debouncedHandleSearch = useCallback(
        debounce((title: string) => {
            handleFilterChange({ title });
        }, 300),
        [handleFilterChange]
    );

    const handleSearchChange = (title: string) => {
        debouncedHandleSearch(title);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div style={{ width: "calc( 100% - 50px)", margin: "0 auto", display: "flex", gap: "16px" }} className="container">
            <Filter onChange={handleFilterChange} />
            {!isLoading && !isFetching ?
                <MovieList cards={data?.search_result || []} onChangeInput={handleSearchChange} totalPages={data?.total_pages || 1} onPageChange={handlePageChange} currentPage={currentPage} />
                : <Spinner />}

        </div>
    );
};

export default HomePage;
