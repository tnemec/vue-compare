<template>
	<div class="bom">
		<FilterPanel />
		<div class="bom-items">
			<div class="item-count title">{{filteredItems.length}} item{{filteredItems.length > 1 || !filteredItems.length ? 's' : ''}}</div>
			<div class="item-table">

				<BomItem  v-for="(row, index) in filteredItems" v-bind:key="row.id" v-bind:item="row" v-bind:index="index" /></BomItem>

				<totals />

				
			</div>

		</div>

	</div>
</template>

<script>
	import BomItem from '../components/BomItem';
	import totals from '../components/totals';
	import FilterPanel from '../components/FilterPanel';

	export default {
		name: 'BOM',
		data() {
			return {

			}
		},
		components: {
			BomItem,
			FilterPanel,
			totals,
		},
		computed : {
			items() {
				return this.$store.state.items;
			},

		  	filteredItems() {
		  		return this.$store.getters.filteredItems;
		  	},
		  	filteredIds() {
		  		return this.filteredItems.map(item => item.id)
		  	},
		},
		methods: {

		}
	}
</script>

<style>

	.bom {
		padding: 0 24px;
	}


</style>