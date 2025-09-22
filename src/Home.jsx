import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useFormik } from "formik";
import MovieContext from "./MoviesContext";
import Card from "./Card";
import axios from "axios";
import Filter from "./Fiter";
import PageNation from "./PageNation";
import SearchBar from "./SearchBar";

function Home({ handleFavorites, handleRemove, favorites }) {
  const {
    movies: contextMovies,
    totalResults,
    setTotalResults,
  } = useContext(MovieContext);

// all page to be searched and filtered
  const [queryOptions, setQueryOptions] = useState({
  search: "batman",
  filter: "All",
});
  const [movies, setMovies] = useState(contextMovies);
  const [searchbar, setSearchbar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)},500)
      
  },[])
  useEffect(() => {
    setMovies(contextMovies);
  }, [contextMovies]);

  let handleSearch = async (searchText) => {
    setSearchbar(false);

    
      setLoading(true);
      setQueryOptions( {...queryOptions,search:searchText,filter: "All" })

    try {
      const res = await axios.get(`http://www.omdbapi.com/`, {
        params: {
          s: searchText,
          apikey: "73365880",
          page: 1, // reset to page 1

        },
      });
      console.log("search text successfully searched", res.data);
      if (res.data && res.data.Search) {
        setMovies(res.data.Search); // valid movies
        setTotalResults(res.data.totalResults);
          setCurrentPage(1); // reset page
      } else {
        setMovies([]); // no results → set empty array
        setTotalResults(0);
         setTotalResults(0);
      }
    } catch (err) {
      if (err.status == 404) setMovies([]);
      setTotalResults(0);
      console.log("not found", err);
    
    if (err.status == 500) {
      console.log("Something went wrong...");
    }
  }
  finally {
    setLoading(false); // stop spinner
  }
  };

  // filter
  let handleFilter = async (filter) => {
     setQueryOptions( {...queryOptions, filter })
   
      setSearchbar(false);
       setLoading(true);

    if (filter === "All") {
      setMovies(contextMovies); // reset to full list
    } else {
      try {
        let res = await axios.get(`http://www.omdbapi.com/`, {
          params: {
            s: queryOptions.search,
            type: filter.toLowerCase(),
            apikey: "73365880",
               page: 1,
          },
        });

        if (res.data && res.data.Search) {
          setMovies(res.data.Search);
          setTotalResults(res.data.totalResults);
            setCurrentPage(1);
        } else {
          setMovies([]); // no results → set empty array
          setTotalResults(0);
        }
      } catch (err) {
        console.log("errror in filtering type", err);
      }
      finally{
         setLoading(false);
      }
    }
  };

  // pageNation

  let handlePageChange = async (page) => {

   const  params= {
        s: queryOptions.search, 
        apikey: "73365880",
       
        page,
      }

    // only add type if not "All"
  if (queryOptions.filter !== "All") {
    params.type = queryOptions.filter.toLowerCase();
  }
    const res = await axios.get("http://www.omdbapi.com/", { params });
    if (res.data && res.data.Search) {
      setMovies(res.data.Search);
      setCurrentPage(page);
    } else {
      setMovies([]);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black">
    <div className="righteous-regular h-full p-6 max-w-7xl bg-black mx-auto">
      <header className="relative z-10 sticky top-0 bg-black">
        <div className="flex justify-between p-4 items-center gap-4">
          <img
            src="./public/logo.webp"
            className="  w-8 h-8 aspect-square"
          ></img>
          <div className="flex items-center">
            {/* Search Icon */}
            <svg
              onClick={() => setSearchbar(true)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-rose-500 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Favorites Button */}
            <Link to={`/movies/favorites`}>
              <button className="relative rounded-lg p-2 cursor-pointer transition-transform duration-300 hover:scale-110 text-gray-500 hover:text-gray-300 text-2xl">
                ❤️
                {favorites.length > 0 && (
                  <span className="absolute aspect-square rounded-full bg-red-500 w-5 h-5 top-1 right-0 text-white text-sm font-semibold">
                    {favorites.length}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className="relative h-[90vh]">
        {/* Hero Image */}
        <img
          src="/image.webp"
          alt="Stranger Worlds"
          className="w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col gap-2 justify-center items-center p-8">
          <h1 className="text-white text-4xl sm:text-6xl font-bold hero-title">
            Stranger <span className="text-red-600">Worlds</span>
          </h1>
          <p className="text-gray-200 mt-2 text-lg sm:text-2xl text-center">
            Explore the unknown and dive into thrilling adventures.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          {/* Full-screen Search + Filter Overlay */}
          {searchbar && (
            <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
              {/* Close Button */}
              <button
                className="absolute top-5 left-5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-300 hover:scale-110"
                onClick={() => setSearchbar(false)}
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
              </button>

              {/* Search + Filter Box */}
              <div className="flex flex-col lg:flex-row items-center gap-6 w-full sm:w-3/4 md:w-2/3 bg-gray-900 p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105">
                <SearchBar handleSearch={handleSearch} />
                <Filter handleFilter={handleFilter} />
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 px-4 justify-center">
            {loading ? (
              // Spinner
              <div className="flex justify-center items-center col-span-full py-20">
                <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
              </div>
            ) : movies.length === 0 ? (
              // No results
              <p className="text-white text-center col-span-full py-20 text-2xl">
                 No movies found ❌
              </p>
            ) : (
              movies.map((movie, index) => {
                return (
                  <div key={index} className=" flex justify-center   ">
                    <Card
                      movie={movie}
                      handleFavorites={handleFavorites}
                      favorites={favorites}
                      handleRemove={handleRemove}
                    ></Card>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <PageNation
          totalResults={totalResults}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></PageNation>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
    </div>
  );
}
export default Home;
