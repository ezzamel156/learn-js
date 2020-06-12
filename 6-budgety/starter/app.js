var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        this.percentage = totalIncome > 0 ? Math.round(this.value / totalIncome * 100) : -1;
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            expenses: [],
            incomes: [],
            budget: 0,
            percentage: -1,
        }
    }

    var generateId = function(type) {
        var id;
        if(type === 'exp') {
            let expenses = getExpenses();
            id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
        }
        else {
            let incomes = getIncomes();
            id = incomes.length > 0 ? incomes[incomes.length - 1].id + 1 : 1;
        }
        return id;
    }

    var getTotal = function(items) {
        let sum = 0;
        items.forEach(({value}) => sum += value);
        return Number(sum.toFixed(2));
    }

    var getExpenses = function() {
        return data.items.expenses;
    }

    var addExpense = function(id, description, value) {
        let expense = new Expense(id, description, value);
        data.items.expenses.push(expense);
        return expense;
    }

    var getIncomes = function() {
        return data.items.incomes;
    }

    var addIncome = function(id, description, value) {
        let income = new Income(id, description, value);
        data.items.incomes.push(income);
        return income;
    }

    return {
        addItem: function(type, description, value) {
            return type === 'exp' ? addExpense(generateId(type), description, value) : addIncome(generateId(type), description, value);
        },
        deleteItem: function(type, id) {
            let items = type === 'exp' ? getExpenses() : getIncomes();
            let ids = items.map(function(item) {
                return item.id;
            });

            let index = ids.indexOf(id);
            if(index !== -1) items.splice(index, 1);
            
        },
        calculateBudget: function() {
            let totalIncome = getTotal(data.items.incomes);
            let totalExpense = getTotal(data.items.expenses);

            data.items.budget = Number((totalIncome - totalExpense).toFixed(2));
            data.items.percentage = totalIncome > 0 ? Math.round(totalExpense / totalIncome * 100) : -1;

            return this.getBudget();
        },
        getBudget: function() {
            return {
                budget: data.items.budget,
                percentage: data.items.percentage,
                totalIncome: getTotal(data.items.incomes),
                totalExpense: getTotal(data.items.expenses),
            }
        },
        calculatePercentages: function() {
            let {totalIncome} = budgetController.getBudget()
            data.items.expenses.forEach(expense => expense.calculatePercentage(totalIncome));
            return this.getPercentages();
        },
        getPercentages: function() {
            return data.items.expenses.map(expense => expense.getPercentage())
        },
        data,
    }
})();

