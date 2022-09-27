const main = document.querySelector('.main');

const searchForName = document.querySelector('[data-js="searchForName"]');
const searchButton = document.querySelector('[data-js="searchButton"]');
const statusFilter = document.querySelector('[data-js="statusFilter"]');

console.log("test");
searchButton.addEventListener('click', event => {   
    event.preventDefault();
    const webLink = createWebLink(searchForName.value, statusFilter.value);
    getJsonData(webLink);
});

function createWebLink(searchName, status){
    const searchNameApi = searchName.toLowerCase();
    const statusApi = status.toLowerCase(); 
    let webLink="";
    if (searchName === ""){
        return webLink = `https://rickandmortyapi.com/api/character/${statusApi ? '?status=' + statusApi : ''}`;
    } else {
        return webLink = `https://rickandmortyapi.com/api/character/?name=${searchNameApi ? searchNameApi : ''}&status=${statusApi ? statusApi : ''}`;
    }
}

async function getJsonData(Link) {
    try {
    const response = await fetch(Link);
    const data = await response.json();  
    createCards(data.results);
    } catch(error) {
        console.error("Error in getJsonData : " + error.message);
    }
}

let counter =0;
function createCards(nameList){
    console.log(nameList);
    nameList.forEach(name => {
        console.log(counter);
        const charakterList = document.createElement("li");
    
        const card = document.createElement("figure");
    
        const charakterName = document.createElement("figcaption");
        charakterName.textContent = name.name;
        card.append(charakterName);
    
        const image = document.createElement("charakterImage");
        image.setAttribute("src", name.image);
        card.append(image);
    
        charakterList.append(card);
        main.append(charakterList);
    });
}
