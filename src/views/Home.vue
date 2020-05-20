<template>
	<div class="home">
		<groupPanel></groupPanel>
		<div class="item-panel panel">
			<div class="item-count title">{{filteredItems.length}} item{{filteredItems.length > 1 || !filteredItems.length ? 's' : ''}}</div>
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
				<itemComponent  v-for="(row, index) in filteredItems" v-bind:key="row.id" v-bind:item="row" v-bind:index="index" /></itemComponent>
				<tr class="new-item">
					<td colspan="9">
						<a class="btn" @click="newItem()">New Item</a>
					</td>
				</tr>
				
				<totals />

			</table>


			<div>
				<a class="btn" @click="clearItems()">Clear Items</a>
			</div>

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

	.home {
		padding: 24px;
	}

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

</style>