var UIController = (function() {
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        container: '.container',
        income: {
            listContainer: '.income__list',
            percentage: '.item__percentage',
        },
        expense: {
            listContainer: '.expenses__list',
            percentage: '.item__percentage',
        },
        budget: {
            month: '.budget__title--month',
            value: '.budget__value',
            month: '.budget__title--month',
            incomeValue: '.budget__income--value',
            incomePercentage: '.budget__income--percentage',
            expenseValue: '.budget__expenses--value',
            expensePercentage: '.budget__expenses--percentage',
        }
    };

    var formatPercentage = function(value) {
        return value > 0 ? `${value}%` : '---';
    }

    var formatValue = function(type, value) {
        // + 2000.94 
        value = Math.abs(value).toFixed(2);
        let valueSplit = value.split('.');
        let int = valueSplit[0];
        let decimal = valueSplit[1];
        let index = Math.floor(int.length / 3);
        if(int.length % 3 === 0) {
            index--;
        }
        
        for (index; index > 0; index--) {
            int = int.substr(0, int.length - (index * 3)) + ',' + int.substr(int.length - (index * 3), (index * 3));
        }
        
        return `${type === 'expense' ? '-' : '+'} ${int}.${decimal}`;
    }

    return {
       getInput: function() {
           return {
               type: document.querySelector(DOMstrings.inputType).value,
               description: document.querySelector(DOMstrings.inputDescription).value,
               value: Number(document.querySelector(DOMstrings.inputValue).value),
           }
       },
       getDOMstrings: function() {
           return DOMstrings;
       },
       deleteListItem: function(selectorId) {
            let el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
       },
       addListItems: function(item) {
            let itemType = item.constructor.name.toLowerCase();
            let html = `<div class="item clearfix" id="${itemType}-${item.id}">
                            <div class="item__description">${item.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${formatValue(itemType, item.value)} </div>
                                ${itemType === 'expense' ? '<div class="item__percentage"></div>' : ''}                                
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

            let containerDom = itemType === 'expense' ? DOMstrings.expense.listContainer : DOMstrings.income.listContainer;
            var template = document.createElement('template');
            template.innerHTML = html;
            let node = template.content.firstChild;
            document.querySelector(containerDom).appendChild(node);
            // two different ways to add child into an element
            // document.querySelector(containerDom).insertAdjacentHTML('beforeend', html);
       },
       clearFields: function() {
           let fields = document.querySelectorAll(`${DOMstrings.inputValue} , ${DOMstrings.inputDescription}`);
           let arr = Array.prototype.slice.call(fields);
           arr.forEach(el => {
               el.value = '';
           });
           arr[0].focus();
       },
       updateBudget: function(budget) {
           document.querySelector(DOMstrings.budget.value).textContent = formatValue(budget.budget > 0 ? 'income' : 'expense', budget.budget);
           document.querySelector(DOMstrings.budget.incomeValue).textContent = formatValue('income', budget.totalIncome);
           document.querySelector(DOMstrings.budget.expenseValue).textContent = formatValue('expense', budget.totalExpense);
           document.querySelector(DOMstrings.budget.expensePercentage).textContent = formatPercentage(budget.percentage);
       },
       updatePercentages: function(percentages) {
           let listNodes = document.querySelectorAll(`${DOMstrings.expense.listContainer}  ${DOMstrings.expense.percentage}`);
           listNodes.forEach(function(el, index) {
                el.textContent = formatPercentage(percentages[index]);
            })  
       },
       displayMonth: function(date = new Date()) {
            let [month, year] = date.toLocaleString('default', { year: 'numeric', month: 'long', }).split(' ');
            document.querySelector(DOMstrings.budget.month).textContent = month + ' ' + year;
        },
        changedType: function() {
            var elements = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputType}, ${DOMstrings.inputValue}`);
            elements.forEach(function(element) {
                element.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },
    }
})();


// it doesnt matter that the arguments(budgetController, UIController) have the same name because
// when the closure is executed, it will try to resolve budgetController within the
// inner function first. If inner function does not have the variable, then it will check at the outer/parent function
var controller = (function(budgetController, UIController) {
    var date = new Date();
    var setupEventListeners = function() {
        var DOMstrings = UIController.getDOMstrings();
        document.querySelector(DOMstrings.inputButton).addEventListener('click', addItem);
        document.addEventListener('keypress', function({keyCode, which}) {
            if(keyCode === 13 || which === 13) {
                addItem();
            }
        });
        
        document.querySelector(DOMstrings.container).addEventListener('click', deleteItem);
        document.querySelector(DOMstrings.inputType).addEventListener('change', UIController.changedType)
    }

    var updateBudget = function() {
        // 1. Calculate budget
        const budget = budgetController.calculateBudget();
        
        // 2. Update budget UI
        UIController.updateBudget(budget);
    }

    var updatePercentages = function() {
        let percentages = budgetController.calculatePercentages();
        UIController.updatePercentages(percentages);
    }
    
    var addItem = function() {
        // 1. get user input
        const {type, description, value} = UIController.getInput();

        if(description === '' || value <= 0)
            return;


        // 2. add item to budget controller
        let newItem = budgetController.addItem(type, description, value);

        // 3. add new item to UI
        UIController.addListItems(newItem);
        UIController.clearFields();
        
        // 4. Update Budget
        updateBudget();

        updatePercentages();
    }

    var deleteItem = function(event) {
        let itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId) {
            let [type, id] = itemId.split('-');

            // 1. delete from budgetController
            budgetController.deleteItem(type === 'expense' ? 'exp' : 'inc', parseInt(id));
            
            // 2. delete from UIController
            UIController.deleteListItem(itemId);
                
            // 3. Update budget
            updateBudget();

            updatePercentages();
        }
    }

    return {
        init: function() {
            console.log('App started');
            UIController.updateBudget(budgetController.getBudget());
            UIController.displayMonth(date);
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();