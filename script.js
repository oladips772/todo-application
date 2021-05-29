/// getting all required elements

const inputBox = document.querySelector(".inputField input"),
addBtn = document.querySelector(".inputField button"),
todoList = document.querySelector(".todoLists"),
deleteBtn = document.querySelector(".todoLists i"),
clearAllBtn =  document.querySelector(".footer button");
const taskCounter = document.querySelector(".taskCounter");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value;  // getting user input
    if (userData.trim() != 0){ /// if user input is not only spaces
        addBtn.classList.add("activeBtn");  /// activate the add button
    }else{
        addBtn.classList.remove("activeBtn");
    }
}


showTasks();
tasks();

/// if user clicks on the add button 
addBtn.onclick = ()=>{
    let userData = inputBox.value;  // getting user input
    let getLocalStorage = localStorage.getItem("New Todo"); /// getting local storage
    if (getLocalStorage == null){ /// if local storage is empty
        listArr =[]; // creating an empty array
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); /// transforming js objecs into js strings
    addBtn.classList.remove("activeBtn");
      showTasks();
      tasks();
}  

/// adding to do lists function
function showTasks (){
    let getLocalStorage = localStorage.getItem("New Todo"); /// getting local storage
    if (getLocalStorage == null){ /// if local storage is empty
        listArr =[]; // creating an empty array
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector(".pendingNumb");
    pendingNumber.textContent = listArr.length; /// passing the length value in the list item 
    if (listArr.length > 0) {
        clearAllBtn.classList.add("active");
    }else{
        clearAllBtn.classList.remove("active");
    }
    
    
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span> </li>`
    });
    todoList.innerHTML = newLiTag; /// adding new to do list 
    inputBox.value = ''; /// leave the input box empty when a to do is added 
}
function tasks (){
    if (listArr.length > 1) {
        taskCounter.innerHTML = "tasks";
    }else{
        taskCounter.innerHTML = "task";
    }
}

/// function delete button on each todolists
  function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //// delete an element at a particular index
///// after deleting the index then update  the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); /// transforming js objecs into js strings
    showTasks();
    tasks();
  }

/// CLEAR ALL BUTTON FUNCTION 
clearAllBtn.onclick = ()=>{
    listArr = [];  /// epmty an arry
    localStorage.setItem("New Todo", JSON.stringify(listArr)); /// transforming js objecs into js strings
    showTasks();
    tasks();
    //// after deleting the todo list then update the storage
}