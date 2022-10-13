const API_KEY = 'f22109d4b10ca37ba556d1b8b44eaccb';
const baseApiUrl = 'https://api.themoviedb.org/3/'
const base_Images_Url = 'https://image.tmdb.org/t/p/w300';

let lang;

langIcon.addEventListener('click', ()=>{

        deployMenu.classList.toggle('inactive');
        langsOptionsContainer.classList.toggle('inactive');


        const optionsArray = langOptions;
        
        optionsArray.forEach(language => {

            language.addEventListener('click', () => {

                lang = language.value;
                homePage();

            })
        })
    }
)

//Data
async function apiQuery(endpoint, id, query){

    const res = await fetch(
        
        `${baseApiUrl}${endpoint}?api_key=${API_KEY}&${id}&query=${query}&language=${lang}`,{

        headers: {

            'Content-Type': 'application/json;charset=utf-8',
        },
        
});

    const data = await res.json();

    return data;

} 

function likedMoviesList(){

    const item = JSON.parse(localStorage.getItem('like_movies_list'));
    let movies;

    if(item){

        movies = item;
    }
    else{

        movies={};
    }

    return movies;
}

function likeMovie(movie){

    const likedMovies = likedMoviesList();    
    
    if(likedMovies[movie.id]){

        likedMovies[movie.id] = undefined;

    }else{

        likedMovies[movie.id] = movie;

    }

    localStorage.setItem('like_movies_list', JSON.stringify(likedMovies));

    if (location.hash.startsWith('')) {
        
        homePage();
    }
}

//Helpers

const lazyLoader = new IntersectionObserver((entries) => {

    entries.forEach((entry) =>{

        if(entry.isIntersecting){

            const urlImg = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', urlImg);
        }
    })
});

function scrollListener(sectionToListen){

    window.addEventListener('scroll', sectionToListen, false);
}

function createMoviesList(
    
        movies, 
        container, 
        {
            lazyLoad = false, 
            clean = true
        } ={}
    )    
    {
    
    if (clean) {
    
        container.textContent = '';
    }
    
    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', `${movie.original_title}`);
        movieImg.setAttribute( lazyLoad ? 'data-img' : 'src', `${base_Images_Url}${movie.poster_path}`);

        movieImg.addEventListener('error', () => {

            movieContainer.classList.add('error-img-msg');
            movieContainer.textContent= '';

            const errorImg = document.createElement('img');
            errorImg.classList.add('error-img');
            errorImg.src = './assets/undraw_location_search_re_ttoj.svg'

            const errorText = document.createElement('p')
            errorText.innerText = `We searched all the galaxies, but we couldn't find the image from this movie.

            This is the name of the movie: ${movie.original_title}.`
            
            movieContainer.append(errorImg, errorText);

        });
        
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('buttons-container');
        movieBtn.addEventListener('click', ()=>{
        
            
            if(iconBtn.classList.contains('fa-regular')){
                
                iconBtn.classList.remove('fa-regular');
                iconBtn.classList.add('fa-solid');
                
            }
            else if(iconBtn.classList.contains('fa-solid')){
                
                iconBtn.classList.remove('fa-solid');
                iconBtn.classList.add('fa-regular');
                
            }
            
            likeMovie(movie);
            likedMoviesList();
        });
        
        const iconBtn = document.createElement('i');
        iconBtn.classList.add('fa-regular', 'fa-heart');
        
        const likedMovies = likedMoviesList();   

        if(likedMovies[movie.id]){

            iconBtn.classList.remove('fa-regular');
            iconBtn.classList.add('fa-solid');
            
        }

        movieBtn.append(iconBtn);
        movieContainer.append(movieBtn);

        if (lazyLoad) {
            
            lazyLoader.observe(movieImg);
        }

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

    const data = await apiQuery('trending/movie/day')

    const movies = data.results;

    createMoviesList(movies, 
        trendingPreviewMovieList, 
        {lazyLoad: true, 
        clean:true});

}

