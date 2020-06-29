<template>
	<div class="list-item">
	   <div class="row">
	  	  <div class="col1 sel">
	  	  		{{index +1}}.
	  	  </div>  
	  	  <div class="groups">
	  	  	<div v-for="groupId in itemGroups">{{getGroup(groupId).name}}</div>
	  	  </div>
		  <div class="col-name">{{item.name}}</div>
	  	  <div class="col-specs ">
	  	  	{{item.specs}}
	  	  </div>
	  	  <div class="col-flags flags">
	  	  	<div v-for="key in Object.keys(item.flags)" v-if="item.flags[key]">{{key}}</div>
	  	  </div>	  	  
	  	  <div class="col-link url">{{shortUrl}}
	  	  	<a class="link-icon" v-if="item.url" v-bind:href="item.url" target="_blank" rel="external"></a>
	  	  </div>		
	  	  <div class="col-supplier">{{item.supplier}}</div>	  	  
		  <div class="col-wt">Wt. {{item.weight}}</div>
		  <div class="col-qty">Qty. {{item.qty}}</div>

		  <div class="col-price">{{priceFormatted}}</div>
	  </div>
	</div>
</template>



	<script>
	import utilities from '../utilities'

export default {
	name: 'BomItem',
	props: ['item', 'index'],
	mixins: [utilities],
	components: {
	},
	data() {
		return {
			priceFormatted: this.$options.filters.currency(parseFloat(this.item.price)),
		}
	},
	computed: {
		itemGroups() {
			return this.item.groups.sort( (a,b) => a.id - b.id);
		},
		shortUrl() {
			return this.item.url.replace(/[^/]+\/\/([^/]+)\/.+/gi, '$1');
		}

	},
	methods: {
		updateSupplier() {
			this.updateItem();
			// close the autocomplete component
			setTimeout(() => {
				this.showAutocomplete = false;
			}, 150);
		},
		toggleFlag(key) {
			this.item.flags[key] = !this.item.flags[key];
			this.$store.commit('updateItem', this.newItem);
		},
		getGroup(id) {
			return this.$store.state.groups.find( group => group.id == id)
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