import React from 'react';
import BlueButton from './BlueButton';

export default function TopPanel(props) {
    function renderTitle() {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list') 
                return <h1 id="title">{props.sidebar_choice.charAt(0).toUpperCase() + props.sidebar_choice.slice(1)}</h1>
            else
                return <h1 id="title">New {props.sidebar_choice.charAt(0).toUpperCase() + props.sidebar_choice.slice(1, props.sidebar_choice.length - 1)}</h1>
        }
        return null;
    }
    function renderButton() {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list') 
                return <BlueButton sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>
        }
        return null;
    }
    return <div className="top-panel">
        {renderTitle()}
        {renderButton()}
    </div>;
}