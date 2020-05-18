<template>
	<tr class="list-item">
  	  <td class="sel">
  	  	<div class="flex">
  	  		<input type="checkbox" id="{ 'activeCheckbox' + index}" v-bind:checked="newItem.enabled" @click.prevent:="toggleEnabled"> {{index +1}}
  	  	</div>
  	  </td>
	  <td><groupSelect v-bind:item="newItem" /></td>	  
	  <td><input type="text" class="item-name" v-model="newItem.name" placeholder="Name" @blur="updateItem" /></td>
  	  <td class="specs"><textarea class="item-specs" v-model="newItem.specs" placeholder="Specs" @blur="updateItem" /></td>
  	  <td class="url"><input type="text" class="item-url" v-model="newItem.url" placeholder="URL" @blur="updateItem" /></td>		
	  <td><input type="text" class="item-weight" v-model="newItem.weight" placeholder="Wt" @blur="updateItem" @focus="select" /></td>
	  <td><input type="text" class="item-qty" v-model="newItem.qty" placeholder="Qty" @blur="updateItem" @focus="select" /></td>
	  <td>$<input type="text" class="item-price" v-model="newItem.price" placeholder="Price" @blur="updateItem" @focus="select" /></td>
	  <td class="del"><b class="delete" @click="removeItem">X</b></td>
	</tr>
</template>



	<script>

	import groupSelect from '../components/groupSelect';

export default {
	name: 'itemComponent',
	props: ['item', 'index'],
	components: {
		groupSelect,
	},
	data() {
		return {
			newItem: {...this.item},
		}
	},
	methods: {
		toggleEnabled() {
			this.$store.commit('toggleItemEnabled', this.newItem.id);
		},
		updateItem() {
			this.$store.commit('updateItem', this.newItem);
		},
		removeItem() {
			this.$store.commit('removeItem', this.newItem.id);
		},
		select(evt) {
			evt.target.select();
		},
		updateGroup(groupArray) {
			// used for group select child element to update the current newItem
			this.newItem.groups = groupArray;
			this.$store.commit('updateItem', this.newItem);
		}
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
		max-width: 50px;
		text-align: right;
	}

</style>