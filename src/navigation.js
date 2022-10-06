searchFormBtn.addEventListener('click', () => {

    location.hash = `#search=${searchFormInput.value.trim()}`

});

trendingBtn.addEventListener('click', () => {

    location.hash = '#trends='
});

arrowBtn.addEventListener('click', () => {

    history.back();

});

clapperboardHeader.addEventListener('click', () => {
    location.hash = '#home'
})

upButton.addEventListener('click', () => window.scrollTo({top:0}));

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    

    if(location.hash.startsWith('#trends')){

        trendsPage();

    }else if(location.hash.startsWith('#search=')){

        searchPage();

    }else if(location.hash.startsWith('#movie=')){

        movieDetailsPage();
    
    }else if(location.hash.startsWith('#category=')){

        categoriesPage();
    
    }else{

        homePage();
    }

    window.scrollTo({top:0});
}

function homePage(){

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    genericList.classList.add('inactive');
    movieDetail.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}

function trendsPage(){

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');

    headerCategoryTitle.textContent = 'Trending';
    
    getTrendingMoviesSection()
}

function searchPage(){

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    categoriesTitleContainer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function movieDetailsPage(){

    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    categoriesTitleContainer.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericList.classList.add('inactive');
    movieDetail.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');
    
    getMovieById(movieId);
    getRelatedMoviesById(movieId)
}

function categoriesPage(){

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const nonCharacterSpecialName = categoryName.replace('%20',' ');

    headerCategoryTitle.textContent = nonCharacterSpecialName;

    getMoviesByCategory(categoryId);
}