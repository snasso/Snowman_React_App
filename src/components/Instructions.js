import React, { Component } from 'react';
import '../styles/App.css';


class Instructions extends Component {
    render() {
        return (
            <div>
                <button className="back-button" onClick={this.props.history.goBack}>{"< Back"}</button>
                <div className="App">
                    <div>
                        <h1 className="title">Instructions</h1>
                        <p>
                            1. Select a letter of the alphabet (a-z).
                        </p>
                        <p>
                            2. If the letter is contained in the word/phrase, the letter will be
                                revealed in the word at the appropriate spot.
                        </p>
                        <p>
                            3. If the letter is not contained in the word/phrase, a portion of the 
                                snowman is added.
                        </p>
                        <p>
                            4. The game continues until:
                        </p>
                        <ul>
                            <li>
                                1. The word / phrase is guessed (all letters are revealed) – WINNER
                            </li>
                            <li>
                                2. 6 wrong guesses are made, and all the parts of the hangman are 
                                displayed – LOSER
                            </li>
                        </ul>  
                    </div>
                </div>
            </div>
        );
    }
}

export default Instructions;