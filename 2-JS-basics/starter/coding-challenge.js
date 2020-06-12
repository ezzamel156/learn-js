// let mark = {
//     weight : 90,
//     height : 1.67,
//     getBMI : function() {
//         this.bmi = this.weight / (this.height *  this.height);
//         return this.bmi;
//     }
// }

// let john = {
//     weight : 60,
//     height : 1.8,
//     getBMI : function() {
//         this.bmi = this.weight / (this.height *  this.height);
//         return this.bmi;
//     }
// }

// console.log(mark.getBMI());
// console.log(john.getBMI());

// console.log(`Is Mark's BMI higher than John's? ${mark.bmi > john.bmi}.`);

// console.log(true ===  true === false); 

// let johnScores = [89, 120, 103];
// let mikeScores = [116, 94, 123];
// let maryScores = [97, 134, 105];

// let johnAverageScore = johnScores.reduce( (accumulator, currentValue) => accumulator + currentValue)/johnScores.length;
// let mikeAverageScore = mikeScores.reduce( (accumulator, currentValue) => accumulator + currentValue)/mikeScores.length;
// let maryAverageScore = maryScores.reduce( (accumulator, currentValue) => accumulator + currentValue)/maryScores.length;

// if(mikeAverageScore > johnAverageScore)
//     console.log(`Mike's average score (${mikeAverageScore}) is more than John's (${johnAverageScore})`);
// else if(johnAverageScore > mikeAverageScore)
//     console.log(`John's average score (${johnAverageScore}) is  than Mike's (${mikeAverageScore})`);
// else
//     console.log(`It's a draw! John's ands Mike's average score are ${johnAverageScore} and ${mikeAverageScore} respectively`);

// let tipCalculator = function(bill) {
//     let percentage;
//     if(bill < 50)
//         percentage = .2;
//     else if(bill >= 50 && bill <= 200)
//         percentage = .15;
//     else
//         percentage = .1;
    
//     return bill * percentage;
// }

// let totalBillCalculator = bill => bill + tipCalculator(bill);

// let bills = [124, 48, 268];

// let tips = bills.map(bill => tipCalculator(bill));
// let billsWithTip = bills.map(bill => totalBillCalculator(bill));

// console.log(tips);
// console.log(billsWithTip);
function myCustomFormula(amount) {
    let percentage;
    if(amount < 50)
        percentage = .2;
    else if(amount >= 50 && amount <= 200)
        percentage = .15;
    else
        percentage = .1;
    
    return amount * percentage
}

let johnBills = {
    amount: [124, 48, 268, 180, 42],
    tip: [],
    finalAmount : [],
    calcTip(amount) {
        let percentage;
        if(amount < 50)
            percentage = .2;
        else if(amount >= 50 && amount <= 200)
            percentage = .15;
        else
            percentage = .1;
        
        return amount * percentage
        //like this also can
        //return myCustomFormula(amount);
    },
    calcTips() {
        this.tip = this.amount.map(this.calcTip);  
    },
    calcFinalAmount() {
        this.finalAmount = this.amount.map(amount => amount + this.calcTip(amount))
    }
}

johnBills.calcTips();
johnBills.calcFinalAmount();
console.log(johnBills);


