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
    const taskElements = document.querySelectorAll(isDarkMode ? '.task' : '.taskDark');
    const checkboxElements = document.querySelectorAll(isDarkMode ? '.checkbox' : '.checkboxDark');
    
    taskElements.forEach(task => {
        task.classList.toggle('taskDark', isDarkMode);
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.toggle('checkboxDark', isDarkMode);
    });
}

// Atualiza a saudação com base no horário
function updateGreeting() {
    const greeting = document.getElementById('greeting'); // Seleciona o elemento onde a saudação será exibida
    const hour = new Date().getHours(); // Obtém a hora atual

    let greetingText;

    // Atualiza o texto da saudação com base na hora do dia
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

    edit.classList.toggle('hidden');
    edit.classList.toggle('visible');

    isVisible = !isVisible
}

// Função para criar novas tarefas
function add() {
    const form = document.getElementById('form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const desc = document.getElementById('description').value.trim();

        if (!authenticateInput(title, desc)) return; // Inverte o retorno de authenticateInput: Se for verdadeiro, o return não executa. Mas se for falso ele executa o return e cancela o código. 

        saveTask({ title, desc, check: false });

        renderTasks();
        
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    });
}

// Função para validar os campos
function authenticateInput(titulo, descricao) {
    if (title === "" && desc === "") {
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
    const task = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    const container = document.getElementById('task-container');
    if (!container) return; 

    container.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Obtém a lista de tarefas armazenadas

    // Itera sobre cada tarefa e a adiciona ao container
    tasks.forEach((task, index) => {
        if (task.check) return; // Ignora tarefas já marcadas

        // Cria elementos para a nova tarefa
        const newTask = document.createElement('div');
        newTask.className = "task";
        newTask.id = `task-${index}`; // Define um ID único para cada tarefa

        const quickEdit = document.createElement('button');
        quickEdit.className = 'edit-quick';
        quickEdit.id = `edit-${index}`;

        const editImage = document.createElement('img');
        editImage.id = `icon-edit-${index}`; // Ajustado para ID único
        editImage.className = 'edit-icon';
        editImage.src = "imgs/edit-icon-white.png";
        editImage.alt = "Editar tarefa";

        // Adiciona a imagem ao botão de edição
        quickEdit.appendChild(editImage);

        const inputNewTask = document.createElement('input');
        inputNewTask.type = "checkbox";
        inputNewTask.className = "checkbox";
        inputNewTask.id = `checkbox-${index}`;
        inputNewTask.checked = tarefa.check;

        const textsNewTask = document.createElement('div');
        textsNewTask.className = "texto-tarefa";

        const titleNewTask = document.createElement('h2');
        titleNewTask.className = "title-task";
        titleNewTask.textContent = tarefa.title;

        const descNewTask = document.createElement('p');
        descNewTask.className = "desc-task";
        descNewTask.textContent = tarefa.desc;

        textsNewTask.appendChild(titleNewTask);
        textsNewTask.appendChild(descNewTask);
        newTask.appendChild(inputNewTask);
        newTask.appendChild(textsNewTask);
        newTask.appendChild(quickEdit);
        container.appendChild(newTask);

        // Adiciona um evento para atualizar o estado da tarefa quando o checkbox for alterado
        inputNewTask.addEventListener('change', function() {
            task[index].check = this.checked;
            localStorage.setItem('tasj', JSON.stringify(task));
            renderTasks();
            verifyTaskTheme();
            verifyEmpty();
        });
    });

    // Funções de verificação após renderização
    verifyEmpty();
    verifyTaskTheme();
}

function verifyEmpty() {
    const emptyMessage = document.getElementById('alert-no-task')
    if (container.innerHTML.trim() === '') {
        emptyMessage.classList.remove('hidden')
    } else {
        emptyMessage.classList.add('hidden')
    }
}

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
    document.getElementById('icon-task').src = 'imgs/tasks-white.png';
    let greeting = document.getElementById('greeting');


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

    const taskElements = document.querySelectorAll('.task');
    const checkboxElements = document.querySelectorAll('.checkbox');
    const formElement = document.querySelectorAll('.form', '#edit');

    formElement.forEach(formu => {
        formu.classList.add('formDark');
        formu.classList.remove('form');
    });

    taskElements.forEach(tarefa => {
        tarefa.classList.add('taskDark');
        tarefa.classList.remove('task');
    });

    checkboxElements.forEach(checkbox => {
        checkbox.classList.add('checkboxDark');
        checkbox.classList.remove('checkbox');
    });
}

function applyLightTheme() {
    lateralMenu.classList.add('lateralMenu');
    lateralMenu.classList.remove('lateralMenuDark');
    document.getElementById('iconTask').src = 'imgs/tasks-black.png';

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

    const tasklements = document.querySelectorAll('.taskDark');
    const checkboxElements = document.querySelectorAll('.checkboxDark');
    const formElement = document.querySelectorAll('.formDark', '#editar');

    formElement.forEach(formu => {
        formu.classList.add('form');
        formu.classList.remove('formDark');
    });

    taskElements.forEach(tarefa => {
        tarefa.classList.add('tarefa');
        tarefa.classList.remove('tarefaDark');
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

// Chamar a função ao carregar a página
window.onload = ajustarTamanhoElemento;

// Chamar a função ao redimensionar a janela
window.onresize = ajustarTamanhoElemento;

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
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    function saveTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
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
                                veraddrTemaTarefa();
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
    const lateralMenu = document.getElementById('lateralMenu');

    lateralMenu.style.position = 'fixed';
    lateralMenu.style.bottom = '10px'; // Ajustado para maior espaçamento do fundo
    lateralMenu.style.left = '50%'; // Centraliza horizontalmente
    lateralMenu.style.top = '89%'
    lateralMenu.style.transform = 'translateX(-50%)'; // Ajusta para centralizar
    lateralMenu.style.height = '50px'
    lateralMenu.style.width = 'calc(100% - 20px)'; // Ajusta a largura com uma margem
    lateralMenu.style.maxWidth = '1000px'; // Largura máxima
    lateralMenu.style.padding = '20px'; // Espaçamento interno
    lateralMenu.style.borderRadius = '12px'; // Bordas arredondadas
    lateralMenu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; // Sombra do menu
    lateralMenu.style.boxSizing = 'border-box'; // Inclui padding e border na largura total
    lateralMenu.style.display = 'flex'; // Exibe como flex container
    lateralMenu.style.transition = 'background-color 0.3s, box-shadow 0.3s'; // Adiciona transições suaves

    const empty = document.getElementById('lateralMenu')

    empty.style.scale = '0.1'

} else {
    console.log("O dispositivo não é um celular.");
}
