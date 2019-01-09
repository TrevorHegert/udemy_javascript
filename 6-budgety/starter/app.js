//BUDGET CONTROLLER
budgetController = (function () {

    //SOME CODE

})();

//UI CONTROLLER
UIController = (function () {

    DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be inc/exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

//GLOBAL APP CONTROLLER
controller = (function (budgetCtrl, UICtrl) {

    DOM = UICtrl.getDOMstrings();

    ctrlAddItem = () => {
        //Get Input Data from Field
        input = UICtrl.getInput();
        console.log(input);

        //Add item to the budget controller

        //Add item to the UI

        //Calculate the budget

        //Display the budget on UI

    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        event.keyCode === 13 ? ctrlAddItem() : null;

    });

})(budgetController, UIController);