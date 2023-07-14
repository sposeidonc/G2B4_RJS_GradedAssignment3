import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import HomePage from "./components/HomePage";
import MovieListPage from "./components/MovieListPage";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/movie-list/:category" element={<MovieListPage/>}></Route>
          <Route path="/movies/:category/:movieId" element={<MovieDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
