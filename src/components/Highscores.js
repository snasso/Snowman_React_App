import React, { Component } from 'react';
import '../styles/App.css';
import TableRow from './TableRow';


class Highscores extends Component {
    render() {
        let gameStats = [];

        if (localStorage.getItem("gameStats") !== null 
            && localStorage.getItem("gameStats") !== undefined) 
        {
            gameStats = JSON.parse(localStorage.getItem("gameStats"));
        }

        return (
            <div>
                <button className="back-button" onClick={this.props.history.goBack}>{"< Back"}</button>
                <div className="App">
                    <div className="title">
                        <h1>Highscores</h1>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Won / Lost</th>
                                    <th># Wrong Guesses</th>
                                    <th>Word</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>  
                            
                            <tbody>
                                {   
                                    gameStats.map((stat, index) => {
                                        return <TableRow key={index} stat={stat} position={index + 1}/>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>   
        );
    }
}

export default Highscores;