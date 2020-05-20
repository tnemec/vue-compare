<template>
	<div class="group-panel panel">
		<div class="title">Groups</div>
		<div class="top-row group-buttons">
			<a class="btn" @click="newGroup">+</a>
			<a class="btn edit" @click="editMode">Edit</a>			
		</div>
		<div class="group-buttons">
			<div v-for="group of groups" :key="group.id">
				<ColorBtn @click.native="toggleGroup(group.id)" v-bind:baseColor="group.color" v-bind:disabled="!group.visible">{{group.name}}</ColorBtn>
			</div>

			<a class="btn" @click="toggleUnset"  v-bind:class="{'disabled': !unset}">Ungrouped</a>
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
import ColorBtn from './colorButton'
import utilities from '../utilities'

export default {
	name: 'groupPanel',
	components: {swatches, ColorBtn},
	data() {
		return {
			editing: false,
			tempGroup: {id: undefined},
		}
	},
	mixins: [
		utilities,
	],
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
			this.$store.commit('newGroup', this.randomRGBColor());
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

	.group-panel .group-buttons .btn.disabled {
		background: #999 !important;
		color: #665;
		text-shadow: none !important;
		box-shadow: none !important;	
	}

	.btn.edit {
		background: url('../assets/Edit_icon_light.svg'), linear-gradient(to bottom, #848e91 5%, #545759 100%);	
		background-repeat: no-repeat;
		background-position: 50% 50%;
	    background-size: 26px;		
	    text-indent: -999px;
	    min-width: 14px;
	}
	.group-edit {
		display: none;
		position: relative;
		max-width: 200px;
		color: #333;
		background: #cccccc;
		border: 1px solid #585858;
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
		color: #333;
	    font-size: 20px;
		line-height: 20px;
		text-align: center;
	}
	.group-edit .btn {
		font-size: 14px;
		padding: 0 4px;
		margin-right: 2px;
		background: none;
		background-color: none;
		border: none;
		box-shadow: none;
		text-shadow: none;
		color: #333;
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