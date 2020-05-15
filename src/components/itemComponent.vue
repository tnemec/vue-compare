<template>
	<tr class="list-item" v-bind:key="index">
  	  <td class="sel">
  	  	<div class="flex">
  	  		<input type="checkbox" id="{ 'activeCheckbox' + index}" v-bind:checked="item.enabled" @click.prevent:="toggleEnabled(item.id)"> {{index +1}}
  	  	</div>
  	  </td>
	  <td><groupSelect v-bind:item="newItem" />{{item.groups}} {{newItem.groups}}</td>	  
	  <td><input type="text" class="item-name" v-model="newItem.name" placeholder="Name" @blur="updateItem" /></td>
  	  <td class="specs"><textarea class="item-specs" v-model="newItem.specs" placeholder="Specs" @blur="updateItem" /></td>
  	  <td class="url"><input type="text" class="item-url" v-model="newItem.url" placeholder="URL" @blur="updateItem" /></td>		
	  <td><input type="text" class="item-weight" v-model="newItem.weight" placeholder="Wt" @blur="updateItem" @focus="select" /></td>
	  <td><input type="text" class="item-qty" v-model="newItem.qty" placeholder="Qty" @blur="updateItem" @focus="select" /></td>
	  <td>$<input type="text" class="item-price" v-model="newItem.price" placeholder="Price" @blur="updateItem" @focus="select" /></td>
	  <td class="del"><b class="delete" @click="removeItem(item.id)">X</b></td>
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
		toggleEnabled(id) {
			this.$store.commit('toggleItemEnabled', id);
		},
		updateItem() {
			this.$store.commit('updateItem', this.newItem);
		},
		removeItem(id) {
			this.$store.commit('removeItem', id);
		},
		select(evt) {
			evt.target.select();
		},
		updateParentGroups(evt, groupArray) {
			// used for group select child element to update the current newItem
			this.newItem.groups = groupArray;
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