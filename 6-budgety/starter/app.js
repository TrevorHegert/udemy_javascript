//////////////////////////////////////////////////
// Budget Calculation Module

var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (current) {
      sum = sum + current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };


  //Methods to be made available to other modules
  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 1;
      }

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },

    //Calculate Total Expenses and Incomes, determine remainging budget amount and used percentage
    calculateBudget: function () {
      //1. Calculate Total Sums for Incomes and Expenses
      calculateTotal("exp");
      calculateTotal("inc");

      //2. Calculate the budget (total income - total expenses)
      data.budget = data.totals.inc - data.totals.exp;

      //3. Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    //Export Budget Data as an Object
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    //Developer Testing Method, Unnecessary for Application Functionality
    testing: function () {
      console.log(data);
    }
  };
})();

//////////////////////////////////////////////////
// UI Interface Module

var UIController = (function () {

  //Keep all class selector elements here to simplify future changes to HTML 
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    expensePercentage: ".budget__expenses--percentage",
    container: ".container"
  };

  //Methods to be made available to other modules
  return {

    //Export Contents of Input Fields
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    //Accept and Insert a new income or expense list item into the HTML code
    addListItem: function (obj, type) {
      var html, newHtml, element;

      //1. Create HTML string with placeholder text

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //2. Replace the placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //3. Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    //Clear the input fields of user entered data
    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();
    },

    //Accept and Insert new data for Budget display
    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent =
        "$ " + obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        "$ " + obj.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        "$ " + obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.expensePercentage).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.expensePercentage).textContent =
          "n/a";
      }
    },

    //Export HTML class name variables as an object for use by other modules
    getDOMstrings: function () {
      return DOMstrings;
    }
  };
})();

//////////////////////////////////////////////////
// Command Module

var controller = (function (budgetCtrl, UICtrl) {

  //Setup Event Listeners to accept both a click on the input button or pressing the 'enter' key
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  //Get Calculated Budget data from Budget Module and export to UI Module
  var updateBudget = function () {
    //1. Calculate Budget
    budgetCtrl.calculateBudget();
    //2. Return Budget
    var budget = budgetCtrl.getBudget();
    //3. Display the budget in the UI
    UICtrl.displayBudget(budget);
  };

  //Receive Input Data, Send To Budget Module for calculations and send results to UI Module for display
  var ctrlAddItem = function () {
    var input, newItem;

    //1. Get the user input
    input = UICtrl.getInput();
    console.log("Click");

    //2. Check if values have been entered, before continuing
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //3. Handoff item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //4. Add new item to UI
      UICtrl.addListItem(newItem, input.type);

      //5. Clear the Previous Items
      UICtrl.clearFields();

      //6. Calculate budget and update the UI
      updateBudget();
    }
  };

  var ctrlDeleteItem = function (event) {

    console.log(event.target);

  };

  //Initialization Function Resets all Budget Numbers and Alerts console to successful initialization
  return {
    init: function () {
      console.log("Application started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

//Initialize Application
controller.init();