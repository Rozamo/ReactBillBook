import React from 'react';
import floppy from './floppy.png';
import plus from './plus.png';

export default function BlueButton(props) {
    const {sidebarChoice, contentChoice, type} = props;

    function renderButtonName() {    
        if (sidebarChoice && contentChoice) {
            if (contentChoice === 'list') {
                if (sidebarChoice === 'items')
                    return "Add Item";
                else
                    return `New ${sidebarChoice.charAt(0).toUpperCase() + sidebarChoice.slice(1, sidebarChoice.length - 1)}`;
            }
            else if (contentChoice === 'create') 
                return `Save ${sidebarChoice.charAt(0).toUpperCase()}${sidebarChoice.slice(1, sidebarChoice.length - 1)}`;
        }
    }

    function renderIcon() {
        if (contentChoice === 'list')
            return <img src={plus} id="floppy" alt="New"></img>;
        else if (contentChoice === 'create')
            return <img src={floppy} id="floppy" alt="Save"></img>;
        return null;
    }

    return <button type={type ? type : 'button'} id="button" value="">
        {renderIcon()}
        {renderButtonName()}
    </button>;
}