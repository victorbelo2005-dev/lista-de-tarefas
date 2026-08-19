let input = document.getElementById("inputTarefa");
let botao = document.getElementById("botaoAdicionar");
let lista = document.getElementById("lista");

let tarefas = [];
let filtroAtual = "todas";

carregarTarefas();

botao.addEventListener("click", function(){

    let texto = input.value.trim();
    if(texto === "") return;

    tarefas.push({
        texto: texto,
        concluida: false
    });

    salvarTarefas();
    mostrarTarefas();

    input.value = "";

});

input.addEventListener("keydown", function(evento){
    if(evento.key === "Enter"){
        botao.click();
    }
});

function mostrarTarefas(){

    lista.innerHTML = "";

    tarefas
    .filter(filtrarTarefas)
    .forEach(function(tarefa, index){

        let item = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = tarefa.texto;

        if(tarefa.concluida){
            span.classList.add("concluida");
        }

        // marcar como concluída
        span.addEventListener("click", function(){
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas();
            mostrarTarefas();
        });

        // botão deletar
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "X";

        btnDelete.addEventListener("click", function(){
            let indexReal = tarefas.indexOf(tarefa);
            tarefas.splice(indexReal, 1);
            salvarTarefas();
            mostrarTarefas();
        });

        // botão editar
        let btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";

        btnEditar.addEventListener("click", function(){

            let novoTexto = prompt("Editar tarefa:", tarefa.texto);

            if(novoTexto){
                tarefa.texto = novoTexto;
                salvarTarefas();
                mostrarTarefas();
            }

        });

        item.appendChild(span);
        item.appendChild(btnEditar);
        item.appendChild(btnDelete);

        lista.appendChild(item);

    });

}

function filtrar(tipo){
    filtroAtual = tipo;
    mostrarTarefas();
}

function filtrarTarefas(tarefa){

    if(filtroAtual === "pendentes"){
        return !tarefa.concluida;
    }

    if(filtroAtual === "concluidas"){
        return tarefa.concluida;
    }

    return true;
}

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas(){

    let dados = localStorage.getItem("tarefas");

    if(dados){
        tarefas = JSON.parse(dados);
        mostrarTarefas();
    }

}