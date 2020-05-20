<template>
	<a class="colorBtn btn" v-bind:class="className" v-bind:style="style">
		<slot></slot>
	</a>
</template>

<script>
import utilities from '../utilities'

export default {
	name: 'ColorBtn',
	mixins: [utilities],
	props: [
		'baseColor',
		'disabled'
	],
	computed: {
		style() {
			return {
				background: this.makeGradient(this.baseColor), 
				boxShadow: 'inset 0px 1px 0px 0px ' + this.RGBLinearShade(0.25, this.baseColor) + ', inset 0px -1px 0px 0px ' + this.RGBLinearShade(-0.25, this.baseColor),
				textShadow: '-1px -1px 0px ' + this.RGBLinearShade(-0.25, this.baseColor)
			}
		},
		className() {
			return (this.disabled) ? 'disabled' : '';
		}
	}

}

</script>


<style>
	.color-btn.disabled,
	.color-btn:disabled {
		background: #999 !important;
		color: #665;
		text-shadow: none !important;
		box-shadow: none !important;
	}

</style>