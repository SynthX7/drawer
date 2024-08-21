document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    add();
    updateGreeting();
    setInterval(updateGreeting, 60000);
    verifyEmpty();
    isMobileDevice();
    applySaveTheme();
});

function applySaveTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    darkMode = isDarkMode;
    isDarkMode ? applyDarkTheme() : applyLightTheme();
}

// Adiciona os temas de acordo com o que há salvo
function verifyTaskTheme() {
    const isDarkMode = darkMode === true;
    const taskElements = document.querySelectorAll('.task');
    const checkboxElements = document.querySelectorAll('.checkbox');

    taskElements.forEach(task => {
        task.classList.toggle('taskDark', isDarkMode);
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.toggle('checkboxDark', isDarkMode);
    });
}

// Atualiza a saudação com base no horário
function updateGreeting() {
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greetingText;

    if (hour >= 22 || hour < 6) {
        greetingText = hour >= 22 ? "Bons sonhos" : "Boa madrugada";
    } else if (hour >= 18) {
        greetingText = "Boa noite";
    } else if (hour >= 12) {
        greetingText = "Boa tarde";
    } else {
        greetingText = "Bom dia";
    }

    greeting.innerText = greetingText;
}

// Função para alternar a visibilidade de um elemento
let isVisible = false;

function toggleVisibility() {
    const edit = document.getElementById('edit');
    if (!edit) return;

    isVisible = !isVisible;
    edit.classList.toggle('hidden', !isVisible);
    edit.classList.toggle('visible', isVisible);
}

// Função para criar novas tarefas
function add() {
    const form = document.getElementById('form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const desc = document.getElementById('description').value.trim();

        if (!authenticateInput(title, desc)) return;

        saveTask({ title, desc, check: false });
        renderTasks();
        
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    });
}

// Função para validar os campos
function authenticateInput(titulo, descricao) {
    if (titulo === "" && descricao === "") {
        alert("Campos vazios!");
        return false;
    } else if (titulo === "") {
        alert("Insira um título");
        return false;
    }
    return true;
}

// Função para adicionar uma nova tarefa ao localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    const container = document.getElementById('task-container');
    if (!container) return;

    container.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Verificação adicionada

    tasks.forEach((task, index) => {
        if (task.check) return;

        const newtask = document.createElement('div');
        newtask.className = "task";
        newtask.id = `task-${index}`;

        const quickEdit = document.createElement('button');
        quickEdit.className = 'edit-quick';
        quickEdit.id = `edit-${index}`;

        const editImage = document.createElement('img');
        editImage.id = `icon-edit-${index}`;
        editImage.className = 'edit-icon';
        editImage.src = "imgs/edit-icon-white.png";
        editImage.alt = "Editar tarefa";

        quickEdit.appendChild(editImage);

        const inputtask = document.createElement('input');
        inputtask.type = "checkbox";
        inputtask.className = "checkbox";
        inputtask.id = `checkbox-${index}`;
        inputtask.checked = task.check;

        const textstask = document.createElement('div');
        textstask.className = "text-task";

        const titletask = document.createElement('h2');
        titletask.className = "title-task";
        titletask.textContent = task.title;

        const desctask = document.createElement('p');
        desctask.className = "desc-task";
        desctask.textContent = task.desc;

        textstask.appendChild(titletask);
        textstask.appendChild(desctask);
        newtask.appendChild(inputtask);
        newtask.appendChild(textstask);
        newtask.appendChild(quickEdit);
        container.appendChild(newtask);

        inputtask.addEventListener('change', function() {
            tasks[index].check = this.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            verifyTaskTheme();
            verifyEmpty();
        });
    });

    verifyEmpty();
    verifyTaskTheme();
}


function verifyEmpty() {
    const emptyMessage = document.getElementById('alert-no-task');
    const container = document.getElementById("task-container");
    if (container.innerHTML.trim() === '') {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }
}

let darkMode = false;

function toggleTheme() {
    darkMode = !darkMode;
    darkMode ? applyDarkTheme() : applyLightTheme();
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}

