<template>
	<div class="home">

	{{this.$store.state.groups}}
		<groupPanel></groupPanel>

		<table class="item-table">
			<tr>
				<th></th>
				<th style="width: 100px">Group</th>	  
				<th>Name</th>
				<th>Specs</th>
				<th></th>
				<th style="width: 100px">Wt</th>
				<th style="width: 100px">Qty</th>
				<th style="width: 100px">Price</th>
				<th>{{items.length}}</th>
			</tr>
			<template   v-for="(row, index) in items">
				<itemComponent  v-bind:item="row" v-bind:id="index" /></itemComponent>
			</template>
			<tr class="new-item">
				<td colspan="9">
					<a class="btn" @click="newItem()">New Item</a>
				</td>
			</tr>
			
			<tr>
				<th colspan="5" class="num"></th>
				<th colspan="3" class="num">{{totalPrice}}</th>
				<th></th>
			</tr>

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


	export default {
		name: 'Home',
		data() {
			return {
				hasNew: false,
				editingItem: null,
			}
		},
		components: {
			itemComponent,
			groupPanel,
		},
		computed : {
			items() {
				return this.$store.state.items;
			},
			filteredItems() {
				return this.$store.state.filteredItems;
			},
			totalPrice() {
				let totalPrice = 0;
				let totalWt = 0;
				this.items.forEach((item) => {
					if( item.enabled) {
						totalPrice += (item.price * item.qty);
						totalWt += (item.weight * item.qty);
					}
				});
				return totalPrice;
			}
		},
		methods: {
			newItem() {
				if(! this.hasNew) {
					this.$store.commit('addItem', this.$store.state.baseItem);
				}
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
			}
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
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
</style>