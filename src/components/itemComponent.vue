<template>
	<tr class="list-item" v-bind:key="index">
  	  <td class="sel">{{index +1}}</td>
	  <td><groupSelect v-bind:item="newItem" /></td>	  
	  <td>{{newItem.id}}<input type="text" class="item-name" v-model="newItem.name" placeholder="Name" /></td>
  	  <td class="specs"><textarea class="item-specs" v-model="newItem.specs" placeholder="Specs" /></td>
  	  <td class="url"><input type="text" class="item-url" v-model="newItem.url" placeholder="URL" /></td>		
	  <td><input type="text" class="item-weight" v-model="newItem.weight" placeholder="Wt" /></td>
	  <td><input type="text" class="item-qty" v-model="newItem.qty" placeholder="Qty" /></td>
	  <td>$<input type="text" class="item-price" v-model="newItem.price" placeholder="Price" /></td>
	  <td class="del"><b @click="removeItem(newItem.id)">X</b></td>
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
			newItem: {}
		}
	},
	mounted() {
		this.newItem = {...this.item};
	},
	computed: {

	},
	methods: {
	}
}
</script>