async function getTrendingMoviesSection(){

    const data = await apiQuery('trending/movie/week');

    const movies = data.results;
    maxPage = data.total_pages;

    createMoviesList(movies,
        genericList,
        {lazyLoad: true, 
        clean: true});
    
    scrollListener(getPaginatedTrendingMovies);

}

async function getCategoriesMoviesPreview(){

    const data = await apiQuery('genre/movie/list')

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);

}

async function getMoviesByCategory(id) {
    
    const data = await apiQuery('discover/movie',`with_genres=${id}`);

    const movies = data.results;
        
    createMoviesList(movies, genericList, {lazyLoad: true});
    maxPage = data.total_pages;

}

async function getMoviesBySearch(query) {

    const data = await apiQuery('search/movie','',query)

    const movies = data.results;
    maxPage = data.total_pages;

        
    createMoviesList(movies, genericList, {lazyLoad: true});

}

async function getMovieById(id){

    const movie = await apiQuery(`movie/${id}`);
    
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

    const data = await apiQuery(`movie/${id}/similar`);

    const movie = data.results;

    createMoviesList(movie, relatedMoviesContainer, {lazyLoad: true});

}

//Functions infinite scroll
async function getPaginatedTrendingMovies(){

    const {

        scrollTop, 
        scrollHeight, 
        clientHeight

    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
    const IsNotLimitPage = page < maxPage;

    if (scrollIsBottom && IsNotLimitPage) {
        
        page++;
    
        const res = await fetch(`${baseApiUrl}trending/movie/week?api_key=${API_KEY}&page=${page}`,{
    
            headers: {
    
                'Content-Type': 'application/json;charset=utf-8',
            },
            
        });
    
        const data = await res.json();
        const movies = data.results;

        createMoviesList(movies,
            genericList,
            {lazyLoad: true, 
            clean: false});

    }

}

function getPaginatedSearchedMovies(query){

    return async function (){
    
        const {

            scrollTop, 
            scrollHeight, 
            clientHeight
        
        } = document.documentElement;
        
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
        const IsNotLimitPage = page < maxPage;

        if (scrollIsBottom && IsNotLimitPage) {
            
            page++;
        
            const res = await fetch(`${baseApiUrl}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,{
        
                headers: {
        
                    'Content-Type': 'application/json;charset=utf-8',
                },
                
            });
        
            const data = await res.json();
            const movies = data.results;

            createMoviesList(movies,
                genericList,
                {lazyLoad: true, 
                clean: false});

        }

    }
}

function getPaginatedMoviesByCategory(id) {

    return async function () {

      const {

        scrollTop,
        scrollHeight,
        clientHeight

      } = document.documentElement;
      
      const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
      const pageIsNotMax = page < maxPage;
    
      if (scrollIsBottom && pageIsNotMax) {

        page++;

        const res = await fetch(`${baseApiUrl}discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`,{
        
            headers: {
    
                'Content-Type': 'application/json;charset=utf-8',
            },
            
        });
    
        const data = await res.json();
        const movies = data.results;


        createMoviesList(
        movies,
        genericList,
        { lazyLoad: true, clean: false },
        );
    }
    }
}

//Rendering liked movies
function getLikedMovies(){

    const storage = likedMoviesList();

    const moviesArray = Object.values(storage);

    createMoviesList(
        moviesArray, 
        likedMoviesImgsContainer, 
        {
            'lazyLoad': false, 
            'clean': true,
        })

    console.log(moviesArray);
}

//Scroll
trendingPreviewMovieList.addEventListener('wheel', (evt) => {

    evt.preventDefault();
    trendingPreviewMovieList.scrollLeft += evt.deltaY;
});

likedMoviesImgsContainer.addEventListener('wheel', (evt) => {

    evt.preventDefault();
    likedMoviesImgsContainer.scrollLeft += evt.deltaY;
});