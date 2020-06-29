<template>
	<div class="home">
		<FilterPanel />
		<div class="item-panel panel">
			<div class="item-count title">{{filteredItems.length}} item{{filteredItems.length > 1 || !filteredItems.length ? 's' : ''}}</div>
			<div class="top-row">
				<a class="btn" @click="newItem"> + Add Item</a>
				<a class="btn" @click="clearItemsCancel" v-if="clearItemsMode">Cancel</a>
				<a class="btn" @click="clearItems">{{clearItemsLabel}}</a>
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

				<div class="bottom-row" v-if="filteredItems.length > 3">
					<a class="btn" @click="newItem"> + Add Item</a>
				</div>

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
	import totals from '../components/totals';
	import FilterPanel from '../components/FilterPanel';
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
			FilterPanel,
			totals,
			ImportExport,
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
				if(this.clearItemsMode) {
					this.clearItemsConfirm();
					this.clearItemsMode = false;
				} else {
					this.clearItemsMode = true;
				}
				
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
		}
	}
</script>

<style>

	.home {
		padding: 0 24px;
	}


</style>