// JS Check
// console.log('it works');

// Declaration
let news = document.querySelector('#news');
let sort = document.querySelector('#sort1');
let search = document.querySelector('#search');
let lan = document.querySelector('#language');
let inputSearch = document.querySelector('#inputSearch');
let dateFrom = document.querySelector('#dateFrom');
let dateTo = document.querySelector('#dateTo');
let today = new Date();

// Function put the news into the HTML
let inputHTML = (item) => {
    let headlineInput = item.title;
    let descriptionInput = item.description;
    let newsDateInput = item.publishedAt;
    let img = item.urlToImage;
    let readMoreInput = item.url;

    // HTML Element erstellen
    let newArticle = document.createElement('article');
    let headline = document.createElement('h2');
    let description = document.createElement('p');
    let newsDate = document.createElement('p');
    let image = document.createElement('img');
    let button = document.createElement('a');

    // Elemente mit Information füllen
    headline.innerText = headlineInput;
    description.innerText = descriptionInput;
    newsDate.innerText = newsDateInput.slice(0, 10);
    image.src = img;
    button.innerText = "READ MORE";
    button.href = readMoreInput;
    button.target = '_blank';

    // Elemente zum HTML hinzufügen
    newArticle.appendChild(headline);
    newArticle.appendChild(description);
    newArticle.appendChild(newsDate);
    newArticle.appendChild(image);
    newArticle.appendChild(button);
    news.appendChild(newArticle);
};

// Standard News / Start
fetch("https://newsapi.org/v2/everything?q=google&from=2022-08-30&sortBy=publishedAt&language=de&apiKey=api-key")
    .then((response) => response.json())
    .then((data) => {
        data.articles.forEach((item) => {
            inputHTML(item);
        });
});

let filterFunction = () => {
    let keywords = inputSearch.value;
    let sortFilter = sort.value;
    let lanFilter = lan.value;
    let dateFromInput = dateFrom.value;
    let dateToInput = dateTo.value;

    // Check if text-input is empty
    if(keywords == '') {
        keywords = 'google';
    } else {
        keywords = inputSearch.value;
    };

    // Date Input check
    if(dateFromInput == '' && dateToInput == '') {
        dateFromInput = '2022-08-30';
        dateToInput = today;
    } else if (dateFromInput == '') {
        dateFromInput = '2022-08-30';
    } else if (dateToInput == '') {
        dateToInput = today;
    } else {
        dateToInput = dateTo.value;
        dateFromInput = dateFrom.value;
    };
    
    let url = `https://newsapi.org/v2/everything?q=${keywords}&from=${dateFromInput}&to=${dateToInput}&sortBy=${sortFilter}&language=${lanFilter}&apiKey=api-key`;

    news.innerHTML = '';
   
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.articles.forEach((item) => {
            inputHTML(item);
        });
    });
};


// Search filter
search.addEventListener('click', (event) => {
    event.preventDefault();
    filterFunction();
});

// Language filter
lan.addEventListener('change', (event) => {
    event.preventDefault();
    filterFunction();
});

// Sort filter
sort.addEventListener('change', (event) => {
    event.preventDefault();
    filterFunction();
});

// Date from filter
dateFrom.addEventListener('change', (event) => {
    event.preventDefault();
    filterFunction();
});

// Date to filter
dateTo.addEventListener('change', (event) => {
    event.preventDefault();
    filterFunction();
});