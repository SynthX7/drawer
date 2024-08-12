document.addEventListener('DOMContentLoaded', () => {
    renderizarTarefas(); // Renderiza as tarefas ao carregar a página
    criar(); // Inicializa a funcionalidade de criação de tarefas
    atualizarSaudacao()
    setInterval(atualizarSaudacao, 60000); // Atualiza a saudação

    // Aplica o tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        darkMode = true;
        applyDarkTheme(); // Aplica o tema escuro
    } else {
        darkMode = false;
        applyLightTheme(); // Aplica o tema claro
    }
});

function verificarTemaTarefa() {
    if (darkMode === false) {
        const tarefaElements = document.querySelectorAll('.tarefaDark');
        const checkboxElements = document.querySelectorAll('.checkboxDark');

        tarefaElements.forEach(tarefa => {
            tarefa.classList.remove('tarefaDark');
        });

        checkboxElements.forEach(checkbox => {
            checkbox.classList.remove('checkboxDark');
        });
    } else {
        const tarefaElements = document.querySelectorAll('.tarefa');
        const checkboxElements = document.querySelectorAll('.checkbox');

        tarefaElements.forEach(tarefa => {
            tarefa.classList.add('tarefaDark');
        });

        checkboxElements.forEach(checkbox => {
            checkbox.classList.add('checkboxDark');
        });
    }
}

// Função para atualizar a saudação com base na hora do dia
function atualizarSaudacao() {
    const saudacao = document.getElementById('saudacoes'); // Seleciona o elemento onde a saudação será exibida
    const now = new Date(); // Obtém a data e hora atuais
    const hour = now.getHours(); // Extrai a hora atual

    // Atualiza o texto da saudação com base na hora do dia
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

let isVisible = false; // Variável para controlar o estado de visibilidade de um elemento

// Função para alternar a visibilidade de um elemento
function toggleVisibility() {
    const editar = document.getElementById('editar'); // Seleciona o elemento que terá a visibilidade alternada
    if (!editar) return; // Verifica se o elemento existe

    editar.classList.toggle('visible');
    editar.classList.toggle('hidden');

    isVisible = !isVisible; // Inverte o estado de visibilidade
}

// Função para criar novas tarefas
function criar() {
    const form = document.getElementById('form'); // Seleciona o formulário de criação de tarefas
    if (!form) return; // Verifica se o formulário existe

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário (envio)

        const titulo = document.getElementById('titulo').value; // Obtém o valor do campo de título
        const descricao = document.getElementById('descricao').value; // Obtém o valor do campo de descrição

        // Valida se os campos estão preenchidos e exibe alertas se necessário
        if (titulo === "" && descricao === "") {
            alert("Campos vazios!");
            return;
        } else if (titulo === "") {
            alert("Insira um título");
            return;
        }

        // Cria um novo objeto de tarefa
        const newTask = {
            titulo: titulo,
            descricao: descricao,
            marcado: false // Inicialmente a tarefa não está marcada
        };

        // Obtém a lista de tarefas armazenadas no localStorage ou inicializa como uma lista vazia
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(newTask); // Adiciona a nova tarefa à lista
        localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o localStorage com a lista de tarefas

        renderizarTarefas(); // Renderiza as tarefas para exibir a nova tarefa
        form.reset(); // Limpa os campos do formulário
    });
}

// Função para renderizar as tarefas na tela
function renderizarTarefas() {
    const container = document.getElementById('container'); // Seleciona o elemento que irá conter as tarefas
    if (!container) return; // Verifica se o container existe

    container.innerHTML = ''; // Limpa o conteúdo atual do container

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Obtém a lista de tarefas armazenadas

    // Itera sobre cada tarefa e a adiciona ao container
    tarefas.forEach((tarefa, index) => {
        if (tarefa.marcado) return; // Ignora tarefas já marcadas

        // Cria elementos para a nova tarefa
        const newTask = document.createElement('div');
        newTask.className = "tarefa";
        newTask.id = `tarefa-${index}`; // Define um ID único para cada tarefa

        const inputNewTask = document.createElement('input');
        inputNewTask.type = "checkbox";
        inputNewTask.className = "checkbox";
        inputNewTask.id = `checkbox-${index}`; // Define um ID único para cada checkbox
        inputNewTask.checked = tarefa.marcado;

        const textsNewTask = document.createElement('div');
        textsNewTask.className = "texto-tarefa";

        const titleNewTask = document.createElement('h2');
        titleNewTask.className = "task";
        titleNewTask.textContent = tarefa.titulo;

        const descNewTask = document.createElement('p');
        descNewTask.className = "desc";
        descNewTask.textContent = tarefa.descricao;

        // Adiciona os elementos criados ao DOM
        textsNewTask.appendChild(titleNewTask);
        textsNewTask.appendChild(descNewTask);
        newTask.appendChild(inputNewTask);
        newTask.appendChild(textsNewTask);
        container.appendChild(newTask);

        // Adiciona um evento para atualizar o estado da tarefa quando o checkbox for alterado
        inputNewTask.addEventListener('change', function() {
            tarefas[index].marcado = this.checked;
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas(); // Re-renderiza as tarefas para atualizar a visualização
            verificarTemaTarefa();
        });

        verificarTemaTarefa();

        const emptyMessage = document.getElementById('fotoSemTarefas')
        if (container.innerHTML.trim() === '') {
            emptyMessage.classList.remove('hidden')
        } else {
            emptyMessage.classList.add('hidden')
        }
    });
}

