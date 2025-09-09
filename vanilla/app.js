const listEl = document.getElementById("list");
const inputEl = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const undoBtn = document.getElementById("undoBtn");

const modal = document.getElementById("modal");
const modalInput = document.getElementById("modalInput");
const modalAdd = document.getElementById("modalAdd");
const modalCancel = document.getElementById("modalCancel");

let items = ["Item 1", "Item 2", "Item 3", "Item 4"];
let selected = [];
let history = [];

function render() {
  listEl.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("regular");
    li.textContent = item;

    if (selected.includes(index)) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      if (selected.includes(index)) {
        selected = selected.filter((i) => i !== index);
      } else {
        selected.push(index);
      }

      render();
    });

    li.addEventListener("dblclick", () => {
      saveHistory();
      items.splice(index, 1);
      selected = [];
      render();
    });

    listEl.appendChild(li);
  });
}

function saveHistory() {
  history.push([...items]);
}

addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("show"), 10);
  modalInput.value = "";
  modalInput.focus();
});

modalCancel.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 400);
}

modalAdd.addEventListener("click", () => {
  const value = modalInput.value.trim();

  if (value) {
    saveHistory();
    items.push(value);
    render();
    closeModal();
  }
});

deleteBtn.addEventListener("click", () => {
  if (selected.length > 0) {
    saveHistory();

    items = items.filter((_, index) => !selected.includes(index));
    selected = [];
    render();
  }
});

undoBtn.addEventListener("click", () => {
  if (history.length > 0) {
    items = history.pop();
    selected = [];
    render();
  }
});

render();
