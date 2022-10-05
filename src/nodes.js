const $ = (id) => document.querySelector(id);

// Sections
const headerSection = $('#header');
const trendingPreview = $('#trendingPreview');
const categoriesSection = $('#categoriesSection');
const genericList = $('#genericList');
const movieDetail = $('#movieDetail');

//Lists & containers
const searchForm = $('#searchForm');
const trendingPreviewSection = $('#trendingPreview');
const trendingPreviewMovieList = $('.trendingPreview-movieList'); 
const categoriesPreviewList = $('.categoriesSection-container');
const movieDetailCategoriesList = $('#movieDetail .movie-categories')
const relatedMoviesContainer = $('.relatedMovies-container');

//Elements
const headerTitle = $('.header-title');
const arrowBtn = $('#header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('.searchHeader-button');
const clapperboardHeader = $('#clapperboardHeader');

const trendingBtn = $('.trendingPreview-btn');
const upButton = $('.up-button')

const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
const selectMovieImg = $('.selectMovie-img')

export {headerSection,
        trendingPreviewSection,
        trendingPreview, 
        categoriesSection, 
        genericList, 
        movieDetail,
        searchForm,
        trendingPreviewMovieList,
        categoriesPreviewList,
        relatedMoviesContainer,
        headerTitle,
        arrowBtn,
        headerCategoryTitle,
        searchFormInput,
        searchFormBtn,
        trendingBtn,
        movieDetailTitle,
        movieDetailDescription,
        movieDetailScore,
        clapperboardHeader,
        upButton,
        selectMovieImg,
        movieDetailCategoriesList
    };


