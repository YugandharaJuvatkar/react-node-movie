import React, { useEffect, useState } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchName, setSeachName] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [genres, setGenres] = useState(["Drama"]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSeachName(searchName);
  };

  const onChangeSearchGenre = (e) => {
    const searchGenre = e.target.value;
    setSearchGenre(searchGenre);
  };

  const retrieveMovies = () => {
    MovieDataService.getAll().then((response) => {
      console.log(response.data);
      setMovies(response.data.movies);
    });
  };

  const retrieveGenres = () => {
    MovieDataService.getGenres()
      .then((response) => {
        console.log(response.data);
        setGenres(["Drama"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveMovies();
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByGenre = () => {
    if (searchGenre == "Drama") {
      refreshList();
    } else {
      find(searchGenre, "genre");
    }
  };

  useEffect(() => {
    retrieveMovies();
    retrieveGenres();
  }, []);

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchGenre}>
            {genres.map((genre) => {
              return <option value={genre}> {genre.substr(0, 20)} </option>;
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByGenre}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {movies.map((movie) => {
          const plot = `${movie.plot}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <img
                  className="card-img-top"
                  src={movie.poster}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Plot: </strong>
                    {plot}
                  </p>
                  <div className="row">
                    <Link
                      to={"/movies/" + movie._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
