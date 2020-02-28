import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	items: [],
  	groups: [
  		{name: 'G1', visible: true},
  		{name: 'G2', visible: true},
  	],
  	unset: true, // should show items that are not in any groups
  	suppliers: {},
  	baseItem: {name:'',id:'',url:'',specs:'',qty:1,price:0,weight:0,groups:[0],attributes:[],supplier:null,enabled:true},
  },
  getters: {
  	getItem: (state) => (itemIndex) => {
  		return state.items[itemIndex];
  	},
  	visibleGroups(state) {
  		return state.groups;
  	},
  	filteredItems(state) {
  		return state.items.filter(item => {
  			for(let i = 0; i < state.groups.length; i++) {
  				return (state.groups[i].visible) ? item.groups.indexOf(i) !== -1 : false;
  			}
  			// return items with no groups selected if unset is true
  			return state.unset;
  		});
  	}
  },
  mutations: {
	initialiseStore(state) {
		// Check if the ID exists
		/*
		if(localStorage.getItem('store')) {
			this.replaceState(
				Object.assign(state, JSON.parse(window.localStorage.getItem('store')))
			);
		}
		*/
	},
	clearLocalStorage(state) {
		window.localStorage.removeItem('store');

	},
	addItem(state, item) {
		item.id = state.items.length;
		state.items.push(item);
	},
	removeItem(state, itemId) {
		state.items = state.items.filter(item => item.id !== itemId);
	},
	removeAllItems(state) {
		state.items = [];
	},
	newGroup(state) {
		state.groups.push({name: 'new group', visible: true});
	},
	addToGroup(state, payload) {
		let item = {...state.items[payload.itemIndex]};
		item.groups.push(payload.groupIndex);
		state.items = state.items.splice(payload.itemIndex, 1, item); // this doesn't work!
	},
	removeFromGroup(state, payload) {
		state.items[payload.itemIndex].groups.splice(payload.groupIndex, 1);
	},
	toggleGroupVisibility(state, groupIndex) {
		state.groups[groupIndex].visible = !state.groups[groupIndex].visible;
	}

  },
  actions: {

  }
})
