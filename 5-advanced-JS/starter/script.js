// var john = {
//     name: 'John',
//     yearofBirth: 1990
// }
//'use strict';
function Person(name, yearofBirth) {
    this.name = name;
    this.yearofBirth = yearofBirth;
    // this.calculateAge = function() {
    //     console.log(2020 - this.yearofBirth);
    // };
}

// every instance of Person now refers to prototype method instead of creating their own method in their instance
// the latter means X number of instacnces results in X number of method declared
// to use less memory, use prototype so that the method declaration is shared across all instances of the class
Person.prototype.calculateAge = function(postfix = '', buddy = '') {
    console.log(2020 - this.yearofBirth + " " + postfix, buddy);
}

Person.prototype.printOutHobbies = function(hobbies, jem = '') {
    console.log(this.name, hobbies, jem);
}

// Person.prototype = personProto;

var john = new Person('John', 1990);
var jane = new Person('Jane', 1993);
john.calculateAge();
// jane.calculateAge();

var personProto = {
    jem: function() {
        console.log('jem');
    }
}

var mark = Object.create(personProto, {
    name: {value: 'Mark'},
    dateofBirth: {value: 19},
})

console.log(mark.name);
console.log(mark.jem());
// var marky = mark;
// mark.name = 'lol';
// console.log(mark.name);

// function returns a function
function jedi(name) {
    console.log(`${name}, you are a JEDI like your father before you!`);
}

function sith(name) {
    console.log(`Embrace the power of the dark side as you are a SITH, ${name}`);
}

function rebel(name) {
    console.log(`${name}, you REBEL scum!`);
}

function scum(name, side) {
    console.log(`${name}, you ${side} scum!`);
}


function whichSide(side) {
    if(side === 'light') {
        return jedi;
    }
    else if(side === 'dark') {
        return sith;
    }
    else {
        return rebel;
    }
}

var lightBoi = whichSide('light');
var blackMan = whichSide('dark');
lightBoi('Luke');
blackMan('Anakin');
whichSide()('Han Solo');


//immediately invoked function expression
var lol = (function(goodLuck) {
    var value = Math.random() * 10;
    return (value > 5 - goodLuck)
})(5);

console.log(lol);

//closures
// the inner function is the closure. When closure is invoked, variables and functions declared in the outer function can be accessed within the closure.
function retirement(retirementAge) {
    var sentence = ' years left to work';
    return function(birthYear) {
        var age = 2020 - birthYear;
        console.log(`${retirementAge - age} ${sentence}`);
    }
}

var retirementUSA = retirement(65);
var retirementMalaysia = retirement(60);
var retirementEurope = retirement(70);

retirementUSA(1993);
retirementMalaysia(1993);
retirementEurope(1993);

function whichSideClosureStyle(side) {
    return function(name) {
        if(side === 'light') {
            //jedi(name);
            console.log(`${name}, there is ${side} in you! You are a JEDI like your father before you!`);
        }
        else if (side === 'dark') {
            // sith(name);
            console.log(`Embrace the power of the ${side} side as you are a SITH, ${name}`);
        }
        else {
            // scum(name, side);
            console.log(`${name}, you ${side} scum!`);
        }
    }
}

whichSideClosureStyle('light')('Rey');
// OR
// var lightSide = whichSideClosureStyle('light');
// lightSide('Rey');

whichSideClosureStyle('dark')('Kylo Ren');
// OR
// var darkSide = whichSideClosureStyle('dark');
// darkSide('Kylo Ren');

whichSideClosureStyle('Resistance')('Finn');
// OR
// var resistance = whichSideClosureStyle('Resistance');
// resistance('Poe Dameron');

whichSideClosureStyle('First Order')('Captain Phasma');
// OR
// var firstOrder = whichSideClosureStyle('First Order');
// firstOrder('Captain Phasma');

// Messing around ignore this
// var pale = {
//     name : 'Pale',
//     yearofBirth : 1957,
// }
// function jem() {
//     this.jeng = 'lol';
//     console.log(this.jeng);
// }

// let {calculateAge} = Person.prototype;

let emily  = {
    name: 'Emily',
    yearofBirth: 1989,
}

//Method borrowing using call
john.calculateAge.call(emily, 'years young', 'buddy');

// apply is same as call except
john.printOutHobbies.apply(emily, ['tennis', 'gaming']);
john.calculateAge.apply(emily, ['years old', 'buddy']);

// Kinda Method borrowing also
emily.calculateAge = john.calculateAge;
emily.calculateAge();

// Bind copies a function and preset arguments to it
let emilyDota = john.printOutHobbies.bind(emily, 'dota');
emilyDota('jeng');


// Bind function example
var birthYears = [1993, 1989, 1997, 2010];

function calculateAge(birthYear) {
    return 2020 - birthYear;
}

function isFullAge(limit, age) {
    return age >= limit; 
}

function arrayCalc(arr, fn) {
    let arrRes = [];
    arr.forEach(element => {
        arrRes.push(fn(element));
    });
    return arrRes;
}

let ages = arrayCalc(birthYears, calculateAge);
let isFullAgeJapan = isFullAge.bind(this, 20);
// let fullAges = arrayCalc(ages, isFullAgeJapan);
// or
let fullAges = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullAges);

