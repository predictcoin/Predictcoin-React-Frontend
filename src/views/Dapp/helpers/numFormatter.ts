const numFormatter = (num: number): string => {
	return (Math.round((num + Number.EPSILON) * 100) / 100)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default numFormatter;
