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

export const fetchMovieCompanies = createAsyncThunk('movies/fetchMovieCompanies', async () => {
    const response = await axios.get<MovieCompany[]>('https://giddy-beret-cod.cyclic.app/movieCompanies');
    return response.data;
  });
  
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get<Movie[]>('https://giddy-beret-cod.cyclic.app/movies');
    return response.data;
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
        .addCase(fetchMovieCompanies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovieCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.movieCompanies = action.payload;
        })
        .addCase(fetchMovieCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        })
        .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
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

export default moviesSlice.reducer;