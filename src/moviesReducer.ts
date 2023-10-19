import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie, MovieCompany, MovieReview, MovieState, State } from './MovieTypes';

const initialState: MovieState = {
    movieCompanies: [],
    movies: [],
    review: null,
    movieDataLoading: false,
    movieDataError: null,
    submitReviewLoading: false,
    submitReviewError: null
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
    reducers: {
        resetSubmitReviewSuccess: (state) => {
            state.review = null;
        },
        resetSubmitReviewError: (state) => {
            state.submitReviewError = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovieData.pending, (state) => {
            state.movieDataLoading = true;
            state.movieDataError = null;
        })
        .addCase(fetchMovieData.fulfilled, (state, action) => {
            state.movieDataLoading = false;
            state.movieCompanies = action.payload.movieCompanies;
            state.movies = action.payload.movies;
        })
        .addCase(fetchMovieData.rejected, (state, action) => {
            state.movieDataLoading = false;
            state.movieDataError = action.error.message || null;
        })
        .addCase(submitReview.pending, (state) => {
            state.submitReviewLoading = true;
            state.submitReviewError = null;
        })
        .addCase(submitReview.fulfilled, (state, action) => {
            state.submitReviewLoading = false;
            state.review = action.payload.message;
        })
        .addCase(submitReview.rejected, (state, action) => {
            state.submitReviewLoading = false;
            state.submitReviewError = action.error.message || null;
        })
    }
});

export const getMovies = (state: State) => state.movieData.movies;
export const getMovieCompanies = (state: State) => state.movieData.movieCompanies;
export const getMovieDataLoading = (state: State) => state.movieData.movieDataLoading;
export const getMovieDataError = (state: State) => state.movieData.movieDataError;
export const getSubmitReviewLoading = (state: State) => state.movieData.submitReviewLoading;
export const getSubmitReviewError = (state: State) => state.movieData.submitReviewError;
export const getReview = (state: State) => state.movieData.review;

export const { resetSubmitReviewSuccess, resetSubmitReviewError } = moviesSlice.actions;

export default moviesSlice.reducer;
