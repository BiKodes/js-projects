// Select The Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes Names
const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = [], 
    id = 0;

// Get items from local storage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else {
    // if data isn't empty
    LIST = [];
    id = 0;

}

// Load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// Show Todays Date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add To Do Function

function addToDo(toDo, id, done, trash) {


    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = ` <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="0"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="0"></i>
                    </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add an item to the list use the enter key
document.addEventListener("keyup", function(event){
    if(event.keyIdentifier == 13){
        const toDo = input.value;

        // If the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // Add items to the local storage(this code must be added whee the LIST array is updated)
                localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    } 
});

// Complete To Do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove To Do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target;  //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    // Add items to the local storage(this code must be added whee the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
});