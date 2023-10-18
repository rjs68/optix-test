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

export type MovieTableProps = {
    setSelectedMovie: Dispatch<SetStateAction<MovieTableData | undefined>>;
}

export type Order = 'asc' | 'desc';