
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function OverView() {
  const [details, setDetails] = useState({});
  const { imdbID } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await axios.get(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=73365880`
        );
        setDetails(result.data);
      } catch (error) {
        console.log("failed to get movie details ", error);
      }
    };

    getData();
  }, [imdbID]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Top Half - Poster */}
      <div className="relative w-full h-[50vh]">
        <img
          src={details.Poster}
          alt={details.Title}
          className="w-full h-full object-cover object-top"
        />

        {/* Back button */}
        <div className="absolute top-4 left-4 lg:bottom-[10%] lg:top-auto lg:left-4 z-10">
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-1 text-white hover:text-gray-300"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            <span className="text-sm sm:text-base">Back to Search</span>
          </Link>
        </div>
      </div>

      {/* Bottom Half - Black Background */}
      <div className="bg-black w-full h-[50vh]" />

      {/* Centered Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-8 ">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 max-w-5xl">
          {/* Poster */}
          <img
            src={details.Poster}
            alt={details.Title}
            className="w-40 sm:w-52 rounded shadow-lg"
          />

          {/* Details */}
          <div className="text-white/100 space-y-3 ">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl  font-bold flex gap-2 ">{details.Title}
            <p className="text-gray-400">({details.Year})</p>
            </h1>

            <p>
              <strong>Rating:</strong> ⭐ <span className="text-rose-600">{details.imdbRating}</span>/10
            </p>

            <div className="flex flex-wrap gap-2 text-m text-gray-300">
              <span>{details.Runtime}</span>
              <span>|</span>
              <span>{details.Released}</span>
              <span>|</span>
              <span>{details.Country}</span>
              <span>|</span>
              <span>{details.Language}</span>
            </div>

            {/* Genre pills */}
            <div className="flex flex-wrap gap-2">
              {details.Genre?.split(",").map((g, indx) => (
                <span
                  key={indx}
                  className="bg-red-700 rounded-full px-3 py-1 text-m"
                >
                  {g.trim()}
                </span>
              ))}
            </div>

            <p className="text-gray-200 text-m leading-relaxed">
              <strong>Plot:</strong> {details.Plot}
            </p>
            <div className="flex  lg:flex-row flex-col space-x-10 space-y-2">
            <p>
              <strong>Cast:</strong> {details.Actors}
            </p>
            <p>
              <strong>Director:</strong> {details.Director}
            </p>
            </div>

            {/* Ratings pill */}
            {details.Ratings?.[0] && (
              <span className="">
              <span className="bg-gray-700 rounded-full px-3 py-1 text-m inline-block">{details.Ratings[0].Source} :</span>  
                   <span className="px-2">{details.Ratings[0].Value}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverView;
