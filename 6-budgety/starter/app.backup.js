//BUDGET CONTROLLER
budgetController = (function () {

    Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
    };

    return {
        addItem: function (type, des, val) {
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            return newItem;
        }
    };

})();

//UI CONTROLLER
UIController = (function () {

    DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be inc/exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

//GLOBAL APP CONTROLLER
controller = (function (budgetCtrl, UICtrl) {

    setupEventListeners = function () {
        DOM = UICtrl.getDOMstrings();
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
    };

    ctrlAddItem = function () {
        //Get Input Data from Field
        input = UICtrl.getInput();

        //Add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //Add item to the UI

        //Calculate the budget

        //Display the budget on UI

    };

    return {
        init: function () {
            console.log('Application Initiated');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();