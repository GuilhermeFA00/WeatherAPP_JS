//Creating the object "weather"
let weather = {
    //Storage the API key
    apiKey: "5fea8c812f4aa06484aaf8a1e96e9071",

    //accessing and manipulating parts of the HTTP pipeline, such as requests and responses with Fetch
    //Creating a method
    fetch_api: function (place) {
        //request the API
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" +
            place +
            "&units=metric&appid=" +
            this.apiKey).then(
                (promise) => {
                    if (!promise.ok) {
                        alert("The weather of local unknown");
                        //Creating the exception
                        throw new Error("The weather of local unknown");
                    }
                    return promise.json();
                }).then(
                    (data) => {
                        this.weather_interface(data)
                    }
                )//The structure above created a async function

    },
    //The function where lets access the client HTML
    weather_interface: function (data) {
        //Creating consts according to API datas
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        //Manipulanting the HTML
        document.querySelector(".local").innerText = "O clima em " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C" + " Graus";
        document.querySelector(".hum").innerText = "A humidade é de " + humidity + "%";
        document.querySelector(".vento").innerText = "A velocidade do vento é de " + speed + " KM/H";
        document.querySelector(".clima").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetch_api(document.querySelector(".search-bar").value);
    }
};

//Event add for user click in the time of search
document.querySelector(".buscar button").addEventListener("click", function () {
    weather.search();
});

//Add other event case the user want use the enter
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

//Chamando a função principal
weather.fetch_api("Fortaleza");