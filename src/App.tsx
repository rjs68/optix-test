import { useRef, useState, Children, useReducer, useEffect} from 'react';
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer }from "@reduxjs/toolkit"
import { MovieTable } from './MovieTable';
import { MovieTableData } from './MovieTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCompanies, fetchMovies, getMovies } from './moviesReducer';

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [
  {id: "1", name: "Test Productions"},
];

// TODO: use https://giddy-beret-cod.cyclic.app/movies
const mockMovieData: any = [
  {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
  {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
];

export const App = () =>  {
  const [selectedMovie, setSelectedMovie] = useState<MovieTableData | undefined>(undefined);

  const dispatch = useDispatch();
  const movies = useSelector(getMovies);

  const refreshButton = (buttonText: any) => {
    if (mockMovieCompanyData) {
      return <button onClick={() => dispatch(fetchMovies() as any)}>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }   
  };

  useEffect(() => {
    dispatch(fetchMovies() as any);
    dispatch(fetchMovieCompanies() as any);
  }, []);

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      {refreshButton("Refresh")}
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
    </div>
  );
}