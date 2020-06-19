// const randomColor = () => {
// 	// return random rgb color but only darker colors.

// 	const makeColor = (min, max) => {	
// 		const minVal = min || 45;
// 		const maxVal = max || 185;
// 		return Math.floor(Math.random() * (max - min) + min);
// 	}
// 	let colors = [];
// 	for( let i = 0; i < 3; i++) {
// 		colors.push(makeColor());
// 	}
// 	return colors;
// };

// const RGB_Linear_Shade=(p,c)=>{
//     var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
//     return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
// }

// const randomRGBColor = () => {
// 	const colors = randomColor();
// 	return 'rgb(' + colors.join(',') + ')';
// };

// const randomHexColor = () => {
// 	const colors = randomColor();
// 	return '#' + colors.map( c => c.toString(16)).join('');
// }


export default {
	name: 'utilities',
	filters: {
		currency(value) {
			const decimals = 2;
			const symbol = "$";
			return symbol + Math.abs(value).toFixed(decimals);
		},
		flagColor(key) {
			const colors = {
				'Ordered': '#948201',
		  		'Received': '#0097af',
		  		'Complete': '#01a944',
			};
			return colors[key] || '#000';
		},
		hexToRGB(hex) {
			if(hex.indexOf('rgb') !== -1) {
				return hex; // return arg if it's already rgb
			}
		    const bigint = parseInt(hex.replace(/#/,''), 16);
		    const r = (bigint >> 16) & 255;
		    const g = (bigint >> 8) & 255;
		    const b = bigint & 255;
		    return 'rgb(' + r + "," + g + "," + b + ')';
		},
	},
	methods : {
		randomColor() {
			// return random rgb color but only darker colors.

			const makeColor = (min, max) => {	
				const minVal = min || 45;
				const maxVal = max || 185;
				return Math.floor(Math.random() * (maxVal - minVal) + minVal);
			}
			let colors = [];
			for( let i = 0; i < 3; i++) {
				colors.push(makeColor());
			}
			return colors;
		},
		RGBLinearShade(p,c){
		    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
		    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
		},
		randomRGBColor(){
			const colors = this.randomColor();
			return 'rgb(' + colors.join(',') + ')';
		},
		randomHexColor(){
			const colors = this.randomColor();
			return '#' + colors.map( c => c.toString(16)).join('');
		},
		makeGradient(baseColor) {
			return 'linear-gradient(to bottom, '+ this.RGBLinearShade(0.15, baseColor)  + ' 5%, '+ this.RGBLinearShade(-0.15, baseColor) +' 100%)';
		},
	}

};

