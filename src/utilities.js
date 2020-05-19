const randomColor = () => {
	// return random rgb color but only darker colors.
	const makeColor = () => {
		const min = 45;
		const max = 185;
		return Math.floor(Math.random() * (max - min) + min);
	}
	let colors = [];
	for( let i = 0; i < 3; i++) {
		colors.push(makeColor());
	}
	return colors;
};

const randomRGBColor = () => {
	const colors = randomColor();
	return 'rgba(' + colors.join(',') + ')';
};

const randomHexColor = () => {
	const colors = randomColor();
	return '#' + colors.map( c => c.toString(16)).join('');
}


export {randomRGBColor, randomHexColor}