"use strict"
let clickState = 0;
// console.log(countries);
const countriesList = {
    elements: {
        /*****  GLOBAL VARIABLES *****/
        subTitle: document.querySelector('.subTitle'),
        searchMeInput: document.querySelector(".searchMeInput"),
        container: document.querySelector(".container"),
        SortByNameBtn: document.querySelector(".nameSortBtn"),
        SortByCapitalBtn: document.querySelector(".capitalSortBtn"),
        SortByPopulationBtn: document.querySelector(".populationSortBtn")
    },
    createContent: function (content) {
        const { name, capital, languages, population, flag } = content;
        return `<div class="box">
    <img src="${flag}"/>
    <h2>${name}</h2>
    <h4>${capital}</h4>
    <p>${languages.join(', ')}</p>
    <p>${population.toLocaleString()}</p>
    </div>`;
    },
    filterCountries: function (arr, search) {
        const filteredList = arr.filter(country => {
            let { name, capital, languages,population } = country;
            let isName = name.toLowerCase().includes(search);
            let isCapital = capital.toLowerCase().includes(search);
            let isLang = languages.join().toLowerCase().includes(search);
            let isPopulation= population.toLocaleString().includes(search);
            return isName || isCapital || isLang || isPopulation;
        });
        let result = search == '' ? arr : filteredList;
        return result;
    },
    displayContent: function (arr) {
        let contents = '';
        container.innerHTML = '';
        arr.forEach((country) => {
            contents += countriesList.createContent(country);
        });
        container.innerHTML = contents;
        subTitle.textContent = arr.length;
    }

};
let { container, subTitle, searchMeInput, SortByNameBtn, SortByCapitalBtn, SortByPopulationBtn } = countriesList.elements;
const { createContent, filterCountries, displayContent } = countriesList;

let sortByNameBtn = false;
displayContent(filterCountries(countries, searchMeInput.value));


/*=== Event listener to get search input === */
searchMeInput.addEventListener('input', (e) => {
    container.innerHTML = " ";
    let searchItem = e.target.value.toLowerCase();
    displayContent(filterCountries(countries, searchItem));
});

/***== Sort By Name   ==***/

SortByNameBtn.addEventListener('click', (e) => {
    SortByNameBtn.setAttribute('style', 'color: white; background-color: #511');
    SortByCapitalBtn.setAttribute('style', 'color: black; background-color: #eee');
    SortByPopulationBtn.setAttribute('style', 'color: black; background-color: #eee');

    if (clickState == 0) {
        displayContent(filterCountries(countries, searchMeInput.value).sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 1;
    } else {
        displayContent(filterCountries(countries, searchMeInput.value).reverse((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 0;
    }

});


/***== Sort By Capital   ==***/

SortByCapitalBtn.addEventListener('click', (e) => {
    SortByCapitalBtn.setAttribute('style', 'color: white; background-color: #511');
    SortByNameBtn.setAttribute('style', 'color: black; background-color: #eee');
    SortByPopulationBtn.setAttribute('style', 'color: black; background-color: #eee');

    if (clickState == 0) {
        displayContent(filterCountries(countries, searchMeInput.value).sort((c1, c2) => {
            if (c1.capital < c2.capital) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 1;
    } else {
        displayContent(filterCountries(countries, searchMeInput.value).reverse((c1, c2) => {
            if (c1.capital < c2.capital) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 0;
    }

});

/***== Sort By Population   ==***/

SortByPopulationBtn.addEventListener('click', (e) => {
    SortByPopulationBtn.setAttribute('style', 'color: white; background-color: #511');
    SortByNameBtn.setAttribute('style', 'color: black; background-color: #eee');
    SortByCapitalBtn.setAttribute('style', 'color: black; background-color: #eee');

    if (clickState == 0) {
        displayContent(filterCountries(countries, searchMeInput.value).sort((p1, p2) => {
            if (p1.population < p2.population) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 1;
    } else {
        displayContent(filterCountries(countries, searchMeInput.value).reverse ((p1, p2) => {
            if (p1.population < p2.population) {
                return -1;
            } else {
                return 1;
            }
        }));
        clickState = 0;
    }


});



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/** this was the old version to createElements
function countryBox() {
    for (let i = 0; i < countriesObject.length; i++) {
        const countryBox = document.createElement("div");
        countryBox.setAttribute("class", "countryBox");
        // this is the flag of this country
        const countryFlag = document.createElement("img");
        countryFlag.setAttribute("class", "flag");
        countryFlag.src = countriesObject[i].flag;
        // this is the name of the country
        const countryName = document.createElement("h4");
        countryName.setAttribute("class", "name");
        countryName.textContent = countriesObject[i].name;
        // this is the capital city of the country
        const capitalCity = document.createElement("span");
        capitalCity.setAttribute("class", "capital");
        capitalCity.textContent = countriesObject[i].capital;
        // the languages of this country
        const countryLang = document.createElement("h5");
        countryLang.setAttribute("class", "lang");
        countryLang.textContent = countriesObject[i].languages;
        // the population of this country
        const countryPopulation = document.createElement("span");
        countryPopulation.setAttribute("class", "population");
        countryPopulation.textContent = countriesObject[i].population;
        // the currency of this country
        const countryCurrency = document.createElement("span");
        countryCurrency.setAttribute("class", "currency");
        countryCurrency.textContent = countriesObject[i].currency;
        countryBox.appendChild(countryFlag);
        countryBox.appendChild(countryName);
        countryBox.appendChild(capitalCity);
        countryBox.appendChild(countryLang);
        countryBox.appendChild(countryPopulation);
        countryBox.appendChild(countryCurrency);
        container.appendChild(countryBox);
    }
};**/

// sortByNameBtn.addEventListener('click', function (e) {
//     sortByNameBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: bolder; background-color: #7B2A01; color:white;");
//     sortByCapitalBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
//     sortByPopulationBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
//     console.log(sortByNameBtn);
//     // searchMe.addEventListener('input', e => {
//     //     console.log(e.target.value);
//     //     let searchItem = e.target.value.toLowerCase();
//     //     countryBox();

//     // });

// });

// sortByCapitalBtn.addEventListener('click', function (e) {
//     sortByCapitalBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: bolder; background-color: #7B2A01; color:white;");
//     sortByNameBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
//     sortByPopulationBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
// });

// sortByPopulationBtn.addEventListener('click', function (e) {
//     sortByPopulationBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: bolder; background-color: #7B2A01; color:white;");
//     sortByCapitalBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
//     sortByNameBtn.setAttribute("style", "border: 1px solid black; cursor: pointer; font-weight: normal; background-color: #dadada; color:black;");
// });

// /*=== Filter function === */
// const filterCountries = (arr, search) => {
//     const filteredCountries = arr.filter(country => {
//         let { name } = country;
//         return name.toLowerCase().includes(search);
//     });
//     let result = search == '' ? arr : filteredCountries;
//     return result;
// };

// getInfoInput.addEventListener("input", e => {
//     let searchTerm=e.target.value.toLowerCase();
//     console.log(e.target.value);

// });

// const filterCountries= (arr,search) => {
//     // let search=getInfoInput.value;
//     const filterCountries= arr.filter(country =>{
//         let {name,capital,languages}=country;
//         return name.toLowerCase().includes(search);
//     });
//     let result= search == ''? arr : filterCountries;
//     return result;
// }
// console.log(filterCountries(countries));