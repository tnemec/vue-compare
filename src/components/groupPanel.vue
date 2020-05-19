<template>
	<div class="group-panel">
		Groups:
		<div class="group-buttons">
			<div v-for="group of groups" :key="group.id">
				<a @click="toggleGroup(group.id)" class="btn grp" v-bind:class="{'disabled': !group.visible}" v-bind:style="{backgroundColor: group.color}" >{{group.name}}</a>
			</div>
			<a class="btn" @click="newGroup">+</a>
			<a class="btn edit" @click="editMode"></a>
			<a class="btn" @click="toggleUnset"  v-bind:class="{'visible': unset}">Ungrouped</a>
		</div>
		<div class="group-edit" v-bind:class="{'show' : editing}">
			<a class="close" @click="closeEdit">&times;</a>
			Edit Groups: <br/>
			<div v-for="group of groups" :key="group.id" v-bind:style="{color: group.color}">
				{{group.name}} 
				<a class="btn" @click="toggleRename(group.id)">Rename</a>
				<swatches v-bind:startColor="group.color" v-bind:groupId="group.id" @updateColor="updateColor" />
				<a class="btn delete" @click="deleteGroup(group.id)">Delete</a>
				<div class="rename-dialog" v-bind:class="{'visible' : tempGroup.id === group.id}">
					<input type="text" v-model="tempGroup.name"> 
					<a class="btn" @click="updateGroup">&#10003;</a>
					<a class="btn" @click="finishTempGroup">&times;</a>
				</div>
			</div>
		</div>
	</div>
</template>



<script>
import swatches from './swatches.vue'

export default {
	name: 'groupPanel',
	components: {swatches},
	data() {
		return {
			editing: false,
			tempGroup: {id: undefined},
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
		}
	},
	methods: {
		toggleGroup(groupID) {
			this.$store.commit('toggleGroupVisibility', groupID);
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
		updateColor(payload) {
			this.tempGroup = {...this.groups.find( g => g.id === payload.id), color: payload.color, id: payload.id};
			this.updateGroup();
		},
		deleteGroup(groupId) {
			this.$store.commit('deleteGroup', groupId);
		},
		toggleRename(groupId) {
			this.tempGroup = {...this.groups.find( g => g.id === groupId)};
		},
		updateGroup() {
			if(this.tempGroup.id !== undefined){
				this.$store.commit('updateGroup', this.tempGroup);
			}
			this.finishTempGroup();
		},
		finishTempGroup() {
			this.tempGroup = {id: undefined};
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
	.group-panel .group-buttons .btn.grp {
		background-color: #19b0d2;
		color: #FFF;		
	}

	.group-panel .group-buttons .btn.disabled {
		background-color: #999 !important;
		color: #665;		
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
	    font-size: 20px;
		line-height: 20px;
		text-align: center;
	}
	.group-edit .btn {
		font-size: 14px;
		padding: 0 4px;
		margin-right: 2px;
	}
	.group-edit .delete {
		color: #b32400;
	}

	.group-edit .rename-dialog {
		display: none;
	}
	.group-edit .rename-dialog.visible {
		display: flex;
	}
	.group-edit .rename-dialog .btn {
		width: 16px;
		height: 16px;
		text-align: center;
		line-height: 16px;
	}

</style>