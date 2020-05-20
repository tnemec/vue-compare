import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const localStorageKey = 'vueCompare-store'; // sets the name of the key used in localStorage object

export default new Vuex.Store({
  state: {
  	items: [],
  	groups: [
  		{id: 0, name: 'G1', color: 'rgb(47, 113, 115)', visible: true},
  		{id: 1, name: 'G2', color: 'rgb(231, 111, 81)', visible: true},
  	],
  	unset: false, // should show items that are not in any groups
  	suppliers: {},
  	baseItem: {name:'',id:0,url:'',specs:'',qty:1,price:0,weight:0,groups:[0],attributes:[],supplier:null,enabled:true},
  },
  getters: {
  	getLocalStorageKey: () => {
  		return localStorageKey;
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
		// restore state from the browser's localStorage object
		
		// if(localStorage.getItem(localStorageKey)) {
		// 	try {
		// 		this.replaceState(
		// 			Object.assign(state, JSON.parse(window.localStorage.getItem(localStorageKey)))
		// 		);
		// 		console.log('state initialzed from localStorage')
		// 	} catch(e) {
		// 		console.log("Error: failed to initialze state from LocalStorage: " + e)
		// 	}
		// }
		
	},
	clearLocalStorage(state) {
		window.localStorage.removeItem(localStorageKey);
	},
	addItem(state) {
		// deep clone baseItem as the template for the new item
		let newItem = JSON.parse(JSON.stringify(state.baseItem));
		newItem.id = Date.now();
		state.items.push(newItem);
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
	newGroup(state, color) {
		state.groups.push({id: Date.now(), name: 'G' + (state.groups.length + 1), color: color, visible: true});
	},
	updateGroup(state, group) {
		state.groups.splice(state.groups.findIndex(g => g.id === group.id), 1, group);
	},
	deleteGroup(state, groupId) {
		state.items = state.items.map( item => {
			item.groups = item.groups.filter( group => group.id !== groupId);
			return item;
		});
		console.log(state.items)
		state.groups = state.groups.filter( group => group.id !== groupId);
	},
	toggleGroupVisibility(state, groupId) {
		const groupIndex = state.groups.findIndex(g => g.id === groupId);
		state.groups[groupIndex].visible = !state.groups[groupIndex].visible;
	},
	toggleUnset(state) {
		state.unset = !state.unset;
	},
	toggleItemEnabled(state, itemId) {
		let itemIndex = state.items.findIndex( i => i.id === itemId);
		if(itemIndex !== -1) {
			let item = {...this.getters.getItem(itemId), };
			item.enabled = !item.enabled;
			state.items.splice(itemIndex, 1, item);
		}
	}

  },
  actions: {

  }
})
