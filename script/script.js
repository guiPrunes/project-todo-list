const ul_tarefas = document.querySelector("#ul-tarefas"); 
ul_tarefas.addEventListener("click", excluirTarefa);
let id_contador = 0; // Contador crescente para numerar id's.

function adicionarTarefa() {
    const descricaoTarefa = document.getElementById('tarefa-descricao').value;
    if (descricaoTarefa != "" && verificarDuplicidade(descricaoTarefa) == false) {
        /* Vefica se:
            * A descrição da tarefa não estiver vazia e;
            * A tarefa não existe dentro da lista de tarefas. 
         */
        criarLinhaTarefa(descricaoTarefa);
        document.getElementById('tarefa-descricao').value = ""; // Limpar o campo do input.
    } else {
        if (descricaoTarefa == "") { // Se estiver vazia.
            alertaAtencao("O campo está vazio, tente novamente!") 
        }
        else { // Se existir dentro da lista de tarefas.
            alertaAtencao("Essa tarefa já existe, tente novamente!")
        }
    }
}

/**
* Cria uma linha na lista de tarefas (<li>) do template quando chamado.
* @param {string} descricao - A descrição da tarefa.
*/
function criarLinhaTarefa(descricao) {
    id_contador += 1; 
    const templateLinhaTarefaHTML = `<li>
                    <div class="tarefa-container">
                        <div class="tarefa-checkbox"> 
                            <input id="tarefa-checkmark-${id_contador}" class="substituted" type="checkbox"/>
                            <label for="tarefa-checkmark-${id_contador}"></label>
                        </div>
                        <label for="tarefa-checkmark-${id_contador}" class="tarefa-desc">${descricao}</label>
                        <button class="tarefa-button-delete" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                    <hr class="tarefa-hr">
                </li>`;
    ul_tarefas.insertAdjacentHTML("beforeend", templateLinhaTarefaHTML); 
    // Adiciona dentro de um elemento pai (ul) , na última posição dos filhos (li), o template da tarefa.
}

/**
* Remove uma linha da lista de tarefas (<li>) quando apertado no botão de excluir
* @param {MouseEvent} event - O evento disparado dentro da ul
* 
*/
function excluirTarefa(event) {
    const areaClick = event.target.closest(".tarefa-button-delete");
    if (areaClick !== null) { // Se o clique for no botão de excluir
        Swal.fire({
            title: "Deseja excluir essa tarefa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, por favor!",
            cancelButtonText: "Cancelar"
        }).then((result) => { // Promise de confirmação
            if (result.isConfirmed) { // Se confirmar a exclusão
                const tarefaClick = areaClick.closest("li"); // Encontra a linha clicada (<li> mais próximo)
                tarefaClick.remove();

                Swal.fire({
                    title: "Excluida!",
                    icon: "success"
                });
            }
        });
    }
}

/**
* Consulta na lista de tarefas se já existe uma tarefa com a mesma descrição na lista
* @param {string} descricao - A descrição da tarefa.
* @returns {boolean} true se já existir, false se não existir.
*/
function verificarDuplicidade(descricao) {
    const listaTarefas = Array.from(document.querySelectorAll(".tarefa-desc")); // Transforma Node List num Array comum.
    return listaTarefas.some((tarefa) => tarefa.textContent == descricao); // Retorna true caso encontrar tarefas iguais.
};

function alertaAtencao(texto) {;
    Swal.fire({ 
            icon: "warning", 
            title: "Espere...", 
            text: `${texto}`, 
        });
}