import React from 'react';
import person_icon from './person_icon';
import star_icon from './star_icon';
import file_icon from './file_icon';

export default function SideBarItem(props) {
    function icon(){
        if (props.sidebar_choice === 'customers')
            return person_icon;
        else if (props.sidebar_choice === 'items')
            return star_icon;
        else if (props.sidebar_choice === 'invoices')
            return file_icon;
        else
            return null;
    }
    return <div className={props.cls}>
        {icon()}
        {props.value}
    </div>;
}