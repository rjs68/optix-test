import { useState, useEffect} from 'react';
import { MovieTable } from './MovieTable';
import { MovieTableData } from './MovieTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieData, getMovieDataError, getMovieDataLoading, getMovies } from './moviesReducer';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { AppDispatch } from './moviesStore';
import { Review } from './Review';

export const App = () =>  {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(getMovies);
  const loading = useSelector(getMovieDataLoading);
  const error = useSelector(getMovieDataError);
  const [selectedMovie, setSelectedMovie] = useState<MovieTableData | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchMovieData());
  }, []);

  return (
    <div>
      <Typography variant="h3">Welcome to Movie database!</Typography>
      <Button variant="contained" onClick={() => dispatch(fetchMovieData())} sx={{marginY: '20px'}}>
        Refresh Movies
      </Button>
      {loading ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{madingY: '20px'}} />
          <Typography variant="body1">Loading your movies...</Typography>
        </Stack>
      ) : (
        <>
          <Typography variant="body1">Total movies displayed {movies?.length}</Typography>
          <MovieTable setSelectedMovie={setSelectedMovie}/>
          <Stack sx={{marginY: '20px'}}>
            <Typography variant="body1">
              {selectedMovie ? selectedMovie.title ? "You have selected " +  selectedMovie.title : "No Movie Title" : "No Movie Selected"}
            </Typography>
            {selectedMovie && <Review />}
          </Stack>
        </>
      )}
    </div>
  );
}