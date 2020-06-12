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