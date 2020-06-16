<template>
	<div class="autocomplete" v-if="show && filteredSuggested.length">
		<div class="suggested-item" v-for="item in filteredSuggested" @click="$emit('select-item' ,item)">{{item}}</div>
	</div>
</template>



<script>

/* required props:
	suggested: array of available suggestions
	query: the input value to filter the list
	show: (bool) make the suggestion list visible, default false

	emitted event:
	select-item: sends the selected item from the suggested list
*/

export default {
	name: 'Autocomplete',
	props: ['suggested', 'query', 'show'],
	data() {
		return {
			options: {
				maxItems: 6,
				showAllWhenEmpty: false
			}
		}
	},
	computed: {
		filteredSuggested() {
	      if (this.query && this.query.trim().length === 0) {
	        return (this.options.showAllWhenEmpty) ? suggested : null; // return entire list when input empty
	      }
	      return this.suggested.filter((term) => {
	      	if(term && this.query) {
	      		return term.toLowerCase().includes(this.query.toLowerCase())
	      	}
	      }).splice(0,this.options.maxItems)
	    },
	}
}
</script>

<style>

	.autocomplete {
		background: #E7E7E7;
		border: 1px solid #DDDDDD;
	}
	.autocomplete .suggested-item {
		border-bottom: 1px solid #DDDDDD;
		color: #333;
		text-align: left;
		padding: 2px 4px;
		cursor: pointer;
	}
	.autocomplete .suggested-item:hover {
		background: #78dae6;
	}

</style>