// DOM Events 2

// 1. If you click on the list item, it toggles the .done  class on and off.

// 2. Add buttons next to each list item to delete the item when 
//    clicked on its corresponding delete button.

// 3. BONUS: When adding a new list item, 
//    it automatically adds the delete button next to it 

let button = document.getElementById("addItem");
let clearButton = document.getElementById("clearItems")
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let clearCon = document.getElementById("clear");
// Declared here so they exist outside of functions
let yesButton;
let noButton;
let clearWrap;


// Create a new task item
function createItem() {
	let div = document.createElement("div");
	let li = document.createElement("li");
	let deleteButt = document.createElement("button");
	div.classList.add("wrapper");
	// Attach div to the UL
	ul.appendChild(div);
	// Attacht the li and the delete button to the div
	div.append(li, deleteButt);
	li.classList.add("taskItem", "newTask");
	li.appendChild(document.createTextNode(input.value));
	input.value = "";
	deleteButt.classList.add("del");
	deleteButt.innerHTML = "x";
}

// Get length of input string
function inputLength() {
	return input.value.length;
}

// Checks for empty string then calls create Item
function addListAfterClick() {
	if(inputLength() > 0) {
		createItem();
	}
}

// Checks for enter key press
function addListAfterKeypress(event) {
	if(inputLength() > 0 && event.keyCode === 13) { 
		createItem();
	}
}


// If the target is LI, toggle done class
function doneTask(t) {
	if(t.target.tagName === "LI") {
		t.target.classList.toggle("done");
	}
}


// If the target is del button, remove the li (parent element)
function deleteItem(t) {
	if(t.target.className === "del"){
		t.target.parentElement.remove();
	}
}

// Clear Tasks
function clearTasks(t) {
	if (ul.innerHTML !== "") {
		clearWrap = document.createElement("div");
		let warning = document.createElement("paragraph");
		let confirmY = document.createElement("button");
		let confirmN = document.createElement("button");
		clearCon.appendChild(clearWrap);
		clearWrap.append(warning, confirmY, confirmN);
		warning.innerHTML = "Are you sure?";
		confirmY.setAttribute("id", "yes");
		confirmY.innerHTML = "yes";
		confirmN.setAttribute("id", "no");
		confirmN.innerHTML = "no";
		yesButton = document.getElementById("yes");
		noButton = document.getElementById("no");
		yesButton.addEventListener("click", action);
		noButton.addEventListener("click", action);
	}
}

// Confirm Clear
function action(t) {
	if(t.target.id === "yes") {
			ul.innerHTML = "";
			clearWrap.remove();
		} else if (t.target.id === "no") {
			clearWrap.remove();
		}
}

// This function is called when a click event happens
// First will try to run doneTask, then delete
function handleClick(element) {
	doneTask(element);
	deleteItem(element);
}

// Listeners
ul.addEventListener("click", handleClick);
button.addEventListener("click", addListAfterClick);
clearButton.addEventListener("click", clearTasks);

input.addEventListener("keypress", addListAfterKeypress);