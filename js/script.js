class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.fechaCreacion = new Date().toLocaleDateString();
        this.completada = false;
    }
}

const tareas = [];
const taskListElement = document.getElementById('taskList');
const taskDescriptionInput = document.getElementById('taskDescription');
const addTaskButton = document.getElementById('addTaskButton');

addTaskButton.addEventListener('click', () => {
    const descripcion = taskDescriptionInput.value.trim();
    if (descripcion === '') {
        alert('La descripción no puede estar vacía.');
        return;
    }
    const nuevaTarea = new Tarea(descripcion);
    tareas.push(nuevaTarea);
    actualizarListaDeTareas();
    taskDescriptionInput.value = '';
});

function actualizarListaDeTareas() {
    taskListElement.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.textContent = `${tarea.descripcion} - ${tarea.fechaCreacion} ${tarea.completada ? '(Completada)' : ''}`;
        

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.style.marginLeft = '10px'; 
        eliminarButton.addEventListener('click', () => {
            tareas.splice(index, 1); 
            actualizarListaDeTareas();
        });

        const completarButton = document.createElement('button');
        completarButton.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
        completarButton.style.marginLeft = '10px'; 
        completarButton.addEventListener('click', () => {
            tarea.completada = !tarea.completada;
            actualizarListaDeTareas();
        });

        li.appendChild(completarButton);
        li.appendChild(eliminarButton);
        taskListElement.appendChild(li);
    });
}
