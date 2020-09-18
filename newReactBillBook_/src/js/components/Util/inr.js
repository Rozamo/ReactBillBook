const inr = new Intl.NumberFormat('en-IN', { 
	style: 'currency', 
	currency: 'INR', 
	minimumFractionDigits: 2, 
});

export default inr;