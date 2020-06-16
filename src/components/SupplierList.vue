<template>
	<div class="supplier-list panel" v-if="validSuppliers.length">
		<div class="title">Suppliers</div>
		<div class="top-row">
			<div class="btn" v-if="filterBySupplier" @click="selectItem(null)">Show All</div>
		</div>
		<div class="label">Filter by supplier: {{filterName}}</div>
		<div class="row">
			<div class="suggested-item btn" v-bind:class="{'disabled' : filterBySupplier !== item}" v-for="item in suppliers" @click="selectItem(item)">{{item}}</div>
		</div>
	</div>
</template>

<script>


export default {
	name: 'SupplierList',
	data() {
		return {
			null: null
		}
	},
	computed: {
		suppliers() {
			return this.$store.getters.getSuppliers;
	    },
	    validSuppliers() {
	    	return this.$store.getters.getSuppliers.filter( item => item !== null);
	    },
	    filterBySupplier() {
	    	return this.$store.state.filterBySupplier;
	    },
	    filterName() {
	    	return (this.filterBySupplier !== null) ? '(' + this.filterBySupplier + ')' : '';
	    }
	}, 
	methods: {
		selectItem(item) {
			if(this.filterBySupplier == item) {
				this.$store.commit('setSupplierFilter', null); // toggle off
			} else {
				this.$store.commit('setSupplierFilter', item);
			}
			
		}
	},
}
</script>

<style>


</style>