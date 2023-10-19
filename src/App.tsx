import { useState, useEffect} from 'react';
import { easeIn, easeOut } from "polished";
import { MovieTable } from './MovieTable';
import { MovieTableData } from './MovieTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieData, getError, getLoading, getMovies } from './moviesReducer';
import { Button, CircularProgress, Stack } from '@mui/material';
import { AppDispatch } from './moviesStore';

export const App = () =>  {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(getMovies);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const [selectedMovie, setSelectedMovie] = useState<MovieTableData | undefined>(undefined);

  const refreshButton = (buttonText: any) => {
    if (movies) {
      return <button onClick={() => dispatch(fetchMovieData())}>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }   
  };

  useEffect(() => {
    dispatch(fetchMovieData());
  }, []);

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      <Button variant="contained" onClick={() => dispatch(fetchMovieData())}>Refresh Movies</Button>
      {loading ? (
        <Stack alignItems="center" justifyContent="center">
          <br/>
          <CircularProgress />
          <br/>
          Loading your movies...
        </Stack>
      ) : (
        <>
          <p>Total movies displayed {movies?.length}</p>
          <br/>
            <MovieTable setSelectedMovie={setSelectedMovie}/>
          <br/>
          <div>
          {selectedMovie ? selectedMovie.title ? "You have selected " +  selectedMovie.title : "No Movie Title" : "No Movie Selected"}
          {selectedMovie && <p>Please leave a review below</p> }
          {selectedMovie && 
            <form onSubmit={() => {}}>
              <label>
              Review:
              <input type="text"/>
            </label>
            </form>}
          </div>
        </>
      )}
    </div>
  );
}