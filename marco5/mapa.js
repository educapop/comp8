onEachFeature: function(feature, layer){

    const UF = feature.id;
    const info = indice[UF];

    if(!info) return;

    // Clique
    layer.on("click", function () {

        document.getElementById("painel-info").innerHTML = `

            <h3>${info.estado}</h3>

            <h4>Reunião do Fórum</h4>

            <p><strong>Cidade:</strong> ${info.Cidade}</p>

            <p><strong>Local:</strong> ${info.Local}</p>

            <p><strong>Data:</strong> ${info.Data}</p>

            <p><strong>Participantes:</strong> ${info.Participantes}</p>

            <p><strong>Movimentos:</strong> ${info.Movimentos}</p>

            <h4>Sobre a composição do Fórum</h4>

            <p>${info.descricao}</p>

            <p>
                <a href="${info.link}" target="_blank">
                    Acessar Portaria
                </a>
            </p>

        `;

    });

    // Mouse
    layer.on({

        mouseover: function(e){

            e.target.setStyle({
                fillColor:"#2e2c7d"
            });

        },

        mouseout: function(e){

            camada.resetStyle(e.target);

        }

    });

}
