import React from 'react';
import personIcon from './personIcon';
import starIcon from './starIcon';
import fileIcon from './fileIcon';

export default function SidebarItem(props) {
  const { sidebarChoice, value, cls, changeSidebarChoice } = props;

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
    if (!sidebarChoice.includes('active'))
      changeSidebarChoice(props.cls);
  }

  return (
    <div className={cls} onClick={handleSidebarClick}>
      {renderIcon()}
      {value}
    </div>
  );
}