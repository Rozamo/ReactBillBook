import React from "react";
import { PropTypes } from "prop-types";
import floppy from '../../images/floppy.png';
import plus from '../../images/plus.png';

function Button({name,id,cls,value,onClick}) {
	function icon() {
		if (name === "Save Invoice")
			return <img src={floppy} id="floppy" alt="Save" />;
		else return <img src={plus} id="floppy" alt="Save" />;
	}
		return (
			<button
				id={id}
				className={cls}
				value={value}
				onClick={() => onClick()}
			>
				{icon()}
				{name}
			</button>
		);
}

Button.propTypes={
	name:PropTypes.string.isRequired,
	id:PropTypes.string,
	cls:PropTypes.string,
	value:PropTypes.string.isRequired,
	onClick:PropTypes.func.isRequired
}

export default Button;
