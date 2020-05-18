<template>
	<Fragment>
		<tr class="totals-row" v-for="grp in filteredItemsByGroup" v-bind:style="{backgroundColor: grp.color}">
			<th colspan="5" class="num">{{grp.itemCount}} item{{grp.itemCount > 1 || !grp.itemCount? 's' : 
			''}}</th>
			<th class="num">{{grp.totalWeight}}</th>
			<th class="num">{{grp.totalQty}}</th>
			<th class="num">{{grp.totalPrice | currency}}</th>
			<th>{{grp.name}} </th>
		</tr>
	</Fragment>
</template>



	<script>
import { Fragment } from 'vue-fragment';

export default {
	name: 'totals',
	components: {Fragment},
	data() {
		return {
			
		}
	},
	mounted() {

	},
	filters: {
		currency(value) {
			const decimals = 2;
			const symbol = "$";
			return symbol + Math.abs(value).toFixed(decimals);
		}
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