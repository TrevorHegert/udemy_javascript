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

    document.querySelector('.add__btn').addEventListener('click', function () {
        console.log('Clicked');
    });

})(budgetController, UIController);