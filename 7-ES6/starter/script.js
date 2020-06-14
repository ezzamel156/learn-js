/* 
//Let & Const 
function lol() {
    // wont work because let is block scoped ( block = if, for while and  wrapped with { } )
    //block scoped
    if(true) { 
        const z = 'zzz';
        let x = 'xxx';
    }

    //block scoped
    while(true) { 
        const z = 'zzz';
        let x = 'xxx';
    }

    //block scoped
    {
        const z = 'zzz';
        let x = 'xxx';
    }
    // let x = 'xxx';

    return function(y) {
        console.log(x + ',' + y + ',' + z);
    }
}

let y = lol();
y('yyy');

var i = 0;
for (i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);
*/


// Strings
/*
let firstName = 'Mel';
let lastName = 'Ali';
const dateofBirth = 1990;

function calculateAge(year) {
    return new Date().getFullYear() - year;
}

console.log(`${firstName} ${lastName} age ${calculateAge(dateofBirth)}`);

const fullName = `${firstName} ${lastName}`;

console.log(fullName.startsWith('M'));
console.log(fullName.endsWith('i'));
console.log(fullName.includes('el Al'));
console.log(` ${firstName}`.repeat(5));
*/

// Arrow function
/*
var box = {
    color: 'green',
    position: 1,
    // for clickMe method also, we can use arrow function but then THIS will be lexical and makes THIS
    // refers to the surrounding scope of the clickMe method which happens to be the global scope 
    // which means THIS will refer to global this
    clickMe: function() {
       
    //    since the THIS keyword when executed in a callback function which means THIS is going to point to the global windows object
    //    a workaround for this scenario is to store the object in a variable and then use that variable in the callback
    //    var self = this; 
    //    document.querySelector('.green').addEventListener('click', function() {
    //         var str = 'This is box number ' + self.position + ' and it is ' + self.color;
    //         alert(str);
    //     });
    //      another workaround without using arrow function by using bind method on a function (bind basically changes the this variable in the function to use the object that we pass in the bind method)
    //      document.querySelector('.green').addEventListener('click', function() {
    //         var str = 'This is box number ' + self.position + ' and it is ' + self.color;
    //         alert(str);
    //     }.bind(this));

        // but using arrow function solves this issue because THIS is lexically defined 
        // this means THIS will point to the object where the THIS keyword is actually written
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    
    }
}

box.clickMe(); 

*/

/*
// Destructuring

const jeng = {
    jem: 'Jem',
    pale: 'Pale'
}

const {jem, pale} = jeng;
// if rename is required
const {jem: a, pale: b} = jeng;
console.log(jem);
console.log(pale);
console.log(a);
console.log(b);
*/

/*
// Array
const boxes = document.querySelectorAll('.box');
// In ES6 / ES2015, we can use Array.from method to convert iterables into array
const boxArr = Array.from(boxes);
boxArr.forEach(el => el.style.backgroundColor = 'dodgerblue');

// to break/continue in a loop in ES6 using forIn
for (const box of boxArr) {
    if(box.className.includes('blue')) {
        //continue;
        break;
    }
    box.textContent = 'Wasnt blue but i got changed into dodgerblue';
}

const ages = [17,14,21,22,32,11,9];

// ES5
const full = ages.map(age => age >= 18);
console.log(ages[full.indexOf(true)]);

// ES6
console.log(ages.findIndex(age => age >= 18));
console.log(ages.find(age => age >= 18));
*/

/*
// Spread operator
function Add(a, b, c, d) {
    return a + b + c + d;
}

const numbers = [1,2,3,4];
const numbers2 = [5,6,7,8];
// ES5
const sum = Add.apply(null, numbers);
console.log(sum);

// ES6
const sum6 = Add(...numbers);
console.log(sum6);

const combinedNumbers = [...numbers, ...numbers2];
console.log(combinedNumbers);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box'); 
const allElements = [h, ...boxes];
const AllElementsArr = Array.from(allElements);
for (const el of AllElementsArr) {
    el.style.backgroundColor = 'red';
}
*/

/*

// Rest parameter : sorta like opposite of spread operator. Can be used in function arguments/declaration to create function
// that has undetermined number of arguments/input parameters
// Passed arguments will be stored in an array

// ES5 : pass any number of input parameters
function isFullAge() {
    const arr = Array.from(arguments);
    return arr.map(value => value >= 13);
}
console.log(isFullage(12,13,15));

// ES6
function isFullAge(fullAge, ...ages) {
    return ages.map(age => age >= fullAge)
}

console.log(isFullAge(3,1,2,3,4,5,14));
*/


/* 
// Default parameters
function SmithPerson(firstName, lastName = 'Smith') {
    this.firstName = firstName;
    this.lastName = lastName;
}

var John = new SmithPersFon('John');
*/

/* 
// Map
// Anything can be used as Keys. In an object, only strings can be used as Keys.
// Map is iterable
// Map has set, get, delete method, size. Basically its like a better associative array

const question = new Map;
question.set('question', 'What is the official name of the latest JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correctomundo');
question.set(false, 'Wrong! Do better');

// question.has(4);
// question.delete(4);
// question.clear();

console.log(question.get('question'));
for (const [key,value] of question.entries()) {
    if(typeof key === 'number')
        console.log(`${key}. ${value}`);
}
const answer = parseInt( prompt('Gimme answer boi') );
console.log(question.get( answer === question.get('correct')));
*/

/*
// Classes
// ES5
const Person5 = function(firstName, lastName, yearOfBirth) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
}

Person5.prototype.getAge = function() {
    return new Date().getFullYear() - this.yearOfBirth;
}
const john = new Person5('John', 'Doe', 1993);

// ES6 : Code below is equivalent to code above. 
// Class is a syntactic sugar that actually does the code above
// Classes are not hoisted
class Person {
    constructor(firstName, lastName, yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
    }

    getAge() {
        return new Date().getFullYear() - this.yearOfBirth;
    }

    static greeting() {
        console.log('Hey there Delilah');
    }
}

const betterJohn = new Person('B.John', 'Doey', 1995);
console.log(betterJohn.getAge());
Person.greeting();
*/
/**/
// Subclass
// ES5
const Person5 = function(firstName, lastName, yearOfBirth) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
}

Person5.prototype.getAge = function() {
    return new Date().getFullYear() - this.yearOfBirth;
}
const john = new Person5('John', 'Doe', 1993);
const Athlete5 =  function(firstName, lastName, yearOfBirth, olympics, medals) {
    Person5.call(this, firstName, lastName, yearOfBirth);
    this.olympics = olympics;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function() {
    return ++this.medals;
}

const jamesAthlete5 = new Athlete5('James', 'Smith', 1989, 'Tennis', 4);
// console.log(jamesAthlete5.getAge());
// console.log(jamesAthlete5.wonMedal());

// ES6 
class Person {
    constructor(firstName, lastName, yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
    }

    getAge() {
        return new Date().getFullYear() - this.yearOfBirth;
    }

    static greeting() {
        console.log('Hey there Delilah');
    }
}

class Athlete extends Person {
    constructor(firstName, lastName, yearOfBirth, olympics, medals) {
        super(firstName, lastName, yearOfBirth);
        this.olympics = olympics;
        this.medals = medals;
    }
    wonMedal() {
        return ++this.medals;
    }
}

const betterJamesAthlete = new Athlete('James', 'Smith', 1980, 'tennis', 5);
// console.log(betterJamesAthlete.getAge());
// console.log(betterJamesAthlete.wonMedal());