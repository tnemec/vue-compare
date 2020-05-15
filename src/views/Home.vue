<template>
	<div class="home">
		<groupPanel></groupPanel>
<!-- 		{{filteredItems}} <br/>
		{{filteredIds}} -->
		<div class="item-count">{{filteredItems.length}} item{{filteredItems.length > 1 || !filteredItems.length ? 's' : ''}}</div>
		<table class="item-table">
			<tr>
				<th>&nbsp;</th>
				<th style="min-width: 80px">Group</th>	  
				<th>Name</th>
				<th>Specs</th>
				<th>Link</th>
				<th>Wt</th>
				<th>Qty</th>
				<th>Price</th>
				<th>&nbsp;</th>
			</tr>
			<template   v-for="(row, index) in filteredItems">
				<itemComponent  v-bind:item="row" v-bind:index="index" v-bind:key="row.id" /></itemComponent>
			</template>
			<tr class="new-item">
				<td colspan="9">
					<a class="btn" @click="newItem()">New Item</a>
				</td>
			</tr>
			
			<tr>
				<th colspan="5" class="num"></th>
				<th class="num">{{totalPrice.totalWeight}}</th>
				<th class="num">{{totalQty}}</th>
				<th class="num">{{totalPrice.totalPrice | currency}}</th>
				<th>&nbsp;</th>
			</tr>
			<totals />

		</table>


		<div>
			<a class="btn" @click="clearItems()">Clear Items</a>
		</div>
		<div>
			<a class="btn" @click="clearLocalStorage()">Clear Local Storage</a>
		</div>
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
			totalPrice() {
				let totalPrice = 0;
				let totalWeight = 0;
				if(this.filteredItems && this.filteredItems.length) {
					this.filteredItems.forEach((item) => {
						if( item.enabled) {
							totalPrice += (parseFloat(item.price) * parseFloat(item.qty));
							totalWeight += (parseFloat(item.weight) * parseFloat(item.qty));
						}
					});
				} 
				return {totalPrice, totalWeight};
			},
			totalQty() {
				let totalQty = 0;
				if(this.filteredItems && this.filteredItems.length) {
					this.filteredItems.forEach((item) => {
						if( item.enabled) {
							totalQty += parseFloat(item.qty);
						}
					});
				} 	
				return totalQty;			
			}
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
				this.$store.commit('removeAllItems');
			},
			clearLocalStorage() {
				this.$store.commit('clearLocalStorage');
			},
		}
	}
</script>

<style>

	.item-table {
		width: 100%;
		border-collapse: collapse;
	}

	.item-table th {
		background: #E5E5E5;
		border: 1px solid #333;
		text-align: left
	}
	.item-table tr {
		border: 1px solid #333;
	}
	.item-table td {
		background: #FFF;
		border: 1px solid #999;
		padding: 1px 6px;
	}
	.item-table .num {
		text-align: right
	}
	.item-table .del {
		width: 60px;
		padding-right: 24px;
		text-align: right
	}
	.item-table .sel {
		width: 20px;
		padding-left: 24px;
	}
	.item-table .url {
		width: 32px;
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
		background-color: #ffb3b3;
	}
	a {
		cursor: pointer;
		color: #1e60c1;
	}
</style>