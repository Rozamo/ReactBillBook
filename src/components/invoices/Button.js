import React from "react";
import floppy from '../../images/floppy.png';
import plus from '../../images/plus.png';

function Button({name,id,cls,value,onClick}) {
	function icon() {
		if (name === "Save Invoice")
			return <img src={floppy} id="floppy" alt="Save"></img>;
		else return <img src={plus} id="floppy" alt="Save"></img>;
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

export default Button;
