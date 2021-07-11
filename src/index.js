let tasks = [];
let projects = [];
let currentProject = 'Inbox';

if (localStorage.getItem('tasks') === null) {
  tasks = [
    {
      taskTitle: 'Example Task',
      taskCategory: 'Inbox',
      taskDueDate: '2021/07/12',
    },
    {
      taskTitle: 'Example Task',
      taskCategory: 'Inbox',
      taskDueDate: '2021/07/12',
    },
  ];
} else {
  const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

  tasks = tasksFromStorage;
}
if (localStorage.getItem('projects') === null) {
  projects = [];
} else {
  const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));

  projects = projectsFromStorage;
}

const Project = (title) => {
  const projectTitle = title;
  const addProject = (inputvalue) => {
    const project = Project(inputvalue);
    const inputAddProject = document.querySelector('#input-add-project-popup');

    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    emptyProjects();
    showProjects();
    inputAddProject.value = '';
  };

  return { projectTitle, addProject };
};

const deleteProject = (i) => {
  projects.forEach((project, index) => {
    if (projects.indexOf(project) == i) {
      projects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  });
};

const Task = (title, category, dueDate = 'No date') => {
  const taskTitle = title;
  const taskCategory = category;
  const taskDueDate = dueDate;

  const addTask = (inputvalue, taskCategory) => {
    const task = Task(inputvalue, taskCategory);
    const inputAddTask = document.querySelector('#input-add-task-popup');

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    emptyTasks();
    showTasks();
    inputAddTask.value = '';
  };

  return {
    taskTitle,
    taskCategory,
    addTask,
    taskDueDate,
  };
};

const deleteTask = (i) => {
  tasks.forEach((task, index) => {
    if (tasks.indexOf(task) == i) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
};

const addDueDate = (i, dueDateInputValue) => {
  tasks.forEach((task) => {
    if (tasks.indexOf(task) == i) {
      let year = dueDateInputValue.slice(0, 4);
      let month = dueDateInputValue.slice(5, 7);
      let day = dueDateInputValue.slice(8, 11);

      task.taskDueDate = year + '/' + month + '/' + day;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log(tasks);
      console.log(projects);
    }
  });
};

function emptyTasks() {
  const tasksList = document.querySelector('#tasks-list');
  tasksList.innerHTML = '';
}

function showTasks() {
  const tasksList = document.querySelector('#tasks-list');

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskCategory == currentProject) {
      const taskBtn = document.createElement('button');
      taskBtn.classList.add('button-task');
      taskBtn.innerHTML = `<div class="left-task-panel">
    <i class="far fa-square  complete" aria-hidden="true"></i>
    <p class="task-content">${tasks[i].taskTitle}</p>
    </div>
    <div class="right-task-panel">
    <p class="due-date" id="due-date">${tasks[i].taskDueDate}</p>
    <input type="date" class="input-due-date" />
    </div>`;

      taskBtn.dataset.index = i;

      tasksList.appendChild(taskBtn);
    }
  }

  const addTaskPlus = document.createElement('div');
  addTaskPlus.innerHTML = `<button class="button-add-task" id="button-add-task">
  <i class="fas fa-plus" aria-hidden="true"></i>
  Add Task
</button>
<div class="add-task-popup" id="add-task-popup">
  <input
    type="text"
    class="input-add-task-popup"
    id="input-add-task-popup"
  />
  <div class="add-task-popup-buttons">
    <button class="button-add-task-popup" id="button-add-task-popup">
      Add
    </button>
    <button
      class="button-cancel-task-popup"
      id="button-cancel-task-popup"
    >
      Cancel
    </button>
  </div>
</div>`;

  tasksList.appendChild(addTaskPlus);
  const inputAddTask = document.querySelector('#input-add-task-popup');
  const btnAddTaskPopup = document.querySelector('#button-add-task-popup');
  const btnCancelTaskPopup = document.querySelector(
    '#button-cancel-task-popup'
  );
  const btnAddTask = document.querySelector('#button-add-task');

  btnCancelTaskPopup.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('active');
    e.target.parentElement.parentElement.previousElementSibling.classList.toggle(
      'active'
    );
  });
  btnAddTaskPopup.addEventListener('click', () => {
    const task = Task();
    task.addTask(inputAddTask.value, currentProject);
  });
  btnAddTask.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('active');
  });

  const removeTask = document.querySelectorAll('.complete');
  const dueDateInput = document.querySelectorAll('.input-due-date');
  const dueDate = document.querySelectorAll('.due-date');
  removeTask.forEach((element) => {
    element.addEventListener('click', (e) => {
      dataIndex =
        e.target.parentElement.parentElement.getAttribute('data-index');
      deleteTask(dataIndex);
      e.target.parentElement.parentElement.classList.add('remove');
      element.classList.remove('far', 'fa-square');
      element.classList.add('fas', 'fa-check-square');
      setTimeout(() => {
        emptyTasks();
        showTasks();
      }, 600);
    });
  });

  dueDate.forEach((element) => {
    element.addEventListener('click', (e) => {
      dataIndex =
        e.target.parentElement.parentElement.getAttribute('data-index');
      e.target.classList.toggle('active');
      e.target.nextElementSibling.classList.toggle('active');
    });
  });
  dueDateInput.forEach((element) => {
    element.addEventListener('change', (e) => {
      dataIndex =
        e.target.parentElement.parentElement.getAttribute('data-index');
      dueDateInputValue = e.target.value;
      addDueDate(dataIndex, dueDateInputValue);
      emptyTasks();
      showTasks();
    });
  });
}
function emptyProjects() {
  const projectsList = document.querySelector('#projects-list');
  projectsList.innerHTML = '';
}
function showProjects() {
  const projectsList = document.querySelector('#projects-list');

  for (let i = 0; i < projects.length; i++) {
    const projectkBtn = document.createElement('button');
    projectkBtn.classList.add('button-project');
    projectkBtn.innerHTML = `
      <div class="left-project-panel">
        <i class="fas fa-tasks" aria-hidden="true"></i>
        <span>${projects[i].projectTitle}</span>
      </div>
      <div class="right-project-panel">
        <i class="fas fa-times remove-project" aria-hidden="true" > </i>
      </div>`;
    projectkBtn.dataset.index = i;
    projectsList.appendChild(projectkBtn);
  }

  projectsList.innerHTML += `<button class="button-add-project" id="button-add-project">
  <i class="fas fa-plus" aria-hidden="true"></i>
  Add Project
</button>
<div class="add-project-popup" id="add-project-popup">
  <input
    type="text"
    id="input-add-project-popup"
    class="input-add-project-popup"
  />
  <div class="add-project-popup-buttons">
    <button
      class="button-add-project-popup"
      id="button-add-project-popup"
    >
      Add
    </button>
    <button
      class="button-cancel-project-popup"
      id="button-cancel-project-popup"
    >
      Cancel
    </button>
  </div>
</div>`;

  const inputAddProject = document.querySelector('#input-add-project-popup');
  const btnAddProjectPopup = document.querySelector(
    '#button-add-project-popup'
  );
  const btnCancelProjectPopup = document.querySelector(
    '#button-cancel-project-popup'
  );
  const btnAddProject = document.querySelector('#button-add-project');

  btnAddProjectPopup.addEventListener('click', () => {
    const project = Project();
    project.addProject(inputAddProject.value);
  });

  btnAddProject.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('active');
  });

  btnCancelProjectPopup.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('active');
    e.target.parentElement.parentElement.previousElementSibling.classList.toggle(
      'active'
    );
  });

  const removeProject = document.querySelectorAll('.remove-project');
  removeProject.forEach((element) => {
    element.addEventListener('click', (e) => {
      dataIndex =
        e.target.parentElement.parentElement.getAttribute('data-index');
      deleteProject(dataIndex);
      e.target.parentElement.parentElement.classList.add('remove');

      setTimeout(() => {
        emptyProjects();
        showProjects();
      }, 600);
    });
  });

  const projectSelector = document.querySelectorAll('.button-project');
  projectSelector.forEach((element) => {
    element.addEventListener('click', (e) => {
      dataIndex = element.getAttribute('data-index');
      currentProject = projects[dataIndex].projectTitle;

      const projectName = document.querySelector('#project-name');
      projectName.innerHTML = `${currentProject}`;

      emptyTasks();
      showTasks();
    });
  });

  const inboxProject = document.querySelector('.inbox');
  inboxProject.addEventListener('click', () => {
    currentProject = 'Inbox';
    const projectName = document.querySelector('#project-name');
    projectName.innerHTML = `${currentProject}`;

    emptyTasks();
    showTasks();
  });
  const todayProject = document.querySelector('.today');

  todayProject.addEventListener('click', () => {
    currentProject = 'Today';
    const projectName = document.querySelector('#project-name');
    projectName.innerHTML = `${currentProject}`;

    emptyTasks();
    showTasksToday();
  });
}
function showTasksToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  const tasksList = document.querySelector('#tasks-list');
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskDueDate == today) {
      const taskBtn = document.createElement('button');
      taskBtn.classList.add('button-task');
      taskBtn.innerHTML = `<div class="left-task-panel">
  <i class="far fa-square complete" aria-hidden="true"></i>
  <p class="task-content">${tasks[i].taskTitle}</p>
  </div>
  <div class="right-task-panel">
  <p class="due-date" id="due-date">${tasks[i].taskDueDate}</p>
  <input type="date" class="input-due-date" />
  </div>`;

      taskBtn.dataset.index = i;
      tasksList.appendChild(taskBtn);
    }
  }
  const removeTask = document.querySelectorAll('.complete');

  removeTask.forEach((element) => {
    element.addEventListener('click', (e) => {
      dataIndex =
        e.target.parentElement.parentElement.getAttribute('data-index');
      deleteTask(dataIndex);
      e.target.parentElement.parentElement.classList.add('remove');
      element.classList.remove('far', 'fa-square');
      element.classList.add('fas', 'fa-check-square');

      setTimeout(() => {
        emptyTasks();
        showTasksToday();
      }, 600);
    });
  });
}
const openNav = document.querySelector('#button-open-nav');
const nav = document.querySelector('#nav');
openNav.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const copyright = document.querySelector('.copyright');
currentYear = new Date().getFullYear();
copyright.innerText = `Copyright © ${currentYear} Ali`;

showProjects();
showTasks();
