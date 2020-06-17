<template>
	<div class="flag-filter panel">
		<div class="title">Flags</div>
		<div class="top-row">
			<div class="btn" v-if="hasFilter" @click="showAll">Show All</div>
		</div>
		<div class="label">Filter by flags:</div>
		<div class="row">
			<ColorBtn v-for="key in flagFilterKeys" @click.native="selectItem(key)" v-bind:baseColor="key | flagColor | hexToRGB" v-bind:disabled="!flagFilters[key]">{{key}}</ColorBtn>

		</div>
	</div>
</template>

<script>
import utilities from '../utilities'
import ColorBtn from './colorButton.vue'

export default {
	name: 'FlagFilter',
	data() {
		return {
		}
	},
	components: {ColorBtn},
	mixins: [utilities],
	computed: {
		flagFilters() {
			return this.$store.getters.getFlagFilters;
		},
		flagFilterKeys() {
			return Object.keys(this.$store.getters.getFlagFilters);
		},
		hasFilter() {
			let allFlagsFalse = true;
			for(let key of Object.keys(this.$store.getters.getFlagFilters)) {
				if(this.$store.getters.getFlagFilters[key]) {
					allFlagsFalse = false;
					break;
				}
			}
			return !allFlagsFalse
    	},

	}, 
	methods: {
		selectItem(flag) {
			this.$store.commit('setFlagFilter', flag);
		},
		showAll() {
			this.$store.commit('setFlagFilter', 'none');
		},
	},
}
</script>

<style>


</style>