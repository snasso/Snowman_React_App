import React, { Component } from 'react';


class TableRow extends Component {
    render() {
        let stat        = this.props.stat;
        let position    = this.props.position;

        return (
            <tr>
                <td>{position}</td>
                <td>{(stat.win === true) ? "Won" : "Lost"}</td>
                <td>{stat.numWrong}</td>
                <td>{stat.word}</td>
                <td>{stat.answer}</td>
            </tr>
        );
    }
}

export default TableRow;