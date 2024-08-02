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

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let titulo = document.getElementById('titulo').value;
        let descricao = document.getElementById('descricao').value;

        let tTask = document.getElementById('task')
        let dTask = document.getElementById('desc')

        if (titulo === "" && descricao === "") {
            alert("Campos vazios!")
        } else if (titulo === "") {
            alert("Insira um título")
        } else {
            tTask.innerText = titulo
            dTask.innerText = descricao
        }
    });
});