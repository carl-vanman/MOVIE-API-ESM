import { readFile } from "fs/promises";
const rawMovieListData = JSON.parse(
    await readFile(new URL("./movies.json", import.meta.url))
);

export const publicAPI = {
    getMovieList,
    addMovie,
    getMoviesByGenre,
    getMovieById,
    changeMovieTitleById,
    deleteMovieById,
    sortMoviesByTitle,
    sortMoviesByRatingASC,
    getTopAndBottomTwoMovies,
    getTopThreeMovies,
    removeSubtitleAndThumb,
};

const processedMovieList = [];

/* UTILITES START */
function randomRating() {
    return Math.floor(Math.random() * 5) + 1;
}

function generateId(numericalValue) {
    return Date.now() + numericalValue;
}

function isArrayAndNotEmpty(dataList) {
    return Boolean(Array.isArray(dataList) && dataList.length);
}

/* UTILITES END */

function movieListProcessor(movieListToProcess) {
    if (isArrayAndNotEmpty(movieListToProcess)) {
        movieListToProcess.forEach((movie) => {
            addMovie(movie);
        });
    }
}

function addMovie(movieToAdd) {
    //validate movie obj
    processedMovieList.push({
        ...movieToAdd,
        id: generateId(processedMovieList.length),
        rating: randomRating(),
    });
}

function getMovieList() {
    if (!processedMovieList.length) {
        movieListProcessor(rawMovieListData);
    }
    return processedMovieList;
}

function filterMovieBy(key, value) {
    return getMovieList().filter((movie) => movie[key] === value);
}

function getMoviesByGenre(genre) {
    const movies = filterMovieBy("genre", genre);
    if (!movies.length) {
        return false;
    }
    return movies;
}

function getMovieById(id) {
    const movie = filterMovieBy("id", id);
    if (!movie.length) {
        return false;
    }
    return movie[0];
}

function getMovieIndexById(id) {
    return getMovieList().findIndex((movie) => movie.id === id);
}

function changeMovieTitleById(id, newMovieTitle) {
    const movieIndex = getMovieIndexById(id);
    if (movieIndex === -1) {
        return false;
    }
    getMovieList()[movieIndex].title = newMovieTitle;
}

function deleteMovieById(id) {
    const movieIndex = getMovieIndexById(id);
    if (movieIndex === -1) {
        return false;
    }
    getMovieList().splice(movieIndex, 1);
}

function sortMovies(compareFn) {
    return getMovieList().sort(compareFn);
}

/* UTILITES START */
function sortByNumberASC(firstValue, secondValue) {
    return firstValue.rating - secondValue.rating;
}

function sortByNumberDESC(firstValue, secondValue) {
    return secondValue.rating - firstValue.rating;
}

function sortByTitle(firstValue, secondValue) {
    const nameA = firstValue.title.toUpperCase();
    const nameB = secondValue.title.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
/* UTILITES END */

function sortMoviesByTitle() {
    return sortMovies(sortByTitle);
}

function sortMoviesByRatingASC() {
    return sortMovies(sortByNumberASC);
}

function getTopAndBottomTwoMovies() {
    const backwards = getMovieList().length;
    sortMovies(sortByNumberDESC);

    return [
        { ...getMovieList()[0] },
        { ...getMovieList()[1] },
        { ...getMovieList()[backwards - 1] },
        { ...getMovieList()[backwards - 2] },
    ];
}

function getTopThreeMovies() {
    sortMovies(sortByNumberDESC);

    return [
        { ...getMovieList()[0] },
        { ...getMovieList()[1] },
        { ...getMovieList()[2] },
    ];
}

function removeSubtitleAndThumb() {
    const noSubtitleAndThumb = getMovieList().map((movie) => {
        const { id, rating, title, description, genre, sources } = movie;
        return { id, rating, title, description, genre, sources };
    });
    return noSubtitleAndThumb;
}

//add fn
//1. Add an “id” and a random “rating” from 1 to 5 for each movie.
//9. A method that allows the user to add a new movie object to the movie list (supply all properties but the “id” and “rating”. The “id” and “rating” properties should be added internally by the method.

// fn that returns randomRating and generateId
//Generate id take an array[] of movie objects{}
//we can use map to add rating and unique id with Date.now() + index and push movie to MOVIELIST array[]?
//use array.forEach movie add rating and id push to movieList
//can also be use for add new movie?
// fn, getRating, getId, generateMovieObj([{}] || {} ){is.Array array.length}, movieobj Valitation?

/*	
// filter fn, The filter() method creates a new array with all elements that pass the test implemented by the provided function.

2. Returns movies from a certain genre.
	===
10. Returns a movie with a certain id (if found).
	===

// mutated fn	
11. Changes the title of a movie with a certain id (if found). The updated title should be sent in as an argument to the method.
	change title by id
3. Removes a movie with a certain id (if found).
remove movie by id
	remove movie by id

// sort fn letters
5. Returns the movies sorted by name.

// sorting fn ascending
8. Prints out movies sorted from bottom rated to top rated.

// sorting fn descending
6. Returns the 2 top rated movies and 2 bottom rated movies.
7. Prints out the three top rated movies.

// copy array and return mutated
4. Returns the movies with the subtitle and thumb properties filtered out.
remove keys
*/
