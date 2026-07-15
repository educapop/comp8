fetch("dados.json")

.then(response => response.json())

.then(dados => {

    const lista = document.getElementById("lista");

    // Cria os acordeões
    dados.forEach(item => {

        const accordion = document.createElement("div");
        accordion.className = "accordion";

        accordion.innerHTML = `
            <button class="accordion-button">
                <span class="seta">▶</span>
                ${item.estado}
            </button>

            <div class="content">

                <p>${item.descricao}</p>

                <p>
                    <a href="${item.link}" target="_blank">
                        Acessar portaria
                    </a>
                </p>

            </div>
        `;

        lista.appendChild(accordion);

    });

    // Eventos dos acordeões
    document.querySelectorAll(".accordion-button").forEach(botao=>{

        botao.addEventListener("click",()=>{

            const accordion = botao.parentElement;
            const aberto = accordion.classList.contains("active");

            // Fecha todos
            document.querySelectorAll(".accordion").forEach(item=>{

                item.classList.remove("active");

                item.querySelector(".seta").textContent="▶";

            });

            // Abre o clicado
            if(!aberto){

                accordion.classList.add("active");

                botao.querySelector(".seta").textContent="▼";

            }

        });

    });

})

.catch(error=>{

    console.error(error);

    document.getElementById("lista").innerHTML=
        "<p>Não foi possível carregar os dados.</p>";

});
