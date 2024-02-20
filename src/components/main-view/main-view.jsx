import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-ssv7.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => {
              setSelectedMovie(null);
            }}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(movie) => {
                  setSelectedMovie(movie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

// if (!user) {
//   return (
//     <>
//       <LoginView
//         onLoggedIn={(user, token) => {
//           setUser(user);
//           setToken(token);
//         }}
//       />
//       or Signup
//       <SignupView />
//     </>
//   );
// }

// if (selectedMovie) {
//   const similarMovies = movies.filter(
//     (movie) =>
//       movie.Genre.Name === selectedMovie.Genre.Name &&
//       movie._id !== selectedMovie._id
//   );
//   return (
//     <>
//       <MovieView
//         movie={selectedMovie}
//         onBackClick={() => {
//           setSelectedMovie(null);
//         }}
//       />
//       <hr />
//       <h2>Similar movies</h2>
//       {similarMovies.map((movie) => (
//         <MovieCard
//           key={movie._id}
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       ))}
//     </>
//   );
// }

// if (movies.length === 0) {
//   return <div>The list is empty!</div>;
// }

// return (
//   <div>
//     <div>
//       <h1>MyFlix</h1>
//     </div>
//     {movies.map((movie, index) => (
//       <MovieCard
//         key={movie._id} // Using index as key, assuming titles are unique
//         movie={movie} // Assuming each movie is represented by its title
//         onMovieClick={(newSelectedMovie) => {
//           setSelectedMovie(newSelectedMovie);
//         }}
//       />
//     ))}
//     <div>
//       <button
//         onClick={() => {
//           setUser(null);
//           setToken(null);
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   </div>
// );
