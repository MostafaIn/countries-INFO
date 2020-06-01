//  *-<((GLOBAL VARIABLES))>-*
let countries;
let filterOption= 'By Name';
let currentData;

const countriesList = {
    elements:{
        container: document.querySelector('.container'),
        input: document.querySelector('input'),
        count: document.querySelector('span'),
        select: document.querySelector('select'),
        icon: document.querySelector('.fa-sort-alpha-down')
    },
    fetchList: () =>{
        fetch('https://restcountries.eu/rest/v2/all')
        .then( res => res.json())
        .then( data =>{
            console.log(data)
            countries = data,
            displayContent(data)
        })
    },
    createContent: (country, data) =>{
        // console.log(country)
        if(data.length == 1){
            let languages = country.languages.map((lang,i) => lang.name)
            // console.log(languages)
            return `<div class="card">
                <img class="flag" src=${country.flag} alt=${country.name} />
                <table>
                    <tr>
                        <td>NAME :</td>
                        <td>${country.name}</td>
                    </tr>
                    <tr>
                        <td>CAPITAL :</td>
                        <td>${country.capital}</td>
                    </tr>
                    <tr>
                        <td>LANGUAGES :</td>
                        <td>${languages}</td>
                    </tr>
                    <tr>
                        <td>REGION :</td>
                        <td>${country.region}</td>
                    </tr>
                    <tr>
                        <td>PAPULATION :</td>
                        <td>${country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " , ")}</td>
                    </tr>
                    <tr>
                        <td>TIMEZONES :</td>
                        <td>${country.timezones}</td>
                    </tr>
                </table>
                </div>`;
        }
        return `<div class="card">
        <img src=${country.flag} alt=${country.name} />
        <h3>${country.name}</h3>
        </div>`;

    },
    filterCountries: (list, input, option) =>{
    const filteredList = list.filter(country => {
        switch (option) {
            case 'By Name':
                return country.name.toLowerCase().includes(input)
            case 'By Capital':
                return country.capital.toLowerCase().includes(input)
            case 'By Languages':
                let langs = country.languages.map(l => l.name)
                return langs.join('').toLowerCase().includes(input)
            case 'By Region':
                return country.region.toLowerCase().includes(input)
            default:
                return;
        }
    });
        let result = (input === '') ? list : filteredList;
        // console.log(result)
        return result;
    },
    displayContent: (arr) =>{
        let contents = '';
        container.innerHTML = '';
        arr.forEach((country) => {
            contents += countriesList.createContent(country, arr);
        });
        container.innerHTML = contents;
        if (arr.length == 1){
            count.textContent = `There is just ${arr.length} match!`
         }else if(arr.length > 1){
            count.textContent = `There are ${arr.length} matches!`
         }else{
             count.textContent = 'nothing matched!'
         }
         currentData = arr;

    }

};


//  *-<((DISTRUCTURING))>-*
let {container, input, count, select, icon} = countriesList.elements;
let { fetchList, createContent, filterCountries, displayContent} = countriesList;


// *-<((EVENTS))>-*
document.addEventListener('DOMContentLoaded', fetchList);

input.addEventListener('input', (e) =>{
    container.innerHTML = " ";
    let searchItem = e.target.value.toLowerCase();
    displayContent(filterCountries(countries, searchItem, filterOption));
}); 

select.addEventListener('change', () =>{
    return filterOption = select.value;
});

icon.addEventListener('click',() => {
    // console.log('currentDAta',currentData)
    if(icon.classList.contains('fa-sort-alpha-down')){
        icon.classList.remove('fa-sort-alpha-down')
        icon.classList.add('fa-sort-alpha-up')
        let sorted = currentData.sort((c1 , c2) => (c1.name < c2.name) ? 1 : -1)
        // console.log('sorted',sorted)
        displayContent(sorted)
    }else{
        icon.classList.remove('fa-sort-alpha-up')
        icon.classList.add('fa-sort-alpha-down')
        let reversed = currentData.reverse((c1 , c2) => (c1.name < c2.name) ? 1 : -1)
        displayContent(reversed)
    }
    
});
