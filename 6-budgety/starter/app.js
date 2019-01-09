//BUDGET CONTROLLER
budgetController = (function () {

    //SOME CODE

})();

//UI CONTROLLER
UIController = (function () {

    //SOME CODE


})();

//GLOBAL APP CONTROLLER
controller = (function (budgetCtrl, UICtrl) {

    ctrlAddItem = () => {
        //Get Input Data from Field

        //Add item to the budget controller

        //Add item to the UI

        //Calculate the budget

        //Display the budget on UI

        console.log('It Works!')
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        ctrlAddItem();

    });

})(budgetController, UIController);