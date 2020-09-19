import React from 'react';
import personIcon from './personIcon';
import starIcon from './starIcon';
import fileIcon from './fileIcon';

export default function SidebarItem(props) {
    function icon() {
        const sidebarChoice = props.sidebarChoice;
        switch (sidebarChoice) {
            case 'customers':
                return personIcon;
            case 'items':
                return starIcon;
            case 'invoices':
                return fileIcon;
            default:
                return null;
        }
    }
    function handleSidebarClick() {
        if (!props.sidebarChoice.includes('active'))
            props.changeSidebarChoice(props.cls);
    }
    return (
        <div className={props.cls} onClick={handleSidebarClick}>
            {icon()}
            {props.value}
        </div>
    );
}