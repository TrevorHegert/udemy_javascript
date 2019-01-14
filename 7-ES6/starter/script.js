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