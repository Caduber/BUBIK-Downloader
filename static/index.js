async function download() {

    const url = document.getElementById("url").value;

    // window.alert("Baixando Video");
    document.getElementById("load").style = "display: block;"

    const response = await fetch("http://localhost:7781/api/download/", {
        method: "POST",
        headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify({"url": url})
    });
    const data = await response.json();
    
    if (!response.ok) {
        window.confirm("Um erro ocorreu");
        location.reload();
    }
    else {
        window.confirm(`Video Baixado!\nVerifique a pasta ${data.location}`);
        document.getElementById("load").style = "display: none;"
    }
}

document.getElementById("dldButton").addEventListener("click", download);