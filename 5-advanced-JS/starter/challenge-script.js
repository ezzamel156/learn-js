(function() {
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.show = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(userAnswer, callback) {
        let score;
        let result = userAnswer === this.correctAnswer;
        this.displayResult(result);
        score = callback(result);

        console.log(`Current score : ${score}`);
    }

    Question.prototype.displayResult = function(result) {
        result ? console.log('Correctomundo') : console.log('Wrong!');
        
    }

    let questionOne = new Question('Jem pale dak belajaq JS?', 
                                    ['dak','sikit','ez'], 
                                    0);
    let questionTwo = new Question('Jem pale dak belajaq CSS?', 
                                    ['dak','sikit','ez'], 
                                    1);
    let questionThree = new Question('Jem pale dak belajaq PHP?', 
                                    ['dak','sikit','ez'],
                                     2);

    let questions = [questionOne,questionTwo, questionThree];

    
    let keepScore = (function() {
        let score = 0;
        return function(result) {
            return result ? ++score : score;
        }
    })();

    function nextQuestion() {
        let n = Math.floor(Math.random() * questions.length);
        questions[n].show();
        let answer = prompt('Answer pls');
        
        if(answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }
    nextQuestion();
})();
