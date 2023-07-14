import axios from "axios";
import IMovieList from "../model/IMovieList";

export const getMoviesData = (category : any) => {
  return axios.get<IMovieList[]>(`http://localhost:4002/${category}`)
              .then((response) => response.data);
};
export const getMovieDetails = (category : any, id : any) => {
  return axios.get<IMovieList>(`http://localhost:4002/${category}/${id}`)
              .then((response) => response.data);
};
export const addMovieToFavourite = (key: string, movie: IMovieList) => {
  return axios.post<IMovieList>(`http://localhost:4002/${key}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export const removeMovieFromFavourite = (key: string, id: string) => {
  return axios.delete<IMovieList>(`http://localhost:4002/${key}/${id}`)
              .then((response) => response.data);
};