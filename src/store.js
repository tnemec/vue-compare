import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	items: [],
  	groups: [
  		{id: 0, name: 'G1', visible: true},
  		{id: 1, name: 'G2', visible: true},
  	],
  	unset: true, // should show items that are not in any groups
  	suppliers: {},
  	baseItem: {name:'',id:0,url:'',specs:'',qty:1,price:0,weight:0,groups:[0],attributes:[],supplier:null,enabled:true},
  },
  getters: {
  	filteredItems(state) {
  		let visibleGroups = state.groups.filter( group => group.visible);

  		return state.items.filter(item => {
  			for( let i = 0; i < visibleGroups.length; i++) {
  				if(item.groups.indexOf(visibleGroups) !== -1) {
  					return item
  				}
  			}
  			// return items with no groups selected if unset is true
  			return state.unset ? item : undefined;
  		});
  	},
  	getItem: (state) => (itemId) => {
		return state.items.find( item => item.id === itemId);
	},
	getItemIndex: (state)  => (itemId) => {
		state.items.map( (item, index) => {
			if(item.id === itemId) {
				return index;
			}
			return -1;
		})
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
	addItem(state) {
		let item = {...state.baseItem}
		item.id = Date.now();
		state.items = [...state.items, item]
	},
	removeItem(state, itemId) {
		state.items = state.items.filter(item => item.id !== itemId);
	},
	removeAllItems(state) {
		state.items = [];
	},
	newGroup(state) {
		state.groups = [...{id: Date.now(), name: 'new group', visible: true}];
	},
	addToGroup(state, payload) {
		let itemIndex = state.items.findIndex( i => i.id === payload.itemId);
		console.log(itemIndex)
		if(itemIndex !== -1) {
			let item = {...this.getters.getItem(payload.itemId)};
			item.groups = [...item.groups, payload.groupId];
			state.items[itemIndex] = item;
		}
	},
	removeFromGroup(state, payload) {
		let item = this.getters.getItem(payload.itemId);
		item.groups.splice(item.groups.indexOf(payload.groupId), 1);
		state.items[this.getters.getItemIndex(payload.itemId)] = item;
	},
	toggleGroupVisibility(state, groupIndex) {
		state.groups[groupIndex].visible = !state.groups[groupIndex].visible;
	}

  },
  actions: {

  }
})
