

import { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router";

function Favorites({ handleFavorites, favorites, handleRemove }) {
  const [loading, setLoading] = useState(true);

  //  data fetching 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      
      </div>
    );
  }

  return (
    <div className=" righteous-regular min-h-screen bg-black px-6 py-8 relative">
        <Link
                className="absolute top-5 left-5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-300 hover:scale-110"
                to="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
      {favorites && favorites.length > 0 ? (
        <div className="grid gap-6 mt-20  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {favorites.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              handleFavorites={handleFavorites}
              favorites={favorites}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-red-700 text-center text-2xl mt-20">
          No favorites added yet ❤️!!.
        </p>
      )}
    </div>
  );
}

export default Favorites;
