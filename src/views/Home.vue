<template>
	<div class="home">
		<groupPanel></groupPanel>
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

<!-- 		<div>
			<a class="btn" @click="clearLocalStorage()">Clear Local Storage</a>
		</div> -->
	</div>
</template>

<script>
	import itemComponent from '../components/itemComponent';
	import groupPanel from '../components/groupPanel';
	import totals from '../components/totals';


	export default {
		name: 'Home',
		data() {
			return {
				clearItemsMode: false,
			}
		},
		components: {
			itemComponent,
			groupPanel,
			totals,
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
		}
	}
</script>

<style>

	.home {
		padding: 24px;
	}

	.item-table {
		width: 100%;
		border-collapse: collapse;
		
	}

	.item-table .row {
		background: #63686d;
		border-top: 1px solid rgb(10,10,10,0.25);
		border-bottom: 1px solid rgb(250,250,250,0.20);
	}	
	.item-table .list-item:nth-child(even) > div {
		background: #71777d;
	}

	.item-table .row > div {
		text-align: left;
		padding: 3px 6px;
		border-left: 1px solid rgb(10,10,10,0.25);
		border-right: 1px solid rgb(250,250,250,0.15);
	}
	.item-table .row > div:first-child {
		border-left: none;
	}
	.item-table .row > div:last-child {
		border-right: none;
	}	

	.item-table .row-header {
		background: #5b6064;
		border-top: 1px solid rgb(250,250,250,0.20);
		border-bottom: 1px solid rgb(10,10,10,0.25);
	}
	.item-table .row > div {
		text-align: center;
		border-left: 1px solid rgb(250,250,250,0.15);
		border-right: 1px solid rgb(10,10,10,0.25);
	}

	.item-table tr {
		border: 1px solid #333;
	}
	.item-table td {
		background: #FFF;
		border: 1px solid #999;
		padding: 1px 6px;
	}
	.item-table .col1 {
		flex-basis: 3%;
		min-width: 40px;
	}
	.item-table .col-group {
		flex-basis: 5%;
		min-width: 100px;
	}	
	.item-table .col-name {
		flex-basis: 10%;
		min-width: 175px;
		flex-grow: 1;
	}	
	.item-table .col-specs {
		flex-basis: 10%;
		min-width: 175px;
		flex-grow: 1;
	}	
	.item-table .col-link {
		flex-basis: 10%;
		min-width: 175px;
	}	
	.item-table .col-supplier {
		flex-basis: 10%;
		min-width: 155px;
	}		
	.item-table .col-wt {
		flex-basis: 3%;
		min-width: 60px;
	}
	.item-table .col-qty {
		flex-basis: 3%;
		min-width: 60px;
	}
	.item-table .col-price {
		flex-basis: 5%;
		min-width: 80px;
	}
	.item-table .col-del {
		flex-basis: 3%;
		min-width: 60px;
	}


	.item-table .row > .num {
		text-align: right
	}
	.item-table  .row > .del {
		text-align: center
	}
	.item-table .specs {
		font-size: 12px;
	}
	.item-table .del b {
		display: inline-block;
		text-align: center;
		line-height: 32px;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
	.item-table .del b:hover {
		background-color: #da3737;
	}
	.item-table .row-label {
		display: none;
		font-size: 12px;
		color: #D4D4D4;
	}

	@media only screen and (max-width:1150px) {
		/* breakpoint for table */
		.item-table .row-header {
			display: none;
		}
		.item-table .row-label {
			display: block;
		}
	}

</style>