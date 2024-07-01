import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import SelectCustom from "../../shared/ui/Select/Select";
import { useRouter } from "next/router";

const GENRES_MAP = {
    comedy: "комедия",
    drama: "драма",
    action: "боевик",
    thriller: "триллер",
    horror: "ужасы",
    family: "семейный",
    cartoon: "анимированный",
    fantasy: "фэнтези",
    romance: "романтика",
    adventure: "приключения",
    musical: "мьюзикл",
    war: "военный",
} as const;

type Genre = {
    value: keyof typeof GENRES_MAP;
    label: typeof GENRES_MAP[keyof typeof GENRES_MAP];
};

type FilterProps = {
    onChange: (params: { genre?: string; release_year?: string }) => void;
};

const GENRES = {
    '0': 'Не выбран',
    comedy: 'Комедия',
    drama: 'Драма',
    action: 'Боевик',
    thriller: 'Триллер',
    horror: 'Ужасы',
    family: 'Семейный',
    cartoon: 'Анимированный',
    fantasy: 'Фэнтези',
    romance: 'Романтика',
    adventure: 'Приключения',
    musical: 'Мьюзикл',
    war: 'Военный',
};

const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
    const router = useRouter();

    const [selectedGenre, setSelectedGenre] = useState<string | null>(
        router.query.genre ? String(router.query.genre) : null
    );
    const [selectedYear, setSelectedYear] = useState<string | null>(
        router.query.release_year ? String(router.query.release_year) : null
    );

    const genresOptions: Genre[] = Object.entries(GENRES).map(
        ([value, label]) => ({
            value: value as keyof typeof GENRES_MAP,
            label: label as typeof GENRES_MAP[keyof typeof GENRES_MAP],
        })
    );

    const yearOptions = Object.entries(YEARS).map(([value, label]) => ({
        value: value as keyof typeof YEARS,
        label: label as typeof YEARS[keyof typeof YEARS],
    }));

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedGenre) params.set("genre", selectedGenre);
        if (selectedYear) params.set("release_year", selectedYear);

        const pathname = router.pathname;
        const query = params.toString();

        // Update the browser URL without reloading the page
        router.replace({
            pathname,
            query,
        }, undefined, { shallow: true });

        const validGenre = selectedGenre && selectedGenre !== "0" ? selectedGenre : "";
        const validYear = selectedYear && selectedYear !== "0" ? selectedYear : "";
        onChange({ genre: validGenre, release_year: validYear });
    }, [selectedGenre, selectedYear, router.pathname, onChange]);

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
    };

    const handleYearChange = (release_year: string) => {
        setSelectedYear(release_year);
    };

    return (
        <div className={styles.container_filter}>
            <h1>Фильтр</h1>
            <div className={styles.container_select}>
                <label htmlFor="">Жанр</label>
                <SelectCustom
                    placeholder="Выберите жанр"
                    options={genresOptions}
                    onChange={(value) => handleGenreChange(value)}
                    value={selectedGenre || '0'}
                />
            </div>
            <div className={styles.container_select}>
                <label htmlFor="">Год выпуска</label>
                <SelectCustom
                    placeholder="Выберите год"
                    options={yearOptions}
                    onChange={(value) => handleYearChange(value)}
                    value={selectedYear || '0'}
                />
            </div>
        </div>
    );
};

export default Filter;
