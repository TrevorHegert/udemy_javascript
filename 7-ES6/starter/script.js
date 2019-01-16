/////////////////////////////////
//Blocks and IIFEs

//ES6
{
  const a = 1;
  let b = 2;
  var c = 3;
}

console.log(c);

//ES5
(function() {
  var c = 3;
})();

/////////////////////////////////
//Strings

let firstName = "John";
let lastName = "Smith";
const yearOfBirth = 1990;

function calcAge(year) {
  return 2016 - year;
}

//ES5

console.log(
  "This is " +
    firstName +
    " " +
    lastName +
    ". He was born in " +
    yearOfBirth +
    ". Today he is " +
    calcAge(yearOfBirth) +
    " years old."
);

//ES6

console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)}.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith("j"));
console.log(n.endsWith("th"));
console.log(n.includes(" "));
console.log(`${firstName}, `.repeat(5));

////////////////////////////////////
//Arrow Functions

const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(el) {
  return 2015 - el;
});
console.log(ages5);

//ES6

//(), {}, and return not necessary with simple functions with only 1 argument
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

//If multiple arguments are needed the () around them are necessary
ages6 = years.map((el, index) => `Age Element ${index + 1}: ${2018 - el}.`);
console.log(ages6);

//If multiple lines are needed for function {} and return become necessary
ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `For the year ${now}, Age Element ${index + 1}: ${age}.`;
});
console.log(ages6);

///////////////////////////////////////////////
//Arrow Functions Advanced

//ES5 - this keyword not available outside the function (self hack)
var box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector(".green").addEventListener("click", function() {
      var str = "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    });
  }
};
box5.clickMe();

//ES6 - Arrow functions preserve the this keyword
const box6 = {
  color: "green",
  position: 1,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () => {
      var str = "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};
box6.clickMe();

//This version fails because clickMe arrow function preserves the this keyword from before
//Don't lose track of what 'this' stands for
// const box66 = {
//     color: 'green',
//     position: 1,
//     clickMe: () => {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//             alert(str);
//         });
//     }
// };
// box66.clickMe();

function Person(name) {
  this.name = name;
}

//ES5
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(
    function(el) {
      return this.name + " is friends with " + el;
    }.bind(this)
  );

  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends5(friends);

//ES6
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(el => `${this.name} is friends with ${el}`);
  console.log(arr);
};

new Person("Mike").myFriends5(friends);

////////////////////////////////////////////////////////////
//Destructuring

//ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

//ES6
const [name, age] = ["John", 26];
console.log(name);
console.log(age);

const obj = {
  nameFirst: "John",
  nameLast: "Smith"
};

const { nameFirst, nameLast } = obj;
console.log(nameFirst);
console.log(nameLast);

const { nameFirst: a, nameLast: b } = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

//////////////////////////////////////////////////////
//Arrays

const boxes = document.querySelectorAll(".box");

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(current) {
  current.style.backgroundColor = "dodgerblue";
});

//ES6

Array.from(boxes).forEach(current => (current.style.backgroundColor = "orangered"));

//ES5
// for (var i = 0; i < boxesArr5.length; i++) {
//   if (boxesArr5[i].className === "box blue") {
//     continue;
//   }

//   boxesArr5[i].textContent = "I changed to blue!";
// }

//ES6

for (const current of Array.from(boxes)) {
  if (current.className.includes("orange")) {
    continue;
  }

  current.textContent = "I changed to orange!";
}

//findIndex
var ages = [12, 17, 8, 22, 16, 11];

console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));

///////////////////////////////////////////////////
//Spread Operator

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var ages = [18, 30, 12, 21];

//ES5
var sum2 = addFourAges.apply(null, ages);
//sum2 = 18 + 30 + 12 + 21 = 81

//ES6
const sum3 = addFourAges(...ages);
//... is spread operater, it splits the array into its component elements.
//This function requires 4 numbers, but with a for loop function could work with any amount of numbers.
console.log(sum2, sum3);
