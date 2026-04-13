// Seletores
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Carregar tarefas do LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
  
  updateTaskCount();
}

// Criar elemento da tarefa
function createTaskElement(task, index) {
  const taskItem = document.createElement('div');
  taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
  taskItem.dataset.index = index;

  taskItem.innerHTML = `
    <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-index="${index}"></div>
    <div class="task-content">
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <span class="priority-tag priority-${task.priority}">
        ${task.priority === 'alta' ? 'Alta' : task.priority === 'media' ? 'Média' : 'Baixa'}
      </span>
    </div>
    <button class="btn-delete" data-index="${index}">×</button>
  `;

  taskList.appendChild(taskItem);
}

// Adicionar nova tarefa
function addTask(e) {
  e.preventDefault();
  
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  
  if (!text) return;
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.push({
    text,
    priority,
    completed: false
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  // Reset form
  taskInput.value = '';
  prioritySelect.value = '';
  
  loadTasks();
}

// Marcar como concluída
function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// Deletar tarefa
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// Atualizar contador
function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const pending = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${pending} ${pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
}

// Event Listeners
taskForm.addEventListener('submit', addTask);

taskList.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  
  if (e.target.classList.contains('task-checkbox')) {
    toggleComplete(index);
  }
  
  if (e.target.classList.contains('btn-delete')) {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
      deleteTask(index);
    }
  }
});

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});