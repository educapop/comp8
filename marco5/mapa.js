Promise.all([
    fetch("dados.json").then(r => r.json()),
    fetch("mapas/brasil.json").then(r => r.json())
])

.then(([dados, brasil]) => {

    // Índice por UF
    const indice = {};

    dados.forEach(item => {
        indice[item.UF] = item;
    });

    // Cria o mapa
    const mapa = L.map("mapa", {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false
    });

    // Camada dos estados
    const camada = L.geoJSON(brasil, {

        style: {
            color: "#2e2c7d",
            weight: 1,
            fillColor: "#8278d5",
            fillOpacity: 1
        },

        onEachFeature: function(feature, layer) {

            const UF = feature.id;
            const info = indice[UF];

            if (!info) return;

            // Clique
            layer.on("click", function () {

                document.getElementById("painel-info").innerHTML = `

                    <h2>${info.estado}</h2>

                    <h3>Reunião do Fórum</h3>

                    <p><strong>Cidade:</strong> ${info.Cidade}</p>

                    <p><strong>Local:</strong> ${info.Local}</p>

                    <p><strong>Data:</strong> ${info.Data}</p>

                    <p><strong>Participantes:</strong> ${info.Participantes}</p>

                    <p><strong>Movimentos:</strong> ${info.Movimentos}</p>

                    <h3>Sobre a composição do Fórum</h3>

                    <p>${info.descricao}</p>

                    <p>
                        <a href="${info.link}" target="_blank">
                            Acessar Portaria
                        </a>
                    </p>

                `;

            });

            // Efeito ao passar o mouse
            layer.on({

                mouseover: function(e) {

                    e.target.setStyle({
                        fillColor: "#2e2c7d",
                        weight: 2
                    });

                },

                mouseout: function(e) {

                    e.target.setStyle({
                        fillColor: "#8278d5",
                        weight: 1
                    });

                }

            });

        }

    }).addTo(mapa);

    mapa.fitBounds(camada.getBounds());

});
