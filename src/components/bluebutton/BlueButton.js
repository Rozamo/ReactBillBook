import React from 'react';
import PropTypes from 'prop-types';
import floppy from '../../images/floppy.png';
import plus from '../../images/plus.png';

export default function BlueButton(props) {
  const { sidebarChoice, contentChoice, type } = props;

  function renderButtonName() {
    if (sidebarChoice && contentChoice) {
      if (contentChoice === 'list') {
        if (sidebarChoice === 'items') return 'Add Item';
        return `New ${
          sidebarChoice.charAt(0).toUpperCase()
          + sidebarChoice.slice(1, sidebarChoice.length - 1)
        }`;
      }
      if (contentChoice === 'create') {
        return `Save ${sidebarChoice
          .charAt(0)
          .toUpperCase()}${sidebarChoice.slice(1, sidebarChoice.length - 1)}`;
      }
    }
    return null;
  }

  function renderIcon() {
    if (contentChoice === 'list') return <img src={plus} id="floppy" alt="New" />;
    if (contentChoice === 'create') return <img src={floppy} id="floppy" alt="Save" />;
    return null;
  }

  return (
    <button type={type || 'button'} id="button" value="">
      {renderIcon()}
      {renderButtonName()}
    </button>
  );
}

BlueButton.propTypes = {
  sidebarChoice: PropTypes.string.isRequired,
  contentChoice: PropTypes.string.isRequired,
  type: PropTypes.string,
};

BlueButton.defaultProps = {
  type: 'button',
};
