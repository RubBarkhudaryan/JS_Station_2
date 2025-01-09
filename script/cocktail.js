let url_str = window.location.href;

let url = new URL(url_str);
let search_params = url.searchParams;

let id = search_params.get("id");

function createCocktail(cocktail, ingredients, instructions) {
    document.querySelector("title").innerText = cocktail[0].strDrink;
    document.querySelector("h1").innerText = cocktail[0].strDrink;
    document.querySelector("#img").src = cocktail[0].strDrinkThumb;

    const ingredient = document.getElementById("ingredients");
    const instruction = document.getElementById("instructions");

    for (let elem of ingredients) {
        let param = document.createElement("p");
        param.textContent = elem;

        ingredient.appendChild(param);
    }
    for (let elem of instructions) {
        let param = document.createElement("p");
        param.textContent = elem;

        instruction.appendChild(param);
    }

}

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        try {

            const cocktail = Array.from(data.drinks);

            const ingredients = Object.keys(cocktail[0])
                .filter(key => key.startsWith('strIngredient') && cocktail[0][key])
                .map(key => cocktail[0][key]);

            const instructions = Object.keys(cocktail[0])
                .filter(key => key.startsWith('strInstructions') && cocktail[0][key])
                .map(key => cocktail[0][key]);

            createCocktail(cocktail, ingredients, instructions);

        } catch (error) {
            console.error(`Something went wrong. Please try later. Error - ${error}`);
        }
    }).catch(error => {
        console.error(error)
    });


