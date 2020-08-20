import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography } from '@material-ui/core';

class DividerText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            lineColor: this.props.lineColor,
            textColor: this.props.textColor,
            lineClassName: this.props.lineClassName,
            textClassName: this.props.textClassName
        }


    }

    render() {
        const lineStyle = {
            height: '1px',
            width: '100%',
            background: (this.state.lineColor) ? (this.state.lineColor) : 'lightgrey'
        }
        const textStyle = {
            color: (this.state.textColor) ? (this.state.textColor) : 'lightslategrey'
        }
        return (
            <div className="row" style={{ margin: '15px 0'}}>
                <div className={this.state.lineClassName} style={{ padding: '11px 0' }}><div style={lineStyle}></div></div>
                <div className={this.state.textClassName}><Typography align="center" style={textStyle}>{this.props.text}</Typography></div>
                <div className={this.state.lineClassName} style={{ padding: '11px 0' }}><div style={lineStyle}></div></div>
            </div>
        )
    }
}

export default DividerText