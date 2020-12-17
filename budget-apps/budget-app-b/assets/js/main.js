// Item Controller

const itemCtrl = (function(){
    // Item Contructor
    const Item = function(id, description, amount){
        this.id = id; 
        this.description = description;
        this.amount = amount;
    }
    // Data Structure
    const data = {
        items:[]
    }
    // Public Method
    return{
        logData: function(){
            return data;
        },
        addMoney: function(description, amount){
            // Create Random Id
            let ID = itemCtrl.createID();
            // Create New Item
            newMoney = new Item(ID, description, amount);
            // Push It Into The Array
            data.items.push(newMoney);

            return newMoney;
        },
        createID: function(){
            // Create Random Id Number Between 0 and 10000
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },
        getIdNumber: function(item){
            // Get The Item Id
            const amountId = (item.parentElement.id);
            // Break The Id Into An Array
            const itemArr = amountId.split('-');
            // Get The Id Number
            const id = parseInt(itemArr[1]);

            return id;
        },
        deleteAmountArr: function(id){
            // Get All The Ids
            const ids = data.items.map(function(item){
                // Return Item With Id
                return item.id
            });

            // Get Index
            const index = ids.indexOf(id)
            // Remove Item
            data.items.splice(index, 1)
        }
    }
})();

// UI Controller
const UICtrl = (function(){
    // Ui Selectors
    const UISelectors = {
        incomeBtn: '#add__income',
        expenseBtn: '#add__expense',
        description: '#description',
        amount: '#amount',
        moneyEarned: '#amount__earned',
        moneyAvailable: '#amount__available',
        moneySpent: '#amount__spent',
        incomeList: '#income__container',
        expensesList: '#expenses__container',
        incomeItem: '.income__amount',
        expenseItem: '.expense__amount',
        itemsContainer: '.items__container'

    }

    // Public Methods
    return{
        // Return Ui Selectors
        getSelectors: function(){
            return UISelectors
        },
        getDescriptionInput: function(){
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            }
        },
        getValueInput: function(){
            return{
                amountInput: document.querySelector(UISelectors.amount).value
            }
        },
        addIncomeItem: function(item){
            // Create New Div
            const div = document.createElement('div');
            // Add Class
            div.classList = 'item income'
            // Add Id To The Item
            div.id = `item-${item.id}`
            // Add Html
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__income">
                <p class="symbol">Ksh.</p>
                <span class="income__amount">${item.amount}</span>
            </div>
            <i class="fa fa-trash-alt"></i>
            `;

            // Insert Income Into The List
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div)
        },

        clearInputs: function(){
            document.querySelector(UISelectors.description).value = ''
            document.querySelector(UISelectors.amount).value = ''
        },
        updateEarned: function(){
            // All Income Elements
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            // Array With All Incomes
            const incomeCount = [...allIncome].map(item => + item.innerHTML);
            // Calculate The Total Earned
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b
            },0);
            // Display The Total Earned
            const earnedTotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2)
        },

        addExpenseItem: function(item){
            // Create New Div
            const div = document.createElement('div');
            // Add Class
            div.classList = 'item expense'
            // Add Id To The Item
            div.id = `item-${item.id}`
            // Add Html
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__expense">
                <p class="symbol">Ksh</p>
                <span class="expense__amount">${item.amount}</span>
            </div>
            <i class="fa fa-trash-alt"></i>
            `;

            // Insert Income Into The List
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', div);
        },

        updateSpent: function(){
            // All Expenses Elements
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            // Array With All Expenses
            const expenseCount = [...allExpenses].map(item => +item.innerHTML);
            // Calculate The Total
            const expenseSum = expenseCount.reduce(function(a, b){
                return a+b
            },0)
            // Display The Total Spent
            const expensesTotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum;
        },
        updateAvailable: function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML)).toFixed(2)
        },

        deleteAmount:function(id){
            // Create The Id We Will Select
            const amountId = `#item-${id}`;
            // Select The Amount With The Id We Passed
            const amountDelete = document.querySelector(amountId);

            // Remove From ui
            amountDelete.remove();
        }
    }
})();

// App Controller
const App = (function(){
    // Event Listeners
    const loadEventListeners = function(){
        // Get ui Selectors
        const UISelectors = UICtrl.getSelectors();
        // Add New Income
        document.querySelector(UISelectors.incomeBtn).addEventListener('click', addIncome);
        // Add New Expense
        document.querySelector(UISelectors.expenseBtn).addEventListener('click', addExpense);
        // Delete Item
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
    }

    // Add New Income
    const addIncome = function(){
        // Get Description And Amount Values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();

        // If Inputs Are Not Empty
        if(description.descriptionInput !== '' && amount.amountInput !== ''){
            // Add New Item
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Add Item To The List
            UICtrl.addIncomeItem(newMoney);
            // Clear Inputs
            UICtrl.clearInputs();
            // Update Earned
            UICtrl.updateEarned();
            // Calculate Money Available
            UICtrl.updateAvailable();
        }
    }

    // Add New Expense
    const addExpense = function(){
        // Get Description And Amount Values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // If Inputs Are Not Empty
        if(description.descriptionInput !== '' && amount.amountInput !== ''){
            // Add New Item
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Add Item To The List
            UICtrl.addExpenseItem(newMoney);
            // Clear Inputs
            UICtrl.clearInputs();
            // Update Total Spent
            UICtrl.updateSpent();
            // Calculate Money Available
            UICtrl.updateAvailable();
        }
    }

    // Delete Item
    const deleteItem = function(e){
        if(e.target.classList.contains('far')){
            // Get Id Number
            const id = itemCtrl.getIdNumber(e.target)
            // Delete Amount From ui
            UICtrl.deleteAmount(id);
            // Delete Amount From Data
            itemCtrl.deleteAmountArr(id);
            // Update Earned
            UICtrl.updateEarned();
            // Update Total Spent
            UICtrl.updateSpent();
            // Calculate Money Available
            UICtrl.updateAvailable();
        }

        e.preventDefault()
    }

    // Init Function
    return {
        init: function(){
            loadEventListeners();
        }
    }
}) (itemCtrl, UICtrl);

App.init();