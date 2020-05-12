<template>
	<div class="group-panel">
		Groups:
		<div class="group-buttons">
			<div v-for="group of groups">
				<a @click="toggleGroup(group.id)" class="btn" v-bind:class="{'visible': group.visible}" >{{group.name}}</a>
			</div>
			<a class="btn" @click="toggleUnset()"  v-bind:class="{'visible': unset}">Ungrouped</a>
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
		unset() {
			return this.$store.state.unset;
		},
	},
	methods: {
		toggleGroup(index) {
			this.$store.commit('toggleGroupVisibility', index);
		},
		toggleUnset() {
			this.$store.commit('toggleUnset');
		}
	}
}
</script>

<style>
	.group-panel {
		margin-bottom: 4px;
	}

	.group-panel .group-buttons {
		display: flex;
	}

	.group-panel .group-buttons .btn {
		padding: 2px 6px;
		margin: 0 4px;
		display: inline-block;
		background-color: #DDD;
		color: #333;
	}

	.group-panel .group-buttons .btn.visible {
		padding: 2px 6px;
		background-color: #19b0d2;
		color: #FFF;
	}
</style>