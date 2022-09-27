const main = document.querySelector('.main');

const searchForName = document.querySelector('[data-js="searchForName"]');
const searchButton = document.querySelector('[data-js="searchButton"]');
const statusFilter = document.querySelector('[data-js="statusFilter"]');


searchButton.addEventListener('click', event => {   
    event.preventDefault();
    // console.log(searchForName.value);
    // console.log(statusFilter.value);
    // console.log(createWebLink(searchForName.value, statusFilter.value));
    // console.log("test" + getJsonData(createWebLink(searchForName.value, statusFilter.value)));

    const nameArray = getJsonData(createWebLink(searchForName.value, statusFilter.value));
    createCards(nameArray);
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
    return(data.results);
    } catch(error) {
        console.error("Error in getJsonData : " + error.message);
    }
}

function createCards(nameList){
    nameList.forEach((element) => {
        const charakterList = document.createElement("li");
    
        const card = document.createElement("card");
    
        const charakterName = document.createElement("charakterName");
        charakterName.textContent = element.name;
        card.append(charakterName);
    
        const image = document.createElement("img");
        image.setAttribute("src", element.image);
        card.append(image);
    
        charakterList.append(card);
        main.append(charakterList);
      });
}
