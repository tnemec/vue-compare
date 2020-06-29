<template>
	<div class="checkbox" @click.prevent.stop="clicked">
    	<input type="checkbox" :id="localId" :checked="checked">
    	<label :for="localId"><span :style="labelStyle"><slot></slot></span></label>
	</div>
</template>

<script>

// required prop: checked - the checked state (bool)
// the native events on the input is repressed
// optional prop: labelColor - hex or rgb string to apply to the label background if checked == true

// emits 'clicked' event

export default {
	name: 'Checkbox',
	props: [
		'checked',
		'labelColor',
	],
	data() {
		return {
			localId: this._uid,
		}
	},
	computed: {
		labelStyle() {
			return (this.labelColor && this.checked) ? 'background: ' + this.labelColor : '';
		}
	},
	methods: {
		clicked() {
			 this.$emit('clicked');
		},
	}


}


</script>


<style>

	/* styles from https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3 */

	.checkbox {
		padding-bottom: 3px;
	}

	.checkbox input[type="checkbox"] {
	    /*opacity: 0;*/
	    display: none;
	    pointer-events: none;
	}

	.checkbox label {
	    position: relative;
	    display: inline-block;
	    /*16px width of fake checkbox + 6px distance between fake checkbox and text*/
	    padding-left: 22px;
	    /*line-height: 24px*/
	}

	.checkbox label::before,
	.checkbox label::after {
	    position: absolute;
	    content: "";
	    /*Needed for the line-height to take effect*/
	    display: inline-block;
	}

	/*Outer box of the fake checkbox*/
	.checkbox label::before{
	    height: 16px;
	    width: 16px;
	    border: 1px solid rgba(250,250,250,0.5);
	    background: rgba(10,10,10,0.15);
	    left: 0px;
	    /*(24px line-height - 16px height of fake checkbox) / 2 - 1px for the border
	     *to vertically center it.
	     */
	    top: 3px;
	}

	/*Checkmark of the fake checkbox*/
	.checkbox label::after {
	    height: 5px;
	    width: 9px;
	    border-left: 2px solid;
	    border-bottom: 2px solid #E8E8E8;
	    transform: rotate(-45deg);
	    left: 4px;
	    top: 7px;
	}

	/*Hide the checkmark by default*/
	.checkbox input[type="checkbox"] + label::after {
	    content: none;
	}

	/*Unhide on the checked state*/
	.checkbox input[type="checkbox"]:checked + label::after {
	    content: "";
	}
	.checkbox label span {
		padding: 1px 3px;
	}

</style>