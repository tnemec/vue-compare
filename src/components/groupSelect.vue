<template>

	<div id="group-select">
	{{itemIndex}}
		<div v-for="(group, index) of groups">
			<input type="checkbox" value="null" v-bind:checked="isMember(index)" @click.prevent:="toggleChecked(index)">{{group.name}}
		</div>
	</div>
</template>



	<script>

export default {
	name: 'groupSelect',
	props: ['itemIndex'],
	data() {
		return {
			
		}
	},
	mounted() {
 
	},
	computed: {
		groups() {
			return this.$store.state.groups;
		},

	},
	methods: {
		toggleGroup(index) {
			this.$store.commit('toggleGroupVisibility', index);
		},
		isMember(groupIndex) {
			let item = this.$store.state.items[this.itemIndex];
			return item && item.groups && item.groups.indexOf( groupIndex ) !== -1;
		},
		toggleChecked(groupIndex) {
			if(this.isMember(groupIndex)) {
				this.$store.commit('removeFromGroup', {groupIndex, itemIndex: this.itemIndex});
			} else {
				this.$store.commit('addToGroup', {groupIndex,  itemIndex: this.itemIndex});
			}
		}
	}
}
</script>