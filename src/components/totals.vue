<template>
	<Fragment>
		<div class="row totals-row" v-for="grp in filteredTotalsByGroup.groupTotals" v-bind:style="{backgroundColor: grp.color}"  v-if="filteredItems.length">
			<div class="grow num">{{grp.name}}</div>
			<div class="col-wt num">{{grp.totalWeight}}</div>
			<div class="col-qty num">{{grp.totalQty}}</div>
			<div class="col-price num">{{grp.totalPrice | currency}}</div>
			<div class="col-del">{{grp.itemCount}} item{{grp.itemCount > 1 || !grp.itemCount? 's' : 
			''}}</div>
		</div>
		<div class="row totals-row grand-total" v-if="filteredItems.length">
			<div class="grow num">All Groups</div>
			<div class="col-wt num">{{filteredTotalsByGroup.grandTotal.totalWeight}}</div>
			<div class="col-qty num">{{filteredTotalsByGroup.grandTotal.totalQty}}</div>
			<div class="col-price num">{{filteredTotalsByGroup.grandTotal.totalPrice | currency}}</div>
			<div class="col-del">{{filteredTotalsByGroup.grandTotal.itemCount}} item{{filteredTotalsByGroup.grandTotal.itemCount > 1 || !filteredTotalsByGroup.grandTotal.itemCount? 's' : 
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
	  	filteredTotalsByGroup() {
	  		const filteredItems = this.$store.getters.filteredItems;
	  		let grandTotal = {
				totalPrice: 0,
				totalWeight: 0,
				totalQty: 0,
				itemCount: 0
	  		};
	  		let groupTotals = [...this.$store.getters.getGroups];

	  		groupTotals.forEach( (group) => {
	  			group.totalPrice = 0;
	  			group.totalWeight = 0;
	  			group.totalQty = 0;
	  			group.itemCount = 0;
	  		});	

			if(this.filteredItems && this.filteredItems.length) {
				this.filteredItems.forEach( (item) => {
					if( item.enabled) {
						grandTotal.totalPrice += (parseFloat(item.price) * parseFloat(item.qty));
						grandTotal.totalWeight += (parseFloat(item.weight) * parseFloat(item.qty));
						grandTotal.totalQty += parseFloat(item.qty);
						grandTotal.itemCount++;

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
				
			} 	 
			return {groupTotals, grandTotal};		
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