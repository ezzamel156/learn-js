// console.log('Yo daddy');
// const jem = {
//         waduh: function(pale) {
//         return `${pale} bane`;
//     }
// };
// console.log(jem.waduh('kepale'));

// var firstName = 'jon';
// var sad = null;
// console.log(firstName + ' lol ' + sad);
// /*
// asdsd
// asdad
// */
// console.log(undefined === undefined);

/**
 * Function declaration
 */

 function jemDeclare(firstVar, secondVar = '') {
    switch(true) {
        case firstVar === 'lol' :
            return 'lol';
    }
 }

 console.log(jemDeclare('lol'))

/**
 * Function expression
 */

 jemExpress = function(firstVar, secondVar = '') {
     switch(true) {
         case firstVar === 'lol' :
             return 'lol';
     }
 }

 console.log(jemExpress('lol'));
    