function applyDarkTheme() {
    let lateralMenu = document.getElementsByClassName('tool-bar');
    let lateralItens = document.getElementsByClassName('lateral-itens');

    // Iterando sobre a coleção de elementos para aplicar o estilo
    for (let i = 0; i < lateralMenu.length; i++) {
        lateralMenu[i].style.backgroundColor = "#1c1c1c";
    }

    for (let i = 0; i < lateralItens.length; i++) {
        lateralItens[i].style.color = "#ddd";
    }


    document.getElementById('icon-task').src = 'imgs/tasks-white.png';
    let greeting = document.getElementById('greeting');

    const lateralBar = document.getElementById("lateral-bar");
    lateralBar.style.backgroundColor = '#f0f0f0';

    document.body.style.backgroundColor = "#2a2a2a";
    greeting.style.color = "#dadada";

    const h2Element = document.querySelector('.h2-empty');
    if (h2Element) {
        h2Element.style.color = "#4f4f4f";
    }

    const h3Element = document.querySelector('.h3-empty');
    if (h3Element) {
        h3Element.style.color = "#4f4f4f";
    }

    const imgElement = document.querySelector('.img-empty');
    if (imgElement) {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = "imgs/Empty-dark.png";
            setTimeout(() => {
                imgElement.style.opacity = '1';
            }, 50);
        }, 400);
    }

    const taskHtml = document.querySelectorAll('.task');
    const checkboxElements = document.querySelectorAll('.checkbox');
    const formElement = document.querySelectorAll('.form', '#edit');

    formElement.forEach(formu => {
        formu.classList.add('formDark');
        formu.classList.remove('form');
    });

    taskHtml.forEach(tarefa => {
        tarefa.classList.add('taskDark');
        tarefa.classList.remove('task');
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.add('checkboxDark');
        checkbox.classList.remove('checkbox');
    });
}

function applyLightTheme() {
    let lateralMenu = document.getElementsByClassName('tool-bar');
    let lateralItens = document.getElementsByClassName('lateral-itens');

    // Iterando sobre a coleção de elementos para aplicar o estilo
    for (let i = 0; i < lateralMenu.length; i++) {
        lateralMenu[i].style.backgroundColor = "#eaeaea";
    }

    for (let i = 0; i < lateralItens.length; i++) {
        lateralItens[i].style.color = "#080808";
    }

    document.getElementById('icon-task').src = 'imgs/tasks-black.png';
    let greeting = document.getElementById('greeting');

    document.body.style.backgroundColor = "#f0f0f0";
    greeting.style.color = "#333";

    const h2Element = document.querySelector('.h2-empty');
    if (h2Element) {
        h2Element.style.color = "#aaa";
    }

    const h3Element = document.querySelector('.h3-empty');
    if (h3Element) {
        h3Element.style.color = "#aaa";
    }

    const imgElement = document.querySelector('.img-empty');
    if (imgElement) {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = "imgs/Empty-white.png";
            setTimeout(() => {
                imgElement.style.opacity = '1';
            }, 50);
        }, 400);
    }

    const taskHtml = document.querySelectorAll('.taskDark');
    const checkboxElements = document.querySelectorAll('.checkboxDark');
    const formElement = document.querySelectorAll('.formDark', '#edit');

    formElement.forEach(formu => {
        formu.classList.add('form');
        formu.classList.remove('formDark');
    });

    taskHtml.forEach(tarefa => {
        tarefa.classList.add('task');
        tarefa.classList.remove('taskDark');
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.add('checkbox');
        checkbox.classList.remove('checkboxDark');
    });
}


function ajustSize() {
    const alertNoTask = document.getElementById('alert-no-task');

    if (window.innerWidth < 600) { // se a largura da tela for menor que 600px
        alertNoTask.style.top = "190px"
        alertNoTask.style.scale = '0.80';
    } else {
        alertNoTask.style.scale = '1.0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const tasks = document.getElementsByClassName('task');
    const editImage = document.querySelectorAll('#icon-edit');

    editImage.forEach(editImg => {
        if (editImage) {
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].addEventListener('mouseover', function() {
                    editImage.style.opacity = '1'; // Torna visível
                });
    
                tasks[i].addEventListener('mouseout', function() {
                    editImage.style.opacity = '0'; // Torna invisível
                });
            }
        } else {
            console.error('Elemento editImage não encontrado.');
        }
    })
});

