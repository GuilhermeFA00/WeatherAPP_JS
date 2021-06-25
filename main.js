//Objeto "Clima" com a API
let clima = {
    API_key: " ",
    fecther_clima: function (locais) {
        // interface JS para acessar e manipular partes do pipeline HTTP
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            locais +
            "&units=metric&appid=" +
            + this.API_key
        )
            //retornando promessas
            .then((response) => {
                if (!response.ok) {
                    alert("Sem informações sobre o clima do local inserido");
                    throw new Error("Sem informações sobre o clima do local inserido");
                }
                return response.json();
            })
            .then((data) => this.clima_display(data));
    },
    //PAREI AQUI
    clima_display: function (data) {
        const { nome } = data;
        const { icone, descrição } = data.clima[0];
        const { temp, humidade } = data.main;
        const { nome } = data;
    }
}