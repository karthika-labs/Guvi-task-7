import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
function Card({ movie, handleFavorites, favorites, handleRemove }) {
  // Check if the current movie is already in favorites
  const isFavorited = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const [plot, setPlot] = useState("");
  //  descriptio n for each movie
  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const res = await axios.get("http://www.omdbapi.com/", {
          params: { i: movie.imdbID, apikey: "73365880" },
        });
        console.log("plot fetched succeessfully", res.data.Plot);
        setPlot(res.data.Plot); // Only the description
      } catch (err) {
        console.log("Error fetching plot", err);
      }
    };

    fetchPlot();
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    if (isFavorited) {
      handleRemove(movie); // remove from favorites
    } else {
      handleFavorites(movie); // add to favorites
    }
  };

  return (
    <div className="rounded-lg  border border-gray-200 bg-white  shadow-sm dark:border-gray-700 dark:bg-gray-800 w-full max-w-xs gap-2 flex flex-col">
    
        <div className=" w-full relative flex justify-center">
          <a href="#">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full text-white object-cover center rounded  cursor pointer transition duration-300 ease-in-out hover:scale-105"
            />
          </a>
          <h1 className="absolute top-3 cursor-pointer right-2 text-2xl text-white hover:text-red-700 dark:text-white">
            {movie.Year}
          </h1>
        </div>
        <div className="pt-6 px-2 flex flex-col flex-grow">
          <Link
            to={`${movie.imdbID}`}
            class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            {movie.Title}
          </Link>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex-grow text-start">
            {plot}
          </p>

          <div className="mt-4 py-2 flex items-center justify-between gap-4">
            <p className="text-2xl font-extrabold leading-tight text-red-700 ">
              {movie.Type}
            </p>

            <button
              onClick={() => toggleFavorite()}
              type="button"
              className={`rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700
              ${isFavorited ? "border border-red-500" : ""}
            `}
            >
              <span className="sr-only">Add to Favorites</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFavorited ? "red " : "none"} // red if favorited
                stroke={isFavorited ? "red-500" : "white"}
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
          </div>
        </div>
     
    </div>
  );
}
export default Card;
