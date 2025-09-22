import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

let  MovieContext=createContext()


export const UserProvider=({children})  =>{
    
const [movies, setMovies] = useState([]);
const[totalResults,setTotalResults]=useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let getData = await axios.get(
          "https://www.omdbapi.com/?s=batman&apikey=73365880"
        );
        setMovies(getData.data.Search);
        setTotalResults(parseInt(getData.data.totalResults))

        console.log("totalResults",getData.data.totalResults)
        console.log("Fetched successfully", getData.data.Search);

      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };

    fetchData();
  }, []);

  return(
     <MovieContext.Provider value={{movies,totalResults}}>
        {children}
     </MovieContext.Provider>
  )
}
export default MovieContext