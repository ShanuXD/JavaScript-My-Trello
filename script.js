const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');

// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');



// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

//Global Values To Store the DraggedItem, and Column Number
let updatedOnLoad = false;
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if any present, or set Default
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['React Revision', 'Complete Pending Notes'];
    progressListArray = ['Trello', 'Listen to Tame Impala'];
    completeListArray = ['Day-38-Python-Work-out Project', 'Nav-Animation-JavaScript'];
    onHoldListArray = ['Day39-Python-Flight-Book Project', "Complete Manga Demon-Slayer Chapter-173"];
  }
}

// Update localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray,progressListArray, completeListArray, onHoldListArray];

  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

  arrayNames.forEach((arrayName,index)=>{
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]))
  });

}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("onDragStart", 'drag(event)');

  columnEl.appendChild(listEl)

}

// Update Column - Rest Html, Update LocalStorage
function updateDOM(){

  if (!updatedOnLoad){
    getSavedColumns();
  }

  //Fill All the Column

  //Backlog
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index)=>{
    createItemEl(backlogList, 0, backlogItem, index);
  });
  //Progress
  progressList.textContent = '';
  progressListArray.forEach((backlogItem, index)=>{
    createItemEl(progressList, 1, backlogItem, index);
  });
  //Complete
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index)=>{
    createItemEl(completeList, 2, completeItem, index);
  });
  // On Hold
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index)=>{
    createItemEl(onHoldList, 3, onHoldItem, index);
  });


}

//Draging Task

function drag(event){
  draggedItem = event.target;
  console.log('dragged', draggedItem);
}

// Allow Drop Element Into Another Element
function allowDrop(event){
  event.preventDefault();
}

//When Item Enters Column Area
function dragEnter(column){
  listColumns[column].classList.add('over')
  currentColumn = column;
}

//Dropping Item in Column
function drop(event){
  event.preventDefault();

  //Remove Background Colour
  listColumns.forEach((column)=>{
    column.classList.remove('over');
  });

  //Add Item to Column
  const parent = listColumns[currentColumn]
  parent.appendChild(draggedItem)
}



updateDOM()
