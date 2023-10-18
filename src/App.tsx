import { useRef, useState, Children} from 'react';
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer }from "@reduxjs/toolkit"
import { MovieTable } from './MovieTable';

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

  const movieLength = useRef(mockMovieData.length);
  const [selectedMovie, setSelectedMovie] = useState(0); 

  const refreshButton = (buttonText: any) => {
    if (mockMovieCompanyData) {
      return <button>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }   
  };

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      {refreshButton("Refresh")}
      <p>Total movies displayed {movieLength.current}</p>
      <br/>
        <MovieTable />
      <br/>
      <div>
       {selectedMovie ? selectedMovie.title as any ? "You have selected " +  selectedMovie.title  as any : "No Movie Title" : "No Movie Seelcted"}
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