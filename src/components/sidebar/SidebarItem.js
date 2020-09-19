import React from 'react';
import personIcon from './personIcon';
import starIcon from './starIcon';
import fileIcon from './fileIcon';

export default function SidebarItem(props) {
  const { sidebarChoice, value, classValue, changeSidebarChoice } = props;

  function renderIcon() {
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
    if (!classValue.includes('active'))
      changeSidebarChoice(props.classValue);
  }

  return (
    <div className={classValue} onClick={handleSidebarClick}>
      {renderIcon()}
      {value}
    </div>
  );
}