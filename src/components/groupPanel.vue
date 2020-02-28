<template>
	<div id="group-panel">
		<div v-for="(group, index) of groups">
			<a @click="toggleGroup(index)" class="btn" v-bind:class="{'visible': group.visible}" >{{group.name}} {{group.visible}}</a>
		</div>
	</div>
</template>



	<script>

export default {
	name: 'groupPanel',
	data() {
		return {
			
		}
	},
	mounted() {

	},
	computed: {
		groups(){
			return this.$store.state.groups;
		},
	},
	methods: {
		toggleGroup(index) {
			this.$store.commit('toggleGroupVisibility', index);
		}
	}
}
</script>