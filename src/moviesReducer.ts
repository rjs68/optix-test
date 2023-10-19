import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie, MovieCompany, MovieReview, MovieState, State } from './MovieTypes';

const initialState: MovieState = {
    movieCompanies: [],
    movies: [],
    review: null,
    loading: false,
    error: null,
};

export const fetchMovieData = createAsyncThunk('movies/fetchMovieData', async () => {
    const movieCompaniesResponse = await axios.get<MovieCompany[]>('https://giddy-beret-cod.cyclic.app/movieCompanies');
    const moviesResponse = await axios.get<Movie[]>('https://giddy-beret-cod.cyclic.app/movies');
    return {
        movieCompanies: movieCompaniesResponse.data,
        movies: moviesResponse.data
    };
});
  
export const submitReview = createAsyncThunk('movies/submitReview', async (message: string) => {
    const response = await axios.post<MovieReview>('https://giddy-beret-cod.cyclic.app/submitReview', { review: message });
    return response.data;
});

const moviesSlice = createSlice({
    name: 'movieData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovieData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovieData.fulfilled, (state, action) => {
            state.loading = false;
            state.movieCompanies = action.payload.movieCompanies;
            state.movies = action.payload.movies;
        })
        .addCase(fetchMovieData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        })
        .addCase(submitReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(submitReview.fulfilled, (state, action) => {
            state.loading = false;
            state.review = action.payload;
        })
        .addCase(submitReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        })
    }
});

export const getMovies = (state: State) => state.movieData.movies;
export const getMovieCompanies = (state: State) => state.movieData.movieCompanies;
export const getLoading = (state: State) => state.movieData.loading;
export const getError = (state: State) => state.movieData.error;

export default moviesSlice.reducer;