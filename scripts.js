let isVisible = false; // Controla o estado de visibilidade

function toggleVisibility() {
    const editar = document.getElementById('editar');

    if (isVisible) {
        editar.classList.remove('visible');
        editar.classList.add('hidden');
    } else {
        editar.classList.remove('hidden');
        editar.classList.add('visible');
    }

    isVisible = !isVisible;
}

function criar() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let titulo = document.getElementById('titulo').value;
        let descricao = document.getElementById('descricao').value;

        if (titulo === "" && descricao === "") {
            alert("Campos vazios!");
            return; // Não cria uma nova tarefa se os campos estiverem vazios
        } else if (titulo === "") {
            alert("Insira um título");
            return; // Não cria uma nova tarefa se o título estiver vazio
        }

        const newTask = {
            titulo: titulo,
            descricao: descricao,
            marcado: false // Adiciona a propriedade marcado para a nova tarefa
        };

        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(newTask);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        renderizarTarefas(); // Renderiza todas as tarefas após adicionar uma nova tarefa

        form.reset(); // Limpar os campos após a submissão
    });
}

function renderizarTarefas() {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Limpa todas as tarefas existentes

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {
        if (tarefa.marcado) return; // Não renderiza tarefas marcadas como removidas

        const newTask = document.createElement('div');
        newTask.className = "tarefa";
        const inputNewTask = document.createElement('input');
        inputNewTask.type = "checkbox";
        inputNewTask.checked = tarefa.marcado;
        const textsNewTask = document.createElement('div');
        textsNewTask.className = "texto-tarefa";
        const titleNewTask = document.createElement('h2');
        titleNewTask.className = "task";
        titleNewTask.textContent = tarefa.titulo;
        const descNewTask = document.createElement('p');
        descNewTask.className = "desc";
        descNewTask.textContent = tarefa.descricao;

        textsNewTask.appendChild(titleNewTask);
        textsNewTask.appendChild(descNewTask);

        newTask.appendChild(inputNewTask);
        newTask.appendChild(textsNewTask);

        container.appendChild(newTask);

        // Adiciona o evento para esconder a tarefa quando o checkbox for marcado
        inputNewTask.addEventListener('change', function() {
            tarefas[index].marcado = this.checked; // Atualiza o estado da tarefa
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas(); // Re-renderiza as tarefas
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    criar(); // Chama a função criar após o DOM estar carregado
    renderizarTarefas(); // Renderiza as tarefas quando a página é carregada
});

const saudacao = document.getElementById('saudacoes');
const now = new Date();
const hour = now.getHours();

if (hour >= 22) {
    saudacao.innerText = "Bons sonhos";
} else if (hour >= 18) {
    saudacao.innerText = "Boa noite";
} else if (hour >= 12) {
    saudacao.innerText = "Boa tarde";
} else if (hour >= 6) {
    saudacao.innerText = "Bom dia";
} else {
    saudacao.innerText = "Boa madrugada";
}