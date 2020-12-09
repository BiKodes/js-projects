let calculator_buttons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];


// Select Elements
const input_element = document.querySelector('.input');
const output_result_element = document.querySelector('.result .value');
const output_operation_element = document.querySelector('.operation .value');

// Create Calc Buttons
function createButtons(){
    const btns_per_row = 4;
    let added_btns = 0;

    calculator_buttons.forEach( (button) => {
        if( added_btns % btns_per_row === 0){
            input_element.innerHTML += `<div class ="row"></div>`;
        }

        const row = document.querySelector(".row:last-child");
        
        row.innerHTML += `<button id="${button.name}">
            ${button.symbol}
            </button>`;

        added_btns++;
    } )
}
createButtons();

// Click Event
input_element.addEventListener("click", event =>{
    const target_btn = event.target;

    calculator_buttons.forEach( button => {
        if(button.name == target_btn.id) calculator(button);
    });
});

// Calc Data
let data = {
    operation :[],
    return : []
}

// Calculator
function calculator(button){

 if(button.type == "operator"){
    data.operation.push(button.symbol);
    data.result.push(button.formula);

}else if(button.type == "number"){
    data.operation.push(button.symbol);
    data.result.push(button.formula);

}else if(button.type == "key"){
    if(button.name == "clear"){
    data.operation = [];
    data.result = [];

    updateOutputResult(0);

    }else if(button == "delete") {
    data.operation.pop();
    data.result.pop();
    }  
}else if(button.type == "calculate"){
    let join_result = data.result.join('');

    let result = eval(join_result);

    try{
        result = eval(join_result);
    } catch(error){
        if(error instanceof SyntaxError) {
            result = "Syntax Error";
            updateOutputResult(result);
            return;
        }
    }

    result = formtResult(result);
    updateOutputResult(result);

    data.operation = [];
    data.result = [];
    
    data.operation.push(result);
    data.result.push(result)

    return;

}
updateOutputOPeration(data.operation.join(''));
}

function updateOutputOPeration(operation){
    output_operation_element.innerHTML = operation;
}
function updateOutputResult(result){
    output_result_element.innerHTML = result;
}

// Format result

function formatResult(result){
    const max_output_number = 10;
    const output_precision = 5;

    if(digitCounter(result) > max_output_number){
        if(isFloat(result)){
            const result_ist = parseInt(result);
            const result_int_length = digitCounter(result_int);

            if(result_int_length > max_output_number_length){
                return result.toPrecision(output_precision);
            } else{
                const num_of_digits_after_point = max_output_number - result_int_length;
                return result.toFixed(num_of_digits_after_point);
            }
        }
        else {
            // If The Number Is An Integer
            return result.toPrecision(output_precision)
        }
    }
    else{
        return result;
    }

}

// Digit Counter
function digitCounter(number){
    return number.toString().length;
}

// Check if a number is float or not
function isFloat(number){
    return number % 1 != 0;
}