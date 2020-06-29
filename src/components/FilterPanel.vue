<template>
	<div class="filter-section collapse-container">
		<div class="flex-row collapsable" v-bind:class="{collapse : !showFilters}" id="filters">
			<groupPanel />
			<FlagFilter />
			<SupplierList />
		</div>
		<div class="collapser" @click="toggleFilters">Filters</div>
	</div>
</template>

<script>
	import groupPanel from './groupPanel';
	import SupplierList from './SupplierList';
	import FlagFilter from './FlagFilter';


	export default {
		name: 'FilterPanel',
		data() {
			return {

				showFilters: true,
			}
		},
		components: {
			groupPanel,
			SupplierList,
			FlagFilter,
		},

		methods: {
			toggleFilters() {
				this.showFilters = !this.showFilters;
			}
		}
	}
</script>

<style>

</style>