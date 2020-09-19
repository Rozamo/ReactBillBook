import { inRange } from 'lodash';
import React from 'react';

const INR = new Intl.NumberFormat('en-IN', { 
	style: 'currency', 
	currency: 'INR', 
	minimumFractionDigits: 2, 
});

export default INR;