import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomePage from "./HomePage";
import {addMovieToFavourite,getMoviesData,removeMovieFromFavourite} from "../services/ItemServices";
import IMovieList from "../model/IMovieList";
import { LoadingStatus } from "./LoadingStatus";
import { Button, Card } from "react-bootstrap";
import { Rating } from "./Rating";

const MovieListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [loading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<IMovieList[]>([]);
  const [favorite, setFav] = useState<IMovieList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const fav = await getMoviesData("favourite");
        setFav(fav);
        setLoading(false)
        const data = await getMoviesData(category);
        setItems(data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    };
    fetchItemsData();
  }, [category]);

  function isMovieFavorite(movie: IMovieList) {
    return favorite.some((value) => value.id === movie.id);
  }

  function handleAddToFavorites(movie: IMovieList): void {
    if (isMovieFavorite(movie)) {
      const deleteFav = async () => {
        try {
          const fav = await removeMovieFromFavourite("favourite", movie.id);
          setFav((prevFavorites) =>
            prevFavorites.filter((item) => item.id !== movie.id)
          )
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError(error as Error);
        }
      };
      deleteFav();
    } else {
      const addFav = async () => {
        try {
          const fav = await addMovieToFavourite("favourite", movie);
          setFav((prevFavorites) => [...prevFavorites, fav]);
        } catch (error) {
          console.error(error);
          setError(error as Error);
        }
      };
      addFav();
      isMovieFavorite(movie);
    }
  }

  const filteredItems = items?.filter((movie) =>
    movie?.title.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div>
      <HomePage/>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies by title"
        />
      </div>
      <div className="movie-list">
          { loading && <LoadingStatus/>}
          {filteredItems.map((movie) => (
            <Card key={movie.id} className="card">
              <Link className ="posterLink" to={`/movies/${category}/${movie.id}`}>
              <Card.Img variant="top" src={movie.posterurl?movie.posterurl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg"} alt={movie.title} className="card-img"/>
              </Link>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <div className="rating-favorites">
                  <p className="rating">
                    <span className="star-icon">{<Rating rating={+movie.imdbRating}/>}</span>
                  </p>
                <Button variant="primary" className={`favorite-button ${isMovieFavorite(movie) ? "favorite" : ""}`}
                  onClick={() => handleAddToFavorites(movie)}>
                  {isMovieFavorite(movie) ? "❤️" : "♡"}
                </Button>
                </div>
              </Card.Body>
              </Card>
          ))}
      </div>
      {error && <>{error?.message}</>}
    </div>
  );
};

export default MovieListPage;


