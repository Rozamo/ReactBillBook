import React from 'react';
import floppy from './floppy.png';
import plus from './plus.png';

export default function BlueButton(props) {
    function renderButtonName() {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list') {
                if (props.sidebar_choice === 'items')
                    return "Add Item";
                else
                    return `New ${props.sidebar_choice.charAt(0).toUpperCase() + props.sidebar_choice.slice(1, props.sidebar_choice.length - 1)}`
            }
            else if (props.content_choice === 'create') 
                return `Save ${props.sidebar_choice.charAt(0).toUpperCase()}${props.sidebar_choice.slice(1, props.sidebar_choice.length - 1)}`;
        }
    }
    const handleButtonClick = (event) => {
        if (props.sidebar_choice && props.content_choice) {
            if (props.content_choice === 'list')
                props.changeContentChoice('create');
            else if (props.content_choice === 'create')
                props.handleSubmit(event);
        }
        return null;
    }
    function icon() {
        if (props.content_choice === 'list')
            return <img src={plus} id="floppy" alt="New"></img>;
        else if (props.content_choice === 'create')
            return <img src={floppy} id="floppy" alt="Save"></img>;
        return null;
    }
    return <button id="button" value="" onClick={handleButtonClick}>
        {icon()}
        {renderButtonName()}
    </button>;
}