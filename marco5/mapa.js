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

    // Desenha o Brasil sem mapa de fundo
    const camada = L.geoJSON(brasil, {

        style: {
            color: "#2e2c7d",
            weight: 1,
            fillColor: "#8278d5",
            fillOpacity: 1
        },

        onEachFeature: function(feature, layer){

            const UF = feature.id;

            const info = indice[UF];

            if(!info) return;

            layer.bindPopup(`

                <h3>${info.estado}</h3>
                <h4><strong>Reunião do Fórum</strong></h4>
                <p><strong>Cidade:</strong> ${info.Cidade}</p>
                <p><strong>Local:</strong> ${info.Local}</p>
                <p><strong>Data:</strong> ${info.Data}</p>
                <p><strong>Participantes:</strong> ${info.Participantes}</p>
                <p><strong>Movimentos:</strong> ${info.Movimentos}</p>
                <h4><strong>Sobre a composição do Fórum:</strong></h4>
                <p>${info.descricao}</p>
                <p>
                    <a href="${info.link}" target="_blank">
                        Acessar Portaria
                    </a>
                </p>

            `);

            layer.on({

                mouseover:function(e){

                    e.target.setStyle({

                        fillColor:"#2e2c7d"

                    });

                },

                mouseout:function(e){

                    camada.resetStyle(e.target);

                }

            });

        }

    }).addTo(mapa);

    mapa.fitBounds(camada.getBounds());

});
