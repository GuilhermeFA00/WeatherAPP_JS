//Criando o objeto "clima"
let clima = {
    //Guardando chave de API
    apiKey: "3889a9dd412b6dae854c90910fcd4332",
    fetch_clima: function (local) {
        //"Buscando" a API
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" +
            local +
            "&units=metric&appid=" +
            this.apiKey)

            //Retornando uma 'Promise',com duas call-backs,uma para o sucesso e outra para falha
            .then((response) => {
                if (!response.ok) {
                    alert("-Clima do local desconhecido-")
                    //Criando exceção
                    throw new Error("-Clima do local desconhecido-")
                }
                return response.json();

            })
            .then((data) => this.clima_screen(data))
    },
    //Criando a função para mostrar o clima na página de acordo com os dados   
    clima_screen: function (data) {
        const { nome } = data;
        const { icon, descri } = data.weather[0];
        const { temp, hum } = data.main;
        const { veloc } = data.wind;

        //Acessando os dados do cliente
        document.querySelector(".local").innerText = "O clima em " + nome;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".desc").innerText = descri;
        document.querySelector(".temp").innerText = temp + "°C" + " Graus";
        document.querySelector(".hum").innerText = "A humidade é de" + hum + "%";
        document.querySelector(".vento").innerText = "A velocidade do vento é de " + veloc + "KM/H";
        document.querySelector(".clima").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + nome + "')";
    },
    //Função para a busca
    busca: function () {
        this.fetch_clima(document.querySelector(".search-bar").value);
    },
};

//Adicionando um evento após um clique na barra de busca
document.querySelector(".search-bar").addEventListener("click", function () {
    clima.busca();
})

//Adicionando outro evento caso haja um 'enter' na hora de pesquisar
document.querySelector(".search-bar").addEventListener("keyup", function (evento) {
    if (evento.key == "Enter") {
        clima.busca();
    }
});

//Chamando a função principal
clima.fetch_clima("São Paulo")