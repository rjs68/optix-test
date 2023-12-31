import { Dispatch, SetStateAction } from "react";

export type MovieCompany = {
    id: string;
    name: string;
}

export type Movie = {
    id: string;
    reviews: number[];
    title: string;
    filmCompanyId: string;
    cost: number;
    releaseYear: number;
}

export type MovieTableData = {
    id: string;
    title: string;
    reviews: string;
    filmCompany: string;
}

export type MovieReview = {
    message: string | null;
}

export type MovieTableProps = {
    selectedMovie: MovieTableData | undefined;
    setSelectedMovie: Dispatch<SetStateAction<MovieTableData | undefined>>;
}

export type Order = 'asc' | 'desc';

export type State = {
    movieData: MovieState;
}

export type MovieState = {
    movieCompanies: MovieCompany[];
    movies: Movie[];
    review: string | null;
    movieDataLoading: boolean,
    movieDataError: string | null,
    submitReviewLoading: boolean,
    submitReviewError: string | null
}
