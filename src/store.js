import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const randomColor = () => {
	// return random hex color but only darker colors.
	const makeColor = () => {
		return Math.floor(Math.random() * 120);
	}
	let color = '';
	for( let i = 0; i < 2; i++) {
		color += makeColor();
	}
	return '#' + color.toString(16);
};

export default new Vuex.Store({
  state: {
  	items: [],
  	groups: [
  		{id: 0, name: 'G1', color: '#5A7D7C', visible: true},
  		{id: 1, name: 'G2', color: '#E76F51', visible: true},
  	],
  	unset: false, // should show items that are not in any groups
  	suppliers: {},
  	baseItem: {name:'',id:0,url:'',specs:'',qty:1,price:0,weight:0,groups:[0],attributes:[],supplier:null,enabled:true},
  },
  getters: {
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
	},
	filteredItems(state){
	let groups = state.groups;
		if(groups && state.items) {
			return state.items.filter(item => {
				let show = false;
				for( let i = 0 ; i < groups.length; i++ ) {
					if (groups[i].visible && item.groups && item.groups.indexOf(groups[i].id) !== -1) {
						show = true;
					}
				}
				// return items with no groups selected if unset is true
				return show || state.unset;
			});
		}
	},
  },
  mutations: {
	initialiseStore(state) {
		// Check if the ID exists
		
		if(localStorage.getItem('vueCompare-store')) {
			this.replaceState(
				Object.assign(state, JSON.parse(window.localStorage.getItem('store')))
			);
		}
		
	},
	clearLocalStorage(state) {
		window.localStorage.removeItem('vueCompare-store');

	},
	addItem(state) {
		let item = {...state.baseItem}
		item.id = Date.now();
		state.items = [...state.items, item]
	},
	updateItem(state, item) {
		state.items.splice(state.items.findIndex(i => i.id === item.id), 1, item);
	},
	removeItem(state, itemId) {
		state.items = state.items.filter(item => item.id !== itemId);
	},
	removeAllItems(state) {
		state.items = [];
	},
	newGroup(state) {
		state.groups.push({id: Date.now(), name: 'G' + (state.groups.length + 1), color: randomColor(), visible: true});
	},
	deleteGroup(state, groupId) {
		state.items = state.items.map( item => {
			item.groups = item.groups.filter( group => group.id !== groupId);
		});
		state.groups = state.groups.filter( group => group.id !== groupId);
	},
	addToGroup(state, payload) {
		let itemIndex = state.items.findIndex( i => i.id === payload.itemId);
		if(itemIndex !== -1) {
			let item = {...this.getters.getItem(payload.itemId)};
			item.groups = [...item.groups, payload.groupId];
			state.items.splice(itemIndex, 1, item);
		}
	},
	removeFromGroup(state, payload) {
		let itemIndex = state.items.findIndex( i => i.id === payload.itemId);
		if(itemIndex !== -1) {
			let item = {...this.getters.getItem(payload.itemId)};
			item.groups = item.groups.filter( group => group !== payload.groupId);
			state.items.splice(itemIndex, 1, item);
		}
	},
	toggleGroupVisibility(state, groupIndex) {
		state.groups[groupIndex].visible = !state.groups[groupIndex].visible;
	},
	toggleUnset(state) {
		state.unset = !state.unset;
	},
	toggleItemEnabled(state, itemId) {
		let itemIndex = state.items.findIndex( i => i.id === itemId);
		if(itemIndex !== -1) {
			let item = {...this.getters.getItem(itemId)};
			item.enabled = !item.enabled;
			state.items.splice(itemIndex, 1, item);
		}
	}

  },
  actions: {

  }
})
