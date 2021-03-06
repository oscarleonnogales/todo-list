const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

const listContainer = document.querySelector('[data-lists');
listContainer.addEventListener('click', (e) => {
	if (e.target.tagName.toLowerCase() === 'li') {
		selectedListId = e.target.dataset.listId;
		saveAndRender();
	}
});

const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

newListForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const newListName = newListInput.value;

	const alreadyIncluded = lists.some((listItem) => {
		return listItem.name.toUpperCase() === newListName.toUpperCase();
	});

	if (newListName == null || newListName === '') return;
	newListInput.value = null;

	if (alreadyIncluded) {
		alert('That list is already included');
		return;
	}

	const newList = createNewList(newListName);
	selectedListId = newList.id;
	lists.push(newList);
	saveAndRender();
});

const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
newTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const newTaskName = newTaskInput.value;
	if (newTaskName == null || newTaskName === '') return;
	const newTask = createNewTask(newTaskName);
	const selectedList = lists.find((list) => list.id === selectedListId);
	selectedList.tasks.push(newTask);
	newTaskInput.value = null;
	saveAndRender();
});

function createNewTask(newTaskName) {
	return {
		id: Date.now().toString(),
		name: newTaskName,
		completed: false,
	};
}

renderList();

const deleteListButton = document.querySelector('[data-delete-list-button]');
deleteListButton.addEventListener('click', (e) => {
	lists = lists.filter((listItem) => {
		return listItem.id !== selectedListId;
	});
	selectedListId = null;
	saveAndRender();
});

const currentListContainer = document.querySelector(
	'[data-current-list-container]'
);
const currentListTitle = document.querySelector('[data-current-list-title]');
const taskCounter = document.querySelector('[data-task-counter]');
const tasksContainer = document.querySelector('[data-tasks]');

tasksContainer.addEventListener('click', (e) => {
	if (e.target.tagName.toLowerCase() === 'input') {
		const selectedList = lists.find((list) => list.id === selectedListId);
		console.log(selectedList);
		const selectedTask = selectedList.tasks.find(
			(task) => task.id === e.target.id
		);
		console.log(selectedTask);
		selectedTask.completed = e.target.checked;
		save();
		renderTaskCount(selectedList);
	}
});

const clearCompletedTasksButton = document.querySelector(
	'[data-clear-completed-tasks-button]'
);
clearCompletedTasksButton.addEventListener('click', () => {
	const selectedList = lists.find((list) => list.id === selectedListId);
	selectedList.tasks = selectedList.tasks.filter((task) => !task.completed);
	saveAndRender();
});

function saveAndRender() {
	save();
	renderList();
	renderTasks();
}

function save() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

const taskTemplate = document.querySelector('[data-task-template]');

function renderTasks() {
	if (selectedListId == null) {
		currentListContainer.style.display = 'none';
	} else {
		let selectedList = lists.find((list) => list.id === selectedListId);

		currentListContainer.style.display = '';
		currentListTitle.innerText = selectedList.name;
		renderTaskCount(selectedList);
		clearElement(tasksContainer);

		//Make this a renderTask() function later
		selectedList.tasks.forEach((task) => {
			const taskElement = document.importNode(taskTemplate.content, true);
			const checkbox = taskElement.querySelector('input');
			checkbox.checked = task.completed;
			checkbox.id = task.id;
			const label = taskElement.querySelector('label');
			label.htmlFor = task.id;
			label.append(task.name);

			tasksContainer.appendChild(taskElement);
		});
	}
}

function renderTaskCount(list) {
	const incompleteTask = list.tasks.filter((task) => {
		return !task.completed;
	});
	const count = incompleteTask.length;
	const taskString = count === 1 ? 'task' : 'tasks';
	taskCounter.innerText = `${count} ${taskString} remaining`;
}

function renderList() {
	clearElement(listContainer);
	lists.forEach((listItem) => {
		const listElement = document.createElement('li');
		listElement.innerHTML = listItem.name;
		listElement.dataset.listId = listItem.id;
		if (listItem.id === selectedListId) {
			listElement.classList.add('active');
		}
		listContainer.appendChild(listElement);
	});
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function createNewList(name) {
	return {
		name: name,
		id: Date.now().toString(),
		tasks: [],
	};
}
