//////////////////////////////////////////////////
// Budget Calculation Module

var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  //Add List Item percentage calculator to Expense prototype
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  //Retrive List Item Percentage
  Expense.prototype.getPercentage = function () {
    return this.percentage;
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

    deleteItem: function (type, id) {
      var ids, index;

      //identify correct index of array
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      //save that index to a variable
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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

    //Calculate Percentages For List Items
    calculatePercentages: function () {
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.totals.inc);
      });
    },

    //Get Percentages for List Items
    getPercentages: function () {
      var allPercentages = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPercentages;
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
    container: ".container",
    expensesPercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  //Format Number into Standard x,xxx.xx format
  var formatNumber = function (num, type) {
    var numSplit, int, dec;

    //1. Set to exactly 2 decimals
    num = Math.abs(num);
    num = num.toFixed(2);

    //2. Add , to separate any thousands places
    numSplit = num.split(".");
    int = numSplit[0];
    dec = numSplit[1];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    //3. Add +/- before Numbers
    return (
      (type === "exp" ? (sign = "-") : (sign = "+")) + " " + int + "." + dec
    );
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

    //Accept and Insert a new income or expense list item into the HTML
    addListItem: function (obj, type) {
      var html, newHtml, element;

      //1. Create HTML string with placeholder text

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //2. Replace the placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      //3. Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    //Remove an item from the income or expenses list HTML
    deletelistItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
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
      var type;
      if (obj.budget >= 0) {
        type = "inc";
      } else {
        type = "exp";
      }

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
      document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, "exp");
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.expensePercentage).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.expensePercentage).textContent =
          "n/a";
      }
    },

    //Display Percentages on Each List Item
    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(
        DOMstrings.expensesPercentageLabel
      );

      //Reusable forEach method that can apply to Node Lists
      var nodeListforEach = function (list, callback) {
        for (i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeListforEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "n/a";
        }
      });
    },

    //Retrieve Current Month and Display to UI
    displayDate: function () {
      var now, month, months, year;
      now = new Date();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = months[now.getMonth()];
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;

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

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
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

  //Get Calculated Percentage data from Budget Module and export to UI Module
  var updatePercentages = function () {
    //1. Calculate percentages
    budgetCtrl.calculatePercentages();

    //2. Return percentages
    var percentages = budgetCtrl.getPercentages();

    //3. Display the percentages in the UI
    UICtrl.displayPercentages(percentages);
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

      //7. Calculate percentages and update the UI
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;

    //Grab the Type and ID from HTML
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    //if item has id attribute (only delete button has an id in html) then format its type and data for use
    if (itemID) {
      //'type-id'
      splitID = itemID.split("-");
      //['type', 'id']
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1. Delete the item from the stored budget data object
      budgetCtrl.deleteItem(type, ID);

      //2. Delete the item from the UI
      UICtrl.deletelistItem(itemID);

      //3. Update the budget and display to UI
      updateBudget();

      //4. Calculate percentages and update the UI
      updatePercentages();
    }
  };

  //Initialization Function Resets all Budget Numbers and Alerts console to successful initialization
  return {
    init: function () {
      console.log("Application started.");
      UICtrl.displayDate();
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