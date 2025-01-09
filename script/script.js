const request = document.querySelector("form");

request.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.key !== "Enter") {
        search_();
    }
});

function createCocktail(name_, image_, id_) {
    let name = document.createElement("h3");
    name.className = "title";
    name.textContent = name_;

    let image = document.createElement("img");
    image.src = image_;

    let link = document.createElement("a");
    link.href = `./cocktails/index.html?id=${id_}`;
    link.appendChild(image);
    link.appendChild(name);

    this.container = document.createElement("div");
    this.container.className = "cocktail-container";
    this.container.appendChild(link);

    return this.container;
}

function search_() {
    let keyword = document.getElementById("keyword");

    const body = document.getElementById("search-result");

    if (body.innerHTML) {
        body.innerHTML = "";
    }

    if (keyword.value != "") {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword.value}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.drinks) {

                    document.getElementById("search-result").innerHTML += `<p class="result">Search results for: ${keyword.value}</p>`;

                    keyword.value = "";

                    let cocktails = Array.from(data.drinks);

                    let res = document.createElement("div");
                    res.className = "cocktails";

                    for (let i = 0; i < cocktails.length; i++) {
                        let cocktail = new createCocktail(cocktails[i].strDrink, cocktails[i].strDrinkThumb, cocktails[i].idDrink);
                        res.appendChild(cocktail);
                    }
                    document.getElementById("search-result").append(res);
                }
                else {
                    document.getElementById("search-result").innerHTML = `<p class="result">No matches found for: ${keyword.value}.</p>`;
                }
            }).catch(error => {
                console.log(error)
            });
    }
    else {
        alert("Insert keyword for search");
    }
}
