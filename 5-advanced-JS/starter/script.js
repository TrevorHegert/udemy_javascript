//Function Constructor - Capitalize their variables

// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// var Person = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge = function () {
//     console.log(2018 - this.yearOfBirth);
// }

// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');

// mark.calculateAge();
// john.calculateAge();
// jane.calculateAge();


// console.log(john.lastName);
// console.log(mark.lastName);
// console.log(jane.lastName);

////////////////////////////////////////////////////////////////
//Object.create Method

// var personProto = {
//     calculateAge: function () {
//         console.log(2016 - yearOfBirth);
//     }
// };

// var john = Object.create(personProto);

// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//     name: {
//         value: 'Jane'
//     },
//     yearOfBirth: {
//         value: 1969
//     },
//     job: {
//         value: 'designer'
//     }
// });

//////////////////////////////////////////////////////////////////
// // Primitives vs. Objects

// //Primitives
// var a = 23;
// var b = a;
// a = 46;
// console.log(a);
// console.log(b);

// // Objects
// var obj1 = {
//     name: 'John',
//     age: 26
// };
// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// // Functions
// var age = 27;
// var obj = {
//     name: 'Jonas',
//     city: 'Lisbon'
// };

// function change(a, b) {
//     a = 30;
//     b.city = 'San Francisco';
// }

// change(age, obj);
// console.log(age);
// console.log(obj.city)

///////////////////////////////////////////////////////////////
// Passing Functions as Arguments

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn) {
//     var arrRes = [];
//     for (i = 0; 1 < arr.length; i++) {
//         arrRes.push(fn(arr[i]));
//     };
//     return arrRes;
// };

// function calculateAge(el) {
//     return 2016 - el;
// };

// function isAdult(el) {
//     return el >= 18;
// }

// var ages = arrayCalc(years, calculateAge);
// // console.log(ages);

// var adults = arrayCalc(years, isAdult);
// console.log(adults);


/////////////////////////////////////////////////
// Functions returning Functions

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function (name) {
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function (name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     } else {
//         return function (name) {
//             console.log('Hello, ' + name + '. What do you do?');
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');
// var designerQuestion = interviewQuestion('designer');

// teacherQuestion('Jane');
// designerQuestion('John');
// designerQuestion('Mark');

// interviewQuestion('teacher')('Mary');


/////////////////////////////////////////////////////////
// Imediately Initiated Functions

function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
};

//game();

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodLuck) {
    var score = Math.floor(Math.random() * 10) + 1;
    console.log(score >= 5 - goodLuck);
})(5);