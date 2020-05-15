<template>
	<div class="group-panel">
		Groups:
		<div class="group-buttons">
			<div v-for="group of groups" :key="group.id">
				<a @click="toggleGroup(group.id)" class="btn" v-bind:class="{'visible': group.visible}" v-bind:style="{backgroundColor: group.color}" >{{group.name}}</a>
			</div>
			<a class="btn" @click="newGroup">+</a>
			<a class="btn edit" @click="editMode"></a>
			<a class="btn" @click="toggleUnset"  v-bind:class="{'visible': unset}">Ungrouped</a>
		</div>
		<div class="group-edit" v-bind:class="{'show' : editing}">
			<a class="close" @click="closeEdit">X</a>
			Edit Groups: <br/>
			<div v-for="group of groups" :key="group.id" v-bind:style="{color: group.color}">
				{{group.name}} <a class="btn delete" @click="deleteGroup(group.id)">X</a>
			</div>
		</div>
	</div>
</template>



<script>

export default {
	name: 'groupPanel',
	data() {
		return {
			editing: false,
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
		},
		newGroup() {
			this.$store.commit('newGroup');
		},
		editMode() {
			this.editing = !this.editing;
		},
		closeEdit() {
			this.editing = false;
		},
		deleteGroup(groupId) {
			this.$store.commit('deleteGroup', groupId);
		},
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
	.btn.edit {
		background-image: url('../assets/Edit_icon.svg');
		background-repeat: no-repeat;
		background-position: 50% 50%;
	    background-size: 20px;		
	    width: 16px;
	    height: 20px;
	}
	.group-edit {
		display: none;
		position: relative;
		max-width: 200px;
		border: 1px solid #999;
		border-radius: 3px;
		padding: 4px;
		margin-top: 4px;
	}
	.group-edit.show {
		display: block;
	}
	.group-edit .close {
		position: absolute;
		display: block;
		top: 2px;
		right: 2px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}
	.group-edit .delete {
		color: #b32400;
	}

</style>