document.getElementById('button').addEventListener('click', (e) => {
    document.querySelector('.row').innerHTML = "";
    let searchName = document.getElementById('searchText').value;
    console.log(searchName);
    searchTvShow(searchName);
})

async function searchTvShow(searchName) {
    try {
        let url = 'https://api.tvmaze.com/search/shows?q=' + searchName;
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data)
        showCards(data);
    } catch (err) {
        console.log(err)
    }
}

function showCards(data) {

    for (let i = 0; i < data.length; i++) {
        let row = document.querySelector('.row');
        let card = document.createElement('div');
        card.setAttribute('class', 'card col-lg-2 col-md-2 p-2 m-2');
        let image = document.createElement('img');
        image.class = "card-img-top img-fluid";
        if (data[i].show.image != null) {
            image.src = data[i].show.image.medium;
        } else {
            image.src = "https://dummyimage.com/250x300/000/fff&text=Dummy+Image+(API+image+not+there)";
        }

        let cardBody = document.createElement('div');
        cardBody.class = "card-body";

        let title = document.createElement('h4');
        title.innerHTML = "Name: " + data[i].show.name;

        let genres = document.createElement('div');
        genres.innerHTML = "Genres: " + data[i].show.genres;

        let schedule = document.createElement('div');
        schedule.innerHTML = "Day: " + data[i].show.schedule.days + " Time: " + data[i].show.schedule.time;

        let countryNetwork = document.createElement('div');
        if (data[i].show.network != null) {
            countryNetwork.innerHTML = "Network: " + data[i].show.network.country.name;
        }

        cardBody.append(title, genres, schedule, countryNetwork)
        card.append(image, cardBody);
        row.append(card);
    }


}