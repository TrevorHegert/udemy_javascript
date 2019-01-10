//////////////////////////////////////////////////
// Command Module

var controller = (function (budgtCtrl, UICtrl) {

    var ctrlAddItem = function () {
        console.log('It works!');
        //1. Get the user input

        //2. Handoff item to budget controller

        //3. Add new item to UI

        //4. Calculate the Budget

        //5. Display Budget to UI 
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);







//////////////////////////////////////////////////
// UI Interface Module

var UIController = (function () {

});







//////////////////////////////////////////////////
// Budget Calculation Module

var budgetController = (function () {


});