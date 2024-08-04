document.addEventListener('DOMContentLoaded', () => {
    criar(); // Inicializa a funcionalidade de criação de tarefas
    renderizarTarefas(); // Renderiza as tarefas ao carregar a página

    // Atualiza a saudação com base na hora
    atualizarSaudacao();

    // Aplica estilos específicos para mobile, se necessário
    if (detectMobile()) {
        aplicarEstilosMobile();
    }
});

function atualizarSaudacao() {
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
}

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

        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;

        if (titulo === "" && descricao === "") {
            alert("Campos vazios!");
            return;
        } else if (titulo === "") {
            alert("Insira um título");
            return;
        }

        const newTask = {
            titulo: titulo,
            descricao: descricao,
            marcado: false
        };

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(newTask);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        renderizarTarefas();
        form.reset();
    });
}

function renderizarTarefas() {
    const container = document.getElementById('container');
    container.innerHTML = '';

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {
        if (tarefa.marcado) return;

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

        inputNewTask.addEventListener('change', function() {
            tarefas[index].marcado = this.checked;
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas();
        });
    });

    if (detectMobile()) {
        aplicarEstilosMobile();
    }
}

function detectMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function aplicarEstilosMobile() {
    const body = document.body.style;
    const tasks = document.getElementsByClassName('tarefa');
    const checkboxes = document.querySelectorAll('.tarefa input[type="checkbox"]');
    const texts = document.querySelectorAll('.texto-tarefa');
    const criarButton = document.querySelector('.criar');
    const form = document.querySelector('form');
    const formInputs = form.querySelectorAll('input');
    const formButton = form.querySelector('button');

    body.fontSize = "10px";

    Array.from(tasks).forEach(task => {
        task.style.height = "60px";
        task.style.width = "100%";
    });

    checkboxes.forEach(checkbox => {
        checkbox.style.width = "15px";
        checkbox.style.height = "15px";
    });

    texts.forEach(text => {
        text.style.marginTop = "2%";
        text.style.marginLeft = "10px";
        text.style.marginBottom = "2%";
        text.style.fontSize = "12px";
    });

    criarButton.style.position = "fixed";
    criarButton.style.width = "40px";
    criarButton.style.height = "40px";
    criarButton.style.bottom = "5px";
    criarButton.style.right = "5px";

    form.style.width = "90%";
    form.style.maxWidth = "250px";
    form.style.padding = "10px";

    formInputs.forEach(input => {
        input.style.padding = "5px";
        input.style.borderRadius = "10px";
        input.style.width = "100%";
    });

    formButton.style.padding = "5px";
    formButton.style.borderRadius = "10px";
    formButton.style.marginTop = "5%";
}
