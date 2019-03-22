const foodButton = document.getElementById('random-food-button');
const recipeContent = document.getElementById('recipe-display');
const recipeInstructions = document.getElementById('recipe-instructions');
const recipePicture = document.getElementById('recipe-picture');
const ingredients = document.querySelector('ul');

const movieTitle = document.getElementById('movie-display');
const moviePicture = document.getElementById('movie-picture');
const movieDescription = document.getElementById('movie-description');
const movieExtra = document.getElementById('movie-extra');

const movieSectionBorder = document.querySelector('.movie-container');
const foodSectionBorder = document.querySelector('.food-container');
const buttonContainer = document.getElementById('btn-cont');
const infoTxt = document.querySelector('.intro');
const pluss = document.querySelector('.pluss');
const foodSectionContainers = document.querySelector('.food-container');
const movieSectionContainers = document.querySelector('.movie-container');

foodButton.addEventListener('click', function() {
  foodApi();
  movieApi();
  movieSectionBorder.classList.add('container-border');
  foodSectionBorder.classList.add('container-border');
  buttonContainer.classList.remove('button-container');
  buttonContainer.querySelector('.intro').remove();
  pluss.removeAttribute('style');
  foodSectionContainers.removeAttribute('style');
  movieSectionContainers.removeAttribute('style');
});

const a = document.getElementById('foodSelector');
a.addEventListener(
  'change',
  function() {
    console.log(this.value);
  },
  false
);

const b = document.getElementById('movieSelector');
b.addEventListener(
  'change',
  function() {
    console.log(this.value);
  },
  false
);

function foodApi() {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const recipeObj = JSON.parse(xhr.responseText);

      //recipe name
      const recipeName = recipeObj.meals[0].strMeal;

      //recipe instructions
      const recipeInstructionsContent = recipeObj.meals[0].strInstructions;

      //recipe picture
      const recipePic = recipeObj.meals[0].strMealThumb;

      if (a.value === recipeObj.meals[0].strCategory) {
        console.log(true);
      } else if (a.value === '0') {
        alert('choose option');
      } else {
        foodApi();
      }
      recipeContent.textContent = recipeName;
      recipeInstructions.textContent = recipeInstructionsContent;
      recipePicture.src = recipePic;
      console.log(recipeObj.meals[0].strCategory);
      console.log(a.value);

      //recipe ingredients
      const ingGroup = recipeObj.meals[0];
      const ing = Object.entries(ingGroup).slice(9, 29);
      const mea = Object.entries(ingGroup).slice(29, 49);

      const ingArr = [];
      const meaArr = [];
      const finArr = [];
      while (ingredients.firstChild) {
        ingredients.removeChild(ingredients.firstChild);
      }
      ing.map(x => {
        if (x[1] !== '') {
          if (x[1] !== null) {
            ingArr.push(x[1]);
          }
        }
      });
      mea.map(x => {
        if (x[1] !== '') {
          if (x[1] !== null) {
            meaArr.push(x[1]);
          }
        }
      });

      for (let i = 0; i < ingArr.length; i++) {
        finArr.push(ingArr[i] + ': ' + meaArr[i]);
      }

      finArr.map(x => {
        const ingredientsLi = document.createElement('LI');
        const ingredientText = document.createTextNode(x);
        ingredientsLi.appendChild(ingredientText);
        ingredients.appendChild(ingredientsLi);
      });
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

const movieApi = () => {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=e0cf38b285b4edbae61d3cb5b6086614&language=en-US&page=${randomNumber}`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const movieObj = JSON.parse(xhr.responseText);
      console.log(movieObj.results[0]);
      console.log(typeof movieObj.results[0].genre_ids[0]);
      console.log(typeof parseInt(b.value));
      console.log(movieObj.results[0].genre_ids.includes(10749));
      if (movieObj.results[0].genre_ids.includes(parseInt(b.value))) {
        console.log(true);
      } else if (b.value === '0') {
        alert('choose option');
      } else {
        movieApi();
      }
      const movieTitleEl = movieObj.results[0].original_title;
      const moviePictureEl = movieObj.results[0].poster_path;
      const moviePath = `http://image.tmdb.org/t/p/w500/${moviePictureEl}`;
      const movieDescriptionEl = movieObj.results[0].overview;

      movieTitle.textContent = movieTitleEl;
      movieDescription.textContent = movieDescriptionEl;
      moviePicture.src = moviePath;
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};
