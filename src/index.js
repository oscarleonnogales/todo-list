const LOCAL_STORAGE_LIST_KEY = 'task.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

const listContainer = document.querySelector('[data-lists');

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
	lists.push(newList);
	saveAndRenderList();
});

// const newTaskForm = document.querySelector('[data-new-task-form]');
// const newTaskInput = document.querySelector('[data-new-task-input]');

renderList();

function saveAndRenderList() {
	saveList();
	renderList();
}

function saveList() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function renderList() {
	clearList();
	lists.forEach((listItem) => {
		const listElement = document.createElement('li');
		listElement.innerHTML = listItem.name;
		listContainer.appendChild(listElement);
	});
}

function clearList() {
	while (listContainer.firstChild) {
		listContainer.removeChild(listContainer.firstChild);
	}
}

function createNewList(name) {
	return { name: name, id: null, tasks: [] };
}
