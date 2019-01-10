//////////////////////////////////////////////////
// Budget Calculation Module

var budgetController = (function () {


})();


//////////////////////////////////////////////////
// UI Interface Module

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();



//////////////////////////////////////////////////
// Command Module

var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {

        //1. Get the user input
        var input = UICtrl.getInput();
        console.log(input);
        //2. Handoff item to budget controller

        //3. Add new item to UI

        //4. Calculate the Budget

        //5. Display Budget to UI 
    };

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);