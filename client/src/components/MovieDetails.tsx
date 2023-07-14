import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/ItemServices";
import IMovieList from "../model/IMovieList";
import { Col, Image, Row } from "react-bootstrap";
import { Rating } from "./Rating";
import { LoadingStatus } from "./LoadingStatus";
import { loadavg } from "os";

const MovieDetails: React.FC = () => {
  const { category, movieId } = useParams<{
    category: string;
    movieId: string;
  }>();

  const [loading, setLoading] = useState<boolean>(true)
  const [movieDetails, setMovieDetails] = useState<IMovieList | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(category, movieId);
        setMovieDetails(data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(error as Error);
        console.log(error)
      }
    };

    fetchMovieDetails();
  }, [category, movieId]);

  if (!movieDetails) {
    return <div><LoadingStatus/></div>;
  }
  const formatDuration = (isoDuration: string) => {
    const duration = /PT(\d+)M/.exec(isoDuration);
    if (duration) {
      const minutes = parseInt(duration[1], 10);
      return `${minutes} minutes`;
    }
    return isoDuration;
  };

  const duration = formatDuration(movieDetails.duration);
  
    const handleGoBack = () => {
        navigate(-1); 
      };

  return (
    <>
     {loading&&(<LoadingStatus/>)}
     <div className="movie-details-container">
      <div className="movie-details">
        <div className="movie-details-content">
        <div className="close-icon" onClick={handleGoBack}>
            <span>&times;</span>
          </div>
          <Row>
            <Col lg={4}>
             <Image src={movieDetails.posterurl?movieDetails.posterurl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg"} alt={movieDetails.title}/>
            </Col>
            <Col lg={8}>
              <div >
              <h2 className="movie-details-title">{movieDetails.title}</h2>
              <br />
              </div>
              <div>
                <label><strong>Year:</strong></label> {movieDetails.year}
                <br />
              </div>
              <div >
                <label><strong>Genres:</strong></label> {movieDetails.genres.join(", ")}
              </div>
              <div >
                <label><strong>IMDB Ratings:</strong></label>{" "}
                <p className="rating">
                    <span className="star-icon">{<Rating rating={+movieDetails.imdbRating}/>}</span>
                  </p>
              </div>
              <div >
                <label><strong>Average Ratings:</strong></label> <Rating rating={+movieDetails.averageRating?+movieDetails.averageRating:7.8}/>
              </div>
              <div >
                <label><strong>content Rating:</strong></label> {movieDetails.contentRating}
              </div>
              <div >
                <label><strong>Duration:</strong></label> {duration}
              </div>
              <div >
                <label><strong>Release Date:</strong></label> {movieDetails.releaseDate}
              </div>
              <div className="movie-details-storyline">
                <label><strong>Storyline:</strong></label> {movieDetails.storyline}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    </>
  );
};

export default MovieDetails;