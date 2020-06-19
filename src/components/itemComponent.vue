<template>
	<div class="list-item">
	  <div class="grp-line" v-for="group in groups" :style="{backgroundColor: groupColor(group)}"></div>
	   <div class="row">
	  	  <div class="col1 sel">
	  	  		<Checkbox v-bind:checked="item.enabled" @clicked="toggleEnabled">{{index +1}}</Checkbox>
	  	  </div>
		  <div class="col-group">
		  	<div class="row-label">Group</div>
		  	<groupSelect v-bind:item="newItem" />
		  </div>	  
		  <div class="col-name">
		  	<div class="row-label">Name</div>
		  	<input type="text" class="item-name" v-model="newItem.name" placeholder="Name" @blur="updateItem" />
		  </div>
	  	  <div class="col-specs specs">
	  	  	<div class="row-label">Specs</div>
	  	  	<textarea class="item-specs" v-model="newItem.specs" placeholder="Specs" @blur="updateItem" />
	  	  </div>
	  	  <div class="col-flags flags">
	  	  	<div class="row-label">Flags</div>
	  	  	<Checkbox v-for="key in Object.keys(item.flags)" v-bind:checked="item.flags[key]" @clicked="toggleFlag(key)" v-bind:labelColor="key | flagColor">{{key}}</Checkbox>
	  	  </div>	  	  
	  	  <div class="col-link url">
	  	  	<div class="row-label">Link</div>
	  	  	<input type="text" class="item-url" v-model="newItem.url" placeholder="URL" @blur="updateItem" />
	  	  	<a class="link-icon" v-if="newItem.url" v-bind:href="newItem.url" target="_blank" rel="external"></a>
	  	  </div>		
	  	  <div class="col-supplier">
	  	  	<div class="row-label">Supplier</div>
	  	  	<input type="text" class="item-supplier" v-model="newItem.supplier" placeholder="Supplier" @blur="updateSupplier" @focus="showSuggested" />
	  	  	<Autocomplete v-bind:suggested="suppliers" v-bind:query="newItem.supplier" v-bind:show="showAutocomplete" v-on:select-item="useSuggested"   />
	  	  </div>		  	  
		  <div class="col-wt">
		  	<div class="row-label">Wt.</div>
		  	<input type="text" class="item-weight" v-model="newItem.weight" placeholder="Wt" @blur="updateItem" @focus="select" />
		  </div>
		  <div class="col-qty">
		  	<div class="row-label">Qty.</div>
		  	<input type="text" class="item-qty" v-model="newItem.qty" placeholder="Qty" @blur="updateItem" @focus="select" />
		  </div>
		  <div class="col-price">
		  	<div class="row-label">Price</div>
		  	<input type="text" class="item-price" v-model="priceFormatted" placeholder="Price" @blur="updateItem" @focus="selectPrice" />
		  </div>
		  <div class="col-del del"><b class="delete" @click="removeItem">X</b></div>
	  </div>
	</div>
</template>



	<script>

	import groupSelect from './groupSelect'
	import Checkbox from './Checkbox'
	import Autocomplete from './Autocomplete'
	import utilities from '../utilities'

export default {
	name: 'itemComponent',
	props: ['item', 'index'],
	mixins: [utilities],
	components: {
		groupSelect,
		Checkbox,
		Autocomplete,
	},
	data() {
		return {
			newItem: {...this.item},
			priceFormatted: this.$options.filters.currency(parseFloat(this.item.price)),
			showAutocomplete: false,
		}
	},
	computed: {
		groups() {
			return this.newItem.groups.sort();
		},
		suppliers() {
			return this.$store.getters.getSuppliers;
		}
	},
	methods: {
		toggleEnabled() {
			this.$store.commit('toggleItemEnabled', this.newItem.id);
		},
		updateItem() {
			this.newItem.price = parseFloat(this.priceFormatted.replace(/[^0-9|.]+/g,''));
			this.$store.commit('updateItem', this.newItem);
			this.$nextTick( () => {
				this.priceFormatted = this.$options.filters.currency(parseFloat(this.newItem.price));
			})
		},
		updateSupplier() {
			this.updateItem();
			// close the autocomplete component
			setTimeout(() => {
				this.showAutocomplete = false;
			}, 150);
		},
		removeItem() {
			this.$store.commit('removeItem', this.newItem.id);
		},
		select(evt) {
			evt.target.select();
		},
		selectPrice(evt) {
			this.priceFormatted = this.priceFormatted.replace(/[^0-9|.]+/g,'');
			this.$nextTick( () => {
				evt.target.select();
			});
		},
		updateGroup(groupArray) {
			// used for group select child element to update the current newItem
			this.newItem.groups = groupArray;
			this.$store.commit('updateItem', this.newItem);
		},
		groupColor(groupId) {
			return this.$store.state.groups.find( g => g.id === groupId).color;
		},
		showSuggested(evt) {
			this.showAutocomplete = true;
			this.select(evt);
		},
		useSuggested(supplier) {
			this.newItem.supplier = supplier;
		},
		toggleFlag(key) {
			this.newItem.flags[key] = !this.newItem.flags[key];
			this.$store.commit('updateItem', this.newItem);
		}


	}
}
</script>

<style>
	.list-item .flex{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item-weight, .item-qty {
		text-align: right;
	}
	.item-price {
		text-align: right;
	}
	.list-item .grp-line {
		flex-basis: 100%;
		height: 2px;
	}

	.item-table .row > div.url {
		text-align: right
	}
	.item-table .row > div.flags {
		text-align: left
	}

	.link-icon {
		display: inline-block;
		width: 24px;
		height: 24px;
		background-color: transparent;
		background: url('../assets/external-link-symbol.svg');
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 75%;
		border-radius: 3px;
	}
	.link-icon:hover {
		background-color: rgba(0,0,0,0.1);
	}

</style>