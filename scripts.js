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

    isVisible = !isVisible; // Alterna o estado
}