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
                // Aqui você pode manipular os dados recebidos
            })
            .catch(e => {
                console.error(e.message);
            });
    } else {
        alert("Por favor, preencha o campo");
    }
}
