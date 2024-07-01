import React, { useCallback, useEffect, useState } from "react";
import MovieList from "../widget/movies/MovieList/MovieList";
import { QuerySearchParams, useGetSearchResultsQuery } from "../services/api";
import SelectCustom from "../shared/ui/Select/Select";
import Filter from "../widget/Filter/Filter";
import Spinner from "../shared/ui/Spinner/Spinner";
import { useRouter } from 'next/router';
import { debounce } from "lodash";

const HomePage: React.FC = () => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState<QuerySearchParams>({});
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isFetching } = useGetSearchResultsQuery({
        ...searchParams,
        page: currentPage,
    });

    useEffect(() => {
        const { query } = router;
        const genre = query.genre as string | undefined;
        const release_year = query.release_year as string | undefined;
        const title = query.title as string | undefined;

        const updatedParams: QuerySearchParams = {
            ...(genre && { genre }),
            ...(release_year && { release_year }),
            ...(title && { title }),
        };

        // Проверка перед установкой состояния, чтобы избежать лишних вызовов
        if (JSON.stringify(searchParams) !== JSON.stringify(updatedParams)) {
            setSearchParams(updatedParams);
        }
    }, [router.query]);

    const handleFilterChange = useCallback((newParams: { genre?: string; release_year?: string; title?: string }) => {
        const params = new URLSearchParams();
        const updatedParams = { ...searchParams, ...newParams };

        Object.keys(updatedParams).forEach((key) => {
            const value = updatedParams[key as keyof typeof updatedParams];
            if (value) {
                params.set(key, value);
            }
        });

        router.push({
            pathname: router.pathname,
            query: params.toString(),
        }, undefined, { shallow: true });
        setCurrentPage(1);
    }, [router.pathname, searchParams]);

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
        <div style={{ width: "calc(100% - 50px)", margin: "0 auto", display: "flex", gap: "16px", marginTop: "100px" }} className="container">
        {error && <span>Ошибка получения данных</span>}
        {!error && (
          <>
            <Filter onChange={handleFilterChange} />
            {!isLoading && !isFetching ? (
              <MovieList
                cards={data?.search_result || []}
                onChangeInput={handleSearchChange}
                totalPages={data?.total_pages || 1}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            ) : (
              <Spinner />
            )}
          </>
        )}
      </div>
    );
};

export default HomePage;
