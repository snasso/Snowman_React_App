import React, { Component } from 'react';
import '../styles/App.css';


class Snowman extends Component {
    render() {
        let numWrong        = this.props.numWrong;
        let currentGuess    = this.props.currentGuess;
        let pastGuesses     = this.props.pastGuesses
        let word            = this.props.word;

        let bodyParts = [
            <div key="hat" className="hat">
                <div className="hat__brim"></div>
            </div>,
            <div key="head" className="head">
                <div className= "head__eye head__eye--left"></div>
                <div className="head__eye head__eye--right"></div>
                <div className="head__nose"></div>
            </div>,
            <div key="bodyTop" className="body--top">
                <div className="body__button body__button--top"></div>
                <div className="body__button body__button--middle"></div>
                <div className="body__button body__button--bottom"></div>
            </div>,
            <div key="bodyBottom" className="body--bottom"></div>,
            <div key="leftArm" className="leftArm"></div>,
            <div key="rightArm" className="rightArm"></div>
        ].slice(0, numWrong);

        return (
            <div>
                <div className="hangmanContainer">
                    {bodyParts}
                </div>

                <div className="gameContainer">
                    <h1>Currently Selected Guess is:</h1>
                    <p className="centered">{currentGuess}</p>

                    <h1>Your word is:</h1>
                    <p className="centered">{word}</p>
                    
                    <h2>Your current guesses are:</h2>
                    <p className="centered">{pastGuesses}</p>
                </div>
            </div>
        )
    }
}

export default Snowman