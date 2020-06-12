function lol() {
    // wont work because let is block scoped ( block = if, for while)
    // if(true) { 
    //     let x = 'xxx';
    // }
    let x = 'xxx';

    return function(y) {
        console.log(x + ',' + y);
    }
}

let y = lol();
y('yyy');

var i = 0;
for (i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);