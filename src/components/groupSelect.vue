<template>
	<div class="group-select">
		<div v-for="(group, index) of groups"  v-bind:style="{color: group.color}">
			<input type="checkbox" value="null" v-bind:checked="isMember(group.id)" @click.prevent:="toggleChecked(group.id)">{{group.name}}
		</div>
	</div>
</template>



<script>

export default {
	name: 'groupSelect',
	props: ['item'],
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
		isMember(groupId) {
			return this.item  && this.item.groups.indexOf(groupId) !== -1;
		},
		toggleChecked(groupId) {
			let i = {...this.item};
			if(this.isMember(groupId)) {
				// remove
				i.groups = this.item.groups.filter( grp => grp !== groupId) || [];
			} else {
				// add
				i.groups.push(groupId);
			}
			this.$store.commit('updateItem', i);
			this.$emit('updateParentGroups', i.groups)
		}
	}
}
</script>

<style>
	.group-select {
		display: flex;
	}
</style>