const API_KEY = 'f22109d4b10ca37ba556d1b8b44eaccb';

const api = axios.create({

    baseURL: 'https://api.themoviedb.org/3/',
    header:{

        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{

        'api_key': API_KEY,
    }
});

const base_Images_Url = 'https://image.tmdb.org/t/p/w300';

//Helpers
function createMoviesList(movies, container){

    container.textContent = '';
    
    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', `${movie.original_title}`)
        movieImg.setAttribute('src', `${base_Images_Url}${movie.poster_path}`)
        movieImg.addEventListener('click', () => {
            
            location.hash = `#movie=${movie.id}`
        })

        movieContainer.append(movieImg);
        container.append(movieContainer);

        
    })
}

function createCategories(categories, container){

    container.textContent = '';
    categories.forEach(categorie => {
    
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        categoryContainer.addEventListener('click', () => {

            location.hash = `#category=${categorie.id}-${categorie.name}`
        })

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-chevron-right');

        const categorieTitle = document.createElement('p');
        categorieTitle.setAttribute('id', `${categorie.id}`);
        categorieTitle.classList.add('categorie-title');
        categorieTitle.textContent = `${categorie.name}`

        categoryContainer.append(icon, categorieTitle);
        container.append(categoryContainer);
    
    });
}

//Llamados a la API

async function getTrendingMoviesPreview(){

    const {data} = await api('trending/movie/day')

    const movies = data.results;

    createMoviesList(movies, trendingPreviewMovieList);

}

async function getTrendingMoviesSection(){

    const {data} = await api('trending/movie/week')

    const movies = data.results;

    createMoviesList(movies, genericList);

}

async function getCategoriesMoviesPreview(){

    const {data} = await api('genre/movie/list')

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);

}

async function getMoviesByCategory(id) {
    
    const {data} = await api('discover/movie', {

        params: {
            with_genres: id,
        },
    })

    const movies = data.results;

    createMoviesList(movies, genericList);

}

async function getMoviesBySearch(query) {
    
    const {data} = await api('search/movie', {

        params: {

            query,
        },
    })

    const movies = data.results;

    createMoviesList(movies, genericList);
    
}

async function getMovieById(id){

    const {data: movie} = await api(`movie/${id}`)

    const star = document.createElement('i');
    star.classList.add("fa-regular", "fa-star");

    const score = movie.vote_average

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = '';
    movieDetailScore.append(star, score);
    
    selectMovieImg.src = `${base_Images_Url}${movie.poster_path}`;

    createCategories(movie.genres, movieDetailCategoriesList);
}

async function getRelatedMoviesById(id){

    const {data} = await api(`movie/${id}/similar`);

    const movie = data.results;

    createMoviesList(movie, relatedMoviesContainer)

}