const elements = {
    themeButton: document.getElementById('theme'),
    iconTheme: document.getElementById('iconTheme'),
    saudacoes: document.getElementById('saudacoes'),
    toggleFormButton: document.getElementById('toggleForm'),
    plusIcon: document.getElementById('plusIcon'),
    editarDiv: document.getElementById('editar'),
    tituloInput: document.getElementById('titulo'),
    descricaoInput: document.getElementById('descricao'),
    enviarButton: document.getElementById('enviar'),
    containerDiv: document.getElementById('container'),
    lateralMenu: document.getElementById('lateralMenu')
};

let darkMode = false;

function toggleTheme() {
    if (darkMode === false) {
        applyDarkTheme();
        darkMode = !darkMode;
        console.log(darkMode)
    } else {
        applyLightTheme();
        darkMode = !darkMode;
        console.log(darkMode)
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}

function applyDarkTheme() {
    lateralMenu.classList.add('lateralMenuDark');
    lateralMenu.classList.remove('lateralMenu');
    document.getElementById('iconTask').src = 'imgs/tasks-white.png';

    document.getElementById('menu').style.backgroundColor = "#2a2a2a";
    document.getElementById('iconMenu').src = 'imgs/menu-white.png';

    document.body.style.backgroundColor = "#2a2a2a"; // Cor de fundo escura
    elements.saudacoes.style.color = "#dadada"; // Cor do texto claro

        // Para definir a cor do único elemento <h2> com a classe 'h2-empty'
    const h2Element = document.querySelector('.h2-empty');
    if (h2Element) {
        h2Element.style.color = "#9e9e9e";
    }

    // Para definir a cor do único elemento <h3> com a classe 'h3-empty'
    const h3Element = document.querySelector('.h3-empty');
    if (h3Element) {
        h3Element.style.color = "#9e9e9e";
    }

    // Para definir a fonte da única imagem com a classe 'img-empty'
    const imgElement = document.querySelector('.img-empty');
    if (imgElement) {
        imgElement.src = "imgs/Empty-dark.png";
    }

    const tarefaElements = document.querySelectorAll('.tarefa');
    const checkboxElements = document.querySelectorAll('.checkbox');
    const formulario = document.querySelectorAll('.form', '#editar');

    formulario.forEach(formu => {
        formu.classList.add('formDark'); // Adiciona a classe para o formulário
    });
    tarefaElements.forEach(tarefa => {
        tarefa.classList.add('tarefaDark');
    });
    checkboxElements.forEach(checkbox => {
        checkbox.classList.add('checkboxDark');
    });
}

function applyLightTheme() {
    lateralMenu.classList.add('lateralMenu');
    lateralMenu.classList.remove('lateralMenuDark');
    document.getElementById('iconTask').src = 'imgs/tasks-black.png';

    document.getElementById('menu').style.backgroundColor = "#EBEBDF";
    document.getElementById('iconMenu').src = 'imgs/menu-black.png';

    document.body.style.backgroundColor = "#EBEBDF"; // Cor de fundo clara
    elements.saudacoes.style.color = "#333"; // Cor do texto escura

    const tarefaElements = document.querySelectorAll('.tarefaDark');
    const checkboxElements = document.querySelectorAll('.checkboxDark');
    const formulario = document.querySelectorAll('.form');
    const menuLateral = document.querySelectorAll('#lateralMenu');

    // Para definir a cor do único elemento <h2> com a classe 'h2-empty'
    const h2Element = document.querySelector('.h2-empty');
    if (h2Element) {
        h2Element.style.color = "#9e9e9e";
    }

    // Para definir a cor do único elemento <h3> com a classe 'h3-empty'
    const h3Element = document.querySelector('.h3-empty');
    if (h3Element) {
        h3Element.style.color = "#9e9e9e";
    }

    // Para definir a fonte da única imagem com a classe 'img-empty'
    const imgElement = document.querySelector('.img-empty');
    if (imgElement) {
        imgElement.src = "imgs/Empty-white.png";
    }


    formulario.forEach(formu => {
        formu.classList.remove('formDark'); // Remove a classe para o formulário
    });

    tarefaElements.forEach(tarefa => {
        tarefa.classList.remove('tarefaDark');
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.remove('checkboxDark');
    });

}

function toggleMenu() {
    const menu = document.getElementById("lateralMenu");

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

document.getElementById("menu").addEventListener("click", function() {
    const image = document.getElementById("iconMenu")

    if (image.classList.contains('rotateImage')) {
        image.classList.remove("rotateImage")
    } else [
        image.classList.add("rotateImage")
    ]

});
