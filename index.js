import { publicAPI } from "./movieAPI.js";

const movies = publicAPI.getMovieList();

console.log(movies);

const oneTestMovieId = movies[4].id;

const testNewMovie = {
    description: "Here is a test description",
    sources: [""],
    subtitle: "By Google",
    thumb: "",
    title: "Test Movie",
    genre: "Comedy",
};

publicAPI.addMovie(testNewMovie);

console.log(publicAPI.getMoviesByGenre("Comedy"));

console.log(publicAPI.getMovieById(oneTestMovieId));

console.log(publicAPI.changeMovieTitleById(oneTestMovieId, "New title"));

console.log(publicAPI.getMovieById(oneTestMovieId));

console.log(publicAPI.deleteMovieById(oneTestMovieId));

console.log(publicAPI.getMovieById(oneTestMovieId));

console.log(publicAPI.sortMoviesByTitle());

console.log(publicAPI.sortMoviesByRatingASC());

console.log(publicAPI.getTopAndBottomTwoMovies());

console.log(publicAPI.getTopThreeMovies());

console.log(publicAPI.removeSubtitleAndThumb());
