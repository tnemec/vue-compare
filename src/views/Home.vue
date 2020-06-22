<template>
	<div class="home">
		<div class="filter-section collapse-container">
			<div class="flex-row collapsable" v-bind:class="{collapse : !showFilters}" id="filters">
				<groupPanel />
				<FlagFilter />
				<SupplierList />
			</div>
			<div class="collapser" @click="toggleFilters">Filters</div>
		</div>
		<div class="item-panel panel">
			<div class="item-count title">{{filteredItems.length}} item{{filteredItems.length > 1 || !filteredItems.length ? 's' : ''}}</div>
			<div class="top-row">
				<a class="btn" @click="newItem()"> + Add Item</a>
				<a class="btn" @click="clearItemsCancel()" v-if="clearItemsMode">Cancel</a>
				<a class="btn" @click="clearItems()">{{clearItemsLabel}}</a>
			</div>
			<div class="item-table">
				<div class="row row-header">
					<div class="col1">&nbsp;</div>
					<div class="col-group">Group</div>	  
					<div class="col-name">Name</div>
					<div class="col-specs">Specs</div>
					<div class="col-flags">Flags</div>
					<div class="col-link">Link</div>
					<div class="col-supplier">Supplier</div>
					<div class="col-wt">Wt</div>
					<div class="col-qty">Qty</div>
					<div class="col-price">Price</div>
					<div class="col-del">&nbsp;</div>
				</div>

				<itemComponent  v-for="(row, index) in filteredItems" v-bind:key="row.id" v-bind:item="row" v-bind:index="index" /></itemComponent>

				<totals />

				
			</div>

		</div>
		<ImportExport />

<!-- 		<div>
			<a class="btn" @click="clearLocalStorage()">Clear Local Storage</a>
		</div> -->
	</div>
</template>

<script>
	import itemComponent from '../components/itemComponent';
	import groupPanel from '../components/groupPanel';
	import totals from '../components/totals';
	import SupplierList from '../components/SupplierList';
	import FlagFilter from '../components/FlagFilter';
	import ImportExport from '../components/ImportExport';


	export default {
		name: 'Home',
		data() {
			return {
				clearItemsMode: false,
				showFilters: true,
			}
		},
		components: {
			itemComponent,
			groupPanel,
			totals,
			SupplierList,
			FlagFilter,
			ImportExport,
		},
		filters: {
			currency(value) {
				const decimals = 2;
				const symbol = "$";
				return symbol + Math.abs(value).toFixed(decimals);
			}
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
		  	clearItemsLabel() {
		  		return this.clearItemMode ? 'Confim' : 'Clear Items';
		  	},

		},
		methods: {
			newItem() {
				this.$store.commit('addItem');
			},
			removeItem(id) {
				if(id != '') {
					this.items.find((item, index) => {
						if (item.id == id) {
							this.$store.commit('removeItem', index);
						}
					})
				}
			},
			clearItems() {
				this.clearItemsMode = true;
			},
			clearItemsConfirm() {
				this.$store.commit('removeAllItems');
			},
			clearItemsCancel(){
				this.clearItemsMode = false;
			},
			clearLocalStorage() {
				this.$store.commit('clearLocalStorage');
			},
			toggleFilters() {
				this.showFilters = !this.showFilters;
			}
		}
	}
</script>

<style>

	.home {
		padding: 24px;
	}


</style>