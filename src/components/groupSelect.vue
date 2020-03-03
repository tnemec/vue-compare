<template>
	<div id="group-select">
	{{item.id}}
		<div v-for="(group, index) of groups">
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
			return this.item.groups && this.item.groups.indexOf(groupId) !== -1;
		},
		toggleChecked(groupId) {
			if(this.isMember(groupId)) {
				this.$store.commit('removeFromGroup', {groupId, itemId: this.item.id});
			} else {
				this.$store.commit('addToGroup', {groupId, itemId: this.item.id});
			}
		}
	}
}
</script>