document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.getElementsByClassName('edit-quick');
    const taskTitles = document.getElementsByClassName('task');
    const taskDescs = document.getElementsByClassName('desc');
    const editImage = document.getElementById('icon-edit');

    // Convert HTMLCollection to Array to use forEach
    const editButtonArray = Array.from(editButtons);
    const taskTitleArray = Array.from(taskTitles);
    const taskDescArray = Array.from(taskDescs);

    // Load tarefas from localStorage
    let tarefas = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTarefas() {
        localStorage.setItem('tasks', JSON.stringify(tarefas));
    }

    // Adding event listeners to all edit buttons
    editButtonArray.forEach(button => {
        button.addEventListener('click', () => {
            const isEditable = taskTitleArray.some(taskTitle => taskTitle.isContentEditable) ||
                               taskDescArray.some(taskDesc => taskDesc.isContentEditable);

            if (!isEditable) {
                // Make all task titles and descriptions editable
                taskTitleArray.forEach(taskTitle => taskTitle.contentEditable = true);
                taskDescArray.forEach(taskDesc => taskDesc.contentEditable = true);
                taskTitleArray[0]?.focus(); // Optional: focus on the first task title for immediate editing
                editImage.style.opacity = 0.5; // Optional: Change the icon appearance
            } else {
                // Make all task titles and descriptions non-editable
                taskTitleArray.forEach((taskTitle, index) => {
                    taskTitle.contentEditable = false;

                    // Save the changes on blur
                    taskTitle.addEventListener('blur', function() {
                        if (index < tarefas.length) {
                            tarefas[index].title = this.textContent; // Update tarefa object with the new title
                            saveTarefas(); // Save updated tarefas to localStorage
                            renderTasks(); // Re-render the tasks to update taddew

                            taskTitle.addEventListener('change', function() {
                                tarefas[index].marcado = this.checked;
                                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                                renderTasks(); // Re-renderiza as tarefas para atualizar a visualização
                                verifyTaskTheme();
                                verifyEmpty();
                            });
                        }
                    });
                });
                taskDescArray.forEach((taskDesc, index) => {
                    taskDesc.contentEditable = false;

                    // Save the changes on blur
                    taskDesc.addEventListener('blur', function() {
                        if (index < tarefas.length) {
                            tarefas[index].desc = this.textContent; // Update tarefa object with the new description
                            saveTarefas(); // Save updated tarefas to localStorage
                            renderTasks(); // Re-render the tasks to update the view
                 add  }
                    });
                });
                editImage.style.opacity = 1; // Optional: Restore the icon appearance
            }
        });
    });

    // Function to render tarefas
    function renderTasks() {
        // Your addmentation to render tasks
    }
});

function isMobileDevice() {
    // Obtém o user agent do navegador
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Verifica se o user agent corresponde a um dispositivo móvel
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

// Exemplo de uso
if (isMobileDevice()) {
    // Seleciona o elemento com o ID 'lateralMenu'
    const lateralBar = document.getElementById('lateral-bar');

    lateralBar.style.position = 'fixed';
    lateralBar.style.bottom = '10px'; // Ajustado para maior espaçamento do fundo
    lateralBar.style.left = '50%'; // Centraliza horizontalmente
    lateralBar.style.top = '89%'
    lateralBar.style.transform = 'translateX(-50%)'; // Ajusta para centralizar
    lateralBar.style.height = '50px'
    lateralBar.style.width = 'calc(100% - 20px)'; // Ajusta a largura com uma margem
    lateralBar.style.maxWidth = '1000px'; // Largura máxima
    lateralBar.style.padding = '20px'; // Espaçamento interno
    lateralBar.style.borderRadius = '12px'; // Bordas arredondadas
    lateralBar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; // Sombra do menu
    lateralBar.style.boxSizing = 'border-box'; // Inclui padding e border na largura total
    lateralBar.style.display = 'flex'; // Exibe como flex container
    lateralBar.style.transition = 'background-color 0.3s, box-shadow 0.3s'; // Adiciona transições suaves

    const empty = document.getElementById('alert-no-task')

    empty.style.scale = '0.7'
    empty.style.marginTop = '-50px'
    empty.style.fontSize = '14px'

} else {
    console.log("O dispositivo não é um celular.");
}
