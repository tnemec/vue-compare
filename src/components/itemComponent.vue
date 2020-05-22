<template>
	<div class="list-item">
	  <div class="grp-line" v-for="group in groups" :style="{backgroundColor: groupColor(group)}"></div>
	   <div class="row">
	  	  <div class="col1 sel">
	  	  		<Checkbox v-bind:checked="item.enabled" @click.native.prevent="toggleEnabled">{{index +1}}</Checkbox>
	  	  </div>
		  <div class="col2"><groupSelect v-bind:item="newItem" /></div>	  
		  <div class="col3"><input type="text" class="item-name" v-model="newItem.name" placeholder="Name" @blur="updateItem" /></div>
	  	  <div class="col4 specs"><textarea class="item-specs" v-model="newItem.specs" placeholder="Specs" @blur="updateItem" /></div>
	  	  <div class="col5 url"><input type="text" class="item-url" v-model="newItem.url" placeholder="URL" @blur="updateItem" /></div>		
		  <div class="col6"><input type="text" class="item-weight" v-model="newItem.weight" placeholder="Wt" @blur="updateItem" @focus="select" /></div>
		  <div class="col7"><input type="text" class="item-qty" v-model="newItem.qty" placeholder="Qty" @blur="updateItem" @focus="select" /></div>
		  <div class="col8"><input type="text" class="item-price" v-model="priceFormatted" placeholder="Price" @blur="updateItem" @focus="selectPrice" /></div>
		  <div class="col9 del"><b class="delete" @click="removeItem">X</b></div>
	  </div>
	</div>
</template>



	<script>

	import groupSelect from './groupSelect'
	import Checkbox from './Checkbox'
	import utilities from '../utilities'

export default {
	name: 'itemComponent',
	props: ['item', 'index'],
	mixins: [utilities],
	components: {
		groupSelect,
		Checkbox,
	},
	data() {
		return {
			newItem: {...this.item},
			priceFormatted: this.$options.filters.currency(this.item.price),
		}
	},
	computed: {
		groups() {
			return this.newItem.groups.sort();
		}
	},
	methods: {
		toggleEnabled() {
			this.$store.commit('toggleItemEnabled', this.newItem.id);
		},
		updateItem() {
			this.newItem.price = parseFloat(this.priceFormatted);
			this.priceFormatted = this.$options.filters.currency(this.priceFormatted);
			this.$store.commit('updateItem', this.newItem);
		},
		removeItem() {
			this.$store.commit('removeItem', this.newItem.id);
		},
		select(evt) {
			evt.target.select();
		},
		selectPrice(evt) {
			this.priceFormatted = this.priceFormatted.replace(/[^0-9|.]+/g,'');
			evt.target.select();
		},
		updateGroup(groupArray) {
			// used for group select child element to update the current newItem
			this.newItem.groups = groupArray;
			this.$store.commit('updateItem', this.newItem);
		},
		groupColor(groupId) {
			return this.$store.state.groups.find( g => g.id === groupId).color;
		},

	}
}
</script>

<style>
	.list-item .flex{
		display: flex;
		flex-direction: row;
	}

	.item-weight, .item-qty {
		max-width: 30px;
		text-align: right;
	}
	.item-price {
		text-align: right;
	}
	.list-item .grp-line {
		flex-basis: 100%;
		height: 2px;
	}

</style>