<template>
	<div class="group-select">
		<div class="item" v-for="(group, index) of groups"  v-bind:key="group.id">
			<Checkbox v-bind:checked="isMember(group.id)" @clicked="toggleChecked(group.id)" v-bind:labelColor="isMember(group.id) ? group.color : 'transparent'">{{group.name}}</Checkbox>
		</div>
	</div>
</template>



<script>
import Checkbox from './Checkbox'
import utilities from '../utilities'

export default {
	name: 'groupSelect',
	props: ['item'],
	components: {Checkbox},
	mixins: [utilities],
	data() {
		return {
		}
	},
	mounted() {
 
	},
	computed: {
		groups() {
			return this.$store.getters.getGroups;
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
			let groups = [...this.item.groups];
			if(this.isMember(groupId)) {
				// remove
				groups = groups.filter( grp => grp !== groupId) || [];
			} else {
				// add
				groups.push(groupId);
			}
			this.$parent.updateGroup(groups);
		},
	}
}
</script>

<style>
	.group-select {
		display: flex;
		flex-wrap: wrap;
	}
	.group-select .item {
/*		white-space: nowrap;*/
		margin-right: 3px;
		text-align: left;
	}
	.group-select .label {
		padding: 1px 3px;
	}
</style>