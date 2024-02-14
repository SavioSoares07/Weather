function searchCity() {
    const userSearchCity = document.getElementById("input-city").value

    if (userSearchCity != "") {
        let formData = new FormData()
        formData.append("city", userSearchCity)

        fetch('/Home/SearchResult', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao enviar os dados: " + res.status);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                createScreenWeather(data)
                // Aqui você pode manipular os dados recebidos
            })
            .catch(e => {
                console.error(e.message);
            });
    } else {
        alert("Por favor, preencha o campo");
    }
}

function createScreenWeather(data) {
    const temperature = document.getElementById("temperatureCity")
    const converterTemp = (data.main.temp - 273.15).toFixed(0)
    temperature.innerText = (converterTemp + "Cº")


    const cityName = document.getElementById("cityName")
    cityName.innerText = data.name

    const humidityCity = document.getElementById("humidityCity")
    humidityCity.innerText = (data.main.humidity + "%")

    const windSpeedCity = document.getElementById("windSpeedCity")
    windSpeedCity.innerText = (data.wind.speed + "Km/h")

}