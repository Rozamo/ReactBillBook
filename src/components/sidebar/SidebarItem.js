import React from 'react';
import PropTypes from 'prop-types';
import personIcon from './personIcon';
import starIcon from './starIcon';
import fileIcon from './fileIcon';

export default function SidebarItem(props) {
  const { sidebarChoice, value, classValue } = props;

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

  return (
    <div className={classValue}>
      <span
        style={{minWidth: '1em', lineHeight: '77%'}}
      >
        {renderIcon()}</span>
      {value}
    </div>
  );
}

SidebarItem.propTypes = {
  sidebarChoice: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classValue: PropTypes.string.isRequired,
};
