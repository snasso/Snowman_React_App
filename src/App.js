import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles/App.css';

import Snowman from './components/Snowman';


class App extends Component {
    constructor() {
        super();

        let currentGame = {"answer": "", "pastGuesses": []};
        
        if (localStorage.getItem("currentGame") !== null 
            && localStorage.getItem("currentGame") !== undefined) 
        {
            currentGame = JSON.parse(localStorage.getItem("currentGame"));
        }

        this.state = {
            answer: currentGame.answer,
            pastGuesses: currentGame.pastGuesses
        };
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyup);

        if (localStorage.getItem("currentGame") === null 
            || localStorage.getItem("currentGame") === undefined) 
        {
            this.setUpGame();
        }        
    }

    componentDidUpdate() {
        setTimeout(this.handleLogic, 0);
    }

    componentWillUnmount() {
        localStorage.setItem("currentGame", JSON.stringify(this.state));

        document.removeEventListener("keyup", this.handleKeyup);
    }

    setUpGame = () => {
        const index = Math.floor(Math.random() * this.props.words.length);

        this.setState({
            answer: this.props.words[index].split(""), // choose a new word
            pastGuesses: [] // empty array of previously guessed letters
        });
    }

    calculateGuesses = () => {

        let numRight = Array.from(this.state.answer).filter((letter) => {
            return this.state.pastGuesses.includes(letter);
        }).length
        
        let numWrong = this.state.pastGuesses.filter((letter) => {
            return !this.state.answer.includes(letter)
        }).length

        return {"numRight": numRight, "numWrong": numWrong};
    }

    handleLogic = () => {
        let calculatedGuesses   = this.calculateGuesses();
        let numWrong            = calculatedGuesses["numWrong"];

        let answer      = (this.state.answer).join("");
        let word        = "";
        let gameArray   = [];

        if (localStorage.getItem("word") !== "" && localStorage.getItem("word") !== undefined) 
        {
            word = localStorage.getItem("word");
        }

        if (localStorage.getItem("gameStats") !== null && localStorage.getItem("gameStats") !== undefined) 
        {
            gameArray = JSON.parse(localStorage.getItem("gameStats"));
        }

        if (numWrong >= 6 
            || ((calculatedGuesses["numRight"] === this.state.answer.length) 
                && this.state.answer.length !== 0)) 
        {                     
            let gameObject = {};
    
            if (numWrong >= 6) {
                gameObject = {"win": false, "numWrong": numWrong, "word": word, "answer": answer};
                
                this.askToPlayAgain("You have reached the maximum number of guesses (6).");
            } else if ((calculatedGuesses["numRight"] === this.state.answer.length) 
                        && this.state.answer.length !== 0) 
            {
                gameObject = {"win": true, "numWrong": numWrong, "word": word, "answer": answer};

                this.askToPlayAgain("You win!");
            }

            gameArray.push(gameObject);
            
            let sortedArray = gameArray.sort(function(a, b) { 
                return a.numWrong - b.numWrong;
            });

            localStorage.setItem("gameStats", JSON.stringify(sortedArray));
        }        
    } 

    askToPlayAgain = (str) => {
        let resp = prompt(`${str} \nWould you like to play again? \ny (yes) or n (no)`, "");
        
        if (resp === null || resp.toLowerCase() === "n") {
            alert("Good game!");

            document.removeEventListener("keyup", this.handleKeyup);
        } else if (resp.toLowerCase() === "y") {
            this.setUpGame();
        } else {
            this.askToPlayAgain();
        }
    }

    handleKeyup = (event) => {
        let guess       = (event.key).toLowerCase();
        let keypressed  = event.which || event.keyCode;
        
        if ((keypressed >= 35 && keypressed <= 40) // end, home, arrows: up=38,right=39,down=40,left=37 
            || (keypressed >=48 && keypressed <= 57) // digits(0-9)
            || keypressed === 8 // delete/backspace
            || keypressed === 9 // tab
            || keypressed === 13 // return/enter
            || keypressed === 16 // shift
            || keypressed === 17 // control
            || keypressed === 18 // option/alt
            || keypressed === 20 // caps-lock
            || keypressed === 27 // escape
            || keypressed === 46 // delete
            || keypressed === 91 // command (Meta)
            || keypressed === 93 // command (Meta)
            || !(guess.match(/[a-z]/i))
            ) {
                alert(`"${guess}" is not a valid character. Please select from a-z`);
        } else if (this.state.pastGuesses.includes(guess)) {
            alert(`You have already tried the letter (${guess}).`);
        } else if (keypressed >=65 && keypressed <= 90) { // letters
            let pastGuesses = this.state.pastGuesses;
            pastGuesses.push(guess);

            this.setState({
                pastGuesses: pastGuesses
            }, () => console.log(this.state)); 
        }
    }

    render() {
        let calculatedGuesses = this.calculateGuesses();

        let answer          = this.state.answer;
        let pastGuesses     = this.state.pastGuesses;
        let currentGuess    = pastGuesses[pastGuesses.length - 1];

        let word = "";
        for (let i = 0; i < answer.length; i++) {
            let found = false;
            
            for (let j = 0; j < pastGuesses.length; j++) {
                
                if (this.state.answer[i] === pastGuesses[j]) {
                    found = true;
                }
            }
            if (found) {
                word += answer[i];
                word += "\t";
            } else {
                word += "_\t";
            }
        }

        localStorage.setItem("word", word);

        return (
            <div className="container">
                <div className="title">
                    <h1>SNOWMAN</h1>
                </div>

                <header className="navBar">
                    <div>
                        <Link to="/instructions">Instructions</Link>&nbsp;&nbsp;
                        <Link to="/highscores">Highscores</Link>
                    </div>
                </header>

                <Snowman numWrong={calculatedGuesses["numWrong"]} 
                    currentGuess={currentGuess} 
                    pastGuesses={pastGuesses}
                    word={word} />
            </div>
        );
    }
}

export default App;
