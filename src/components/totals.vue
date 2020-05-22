<template>
	<Fragment>
		<div class="row totals-row" v-for="grp in filteredItemsByGroup" v-bind:style="{backgroundColor: grp.color}">
			<div class="grow num">{{grp.name}}</div>
			<div class="col-wt num">{{grp.totalWeight}}</div>
			<div class="col-qty num">{{grp.totalQty}}</div>
			<div class="col-price num">{{grp.totalPrice | currency}}</div>
			<div class="col-del">{{grp.itemCount}} item{{grp.itemCount > 1 || !grp.itemCount? 's' : 
			''}}</div>
		</div>
	</Fragment>
</template>



	<script>
import { Fragment } from 'vue-fragment';
import utilities from '../utilities'

export default {
	name: 'totals',
	components: {Fragment},
	mixins: [utilities],
	data() {
		return {
			
		}
	},
	mounted() {

	},
	computed: {
		unset() {
			return this.$store.state.unset;
		},
		filteredItems() {
	  		return this.$store.getters.filteredItems;
	  	},
	  	filteredItemsByGroup() {
	  		const filteredItems = this.$store.getters.filteredItems;
	  		let groupTotals = [...this.$store.state.groups];
	  		groupTotals.forEach( (group) => {
	  			group.totalPrice = 0;
	  			group.totalWeight = 0;
	  			group.totalQty = 0;
	  			group.itemCount = 0;
	  		});	
			if(this.filteredItems && this.filteredItems.length) {
				this.filteredItems.forEach( (item) => {
					if( item.enabled) {
						item.groups.forEach( (group) => {
							let thisGroup = groupTotals.find( g => g.id === group);
							if(thisGroup) {
								thisGroup.totalPrice += (parseFloat(item.price) * parseFloat(item.qty));
								thisGroup.totalWeight += (parseFloat(item.weight) * parseFloat(item.qty));
								thisGroup.totalQty += parseFloat(item.qty);
								thisGroup.itemCount++;
							}
						});
					}
				});
				return groupTotals;
			} 	  		

	  	},
	},
	methods: {

	}
}
</script>

<style>
	.item-table .totals-row > th {
		background: inherit;
		color: #FFF;
	}
	.totals-row th {
		padding: 0 6px;
	}
</style>