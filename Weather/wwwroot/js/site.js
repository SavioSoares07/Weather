function searchCity() {
    const userSearchCity = document.getElementById("input-city").value

    if (userSearchCity != "") {
        let formData = new FormData()
        formData.append("city", userSearchCity)

        fetch('/Home/SearchResult', {
            method: 'POST',
            body : formData
        })
            .then(res => {
                if (res.ok) {
                    console.log("Dados enviados com sucesso!")
                } else {
                    console.error("Erro ao enviar os dados")
                }
            }).catch(e => {
                console.error(e)
            })
    } else {
        alert("Por favor preencha o campo")
    }
}