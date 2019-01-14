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
(function () {
    var c = 3;
})();


/////////////////////////////////
//Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

//ES5

console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');

//ES6

console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)}.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(`${firstName}, `.repeat(5));


////////////////////////////////////
//Arrow Functions

const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function (el) {
    return 2015 - el;
});
console.log(ages5);


//ES6

//(), {}, and return not necessary with simple functions with only 1 argument
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

//If multiple arguments are needed the () around them are necessary
ages6 = years.map((el, index) => `Age Element ${index+1}: ${2018 - el}.`);
console.log(ages6);

//If multiple lines are needed for function {} and return become necessary
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `For the year ${now}, Age Element ${index+1}: ${age}.`
});
console.log(ages6);