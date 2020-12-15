class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }

    //Submit Budget Method
    submitBudgetForm(){
      const value = this.budgetInput.value;
      if(value === '' || value < 0){
        this.budgetFeedback.classList.add('showItem');
        this.budgetFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;

        const self = this;

        setTimeout(function(){
          self.budgetFeedback.classList.remove("showItem");
        }, 4000);
      }else{
        this.budgetAmount.textContent = value;
        this.budgetInput.value = "";
        this.showBalance();
      }
    };

    // Shw Balance
    showBalance(){
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;
      if (total < 0){
        this.balance.classList.remove("showGreen", "showBlack");
        this.balance.classList.add("showRed");
      }
      if (total > 0){
        this.balance.classList.remove("showRed", "showBlack");
        this.balance.classList.add("showGreen");
      }
    }
    // Total Expense
    totalExpense(){
      let total = 400;
      return total;
    }
  }
  
  function eventListenters() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // New Instance of UI Class
    const ui = new UI();

    // Budget Form Submit
    budgetForm.addEventListener('submit',function(event){
      event.preventDefault();
      ui.submitBudgetForm();
    });

    //Expense Form Submit
    expenseForm.addEventListener('submit',function(event){
      event.preventDefault();
    });

    // EXpense List Click
    expenseList.addEventListener('click',function(){
      
    });

    
  }
 

  document.addEventListener('DOMContentLoaded', function(){
    eventListenters();
  });