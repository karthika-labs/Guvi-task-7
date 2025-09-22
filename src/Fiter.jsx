



import { useContext } from "react";
import MovieContext from "./MoviesContext";
import { useFormik } from "formik";

function Filter({ handleFilter }) {
  const { movies } = useContext(MovieContext);
  const fetched = [];

  movies.forEach((movie) => {
    if (!fetched.includes(movie.Type)) fetched.push(movie.Type);
  });

  const formik = useFormik({
    initialValues: { filter: "All" },
    onSubmit: () => {},
  });

  const handleSelectChange = (e) => {
    formik.handleChange(e);
    handleFilter(e.target.value);
  };

  return (
    <form className="w-full sm:w-60">
      <select
        name="filter"
        value={formik.values.filter}
        onChange={handleSelectChange}
        className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        <option value="All">All</option>
        {fetched.map((Type, index) => (
          <option key={index} value={Type}>
            {Type}
          </option>
        ))}
      </select>
    </form>
  );
}

export default Filter;
