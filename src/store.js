import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const localStorageKey = 'vueCompare-store'; // sets the name of the key used in localStorage object

export default new Vuex.Store({
  state: {
  	items: [],
  	groups: [
  		{id: 0, name: 'Group 1', color: 'rgb(47, 113, 115)', visible: true},
  		{id: 1, name: 'Group 2', color: 'rgb(231, 111, 81)', visible: true},
  	],
  	unset: true, // should show items that are not in any groups
  	suppliers: [],
  	filterByFlags: {
  		'Ordered': false,
  		'Received': false,
  		'Complete': false,
  	},
  	filterBySupplier: null,
  	baseItem: {name:'',id:0,url:'',specs:'',qty:1,price:0,weight:0,groups:[0],flags:{
  		'Ordered': false,
  		'Received': false,
  		'Complete': false,
  	},supplier:null,enabled:true},
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
	getGroups(state) {
		return state.groups.sort( (a,b) => a.id - b.id);
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
					// include ungrouped items
					show = show || state.unset; 

					// supplier filters
					if(state.filterBySupplier !== null && state.filterBySupplier !== item.supplier) {
						show = false;
					}

					// flag filter
					let allFlagsFalse = true;
					for(let key of Object.keys(state.filterByFlags)) {
						if(state.filterByFlags[key]) {
							allFlagsFalse = false;
							break;
						}
					}
					if(! allFlagsFalse) {
						// filter only if at least one flag is true
						for(let key of Object.keys(state.filterByFlags)) {
							show = item.flags[key] && state.filterByFlags[key];
							if(show) {
								// as soon as one flag is true, show the item
								break;
							}
						}						
					}

				}
				return show;
			});
		}
	},
	groupFilterActive(state) {
		return state.groups.filter( group => !group.visible ).length;
	},
	ungroupedItems(state) {
		return state.items.filter( item => !item.groups.length ) || [];
	},
	getSuppliers(state) {
		return state.suppliers;//.sort();
	},
	getFlagFilters(state) {
		return state.filterByFlags;
	}
  },
  mutations: {
	initialiseStore(state) {
		// restore state from the browser's localStorage object
		
		if(localStorage.getItem(localStorageKey)) {
			try {
				this.replaceState(
					Object.assign(state, JSON.parse(window.localStorage.getItem(localStorageKey)))
				);
				console.log('state initialzed from localStorage')
			} catch(e) {
				console.log("Error: failed to initialze state from LocalStorage: " + e)
			}
		}
		
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
		// build suppliers list with only used supplier names
		const suppliers = state.items.map( (item) => {
			if(item.supplier !== '') {
				return item.supplier;
			}
		});
		state.suppliers = [ ...new Set(suppliers) ]; // filters out duplicates
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
		state.groups = state.groups.filter( group => group.id !== groupId);
	},
	toggleGroupVisibility(state, groupId) {
		const groupIndex = state.groups.findIndex(g => g.id === groupId);
		state.groups[groupIndex].visible = !state.groups[groupIndex].visible;
	},
	showAllGroups(state) {
		const groups = [...state.groups];
		groups.forEach( group => group.visible = true);
		state.groups = groups;
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
	},
	setSupplierFilter(state, supplier) {
		state.filterBySupplier = supplier;
	},
	setFlagFilter(state, flag) {
		if(flag === 'none') {
			state.filterByFlags = {
		  		'Ordered': false,
		  		'Received': false,
		  		'Complete': false,
		  	}
		} else {
			// toggle individual flag
			state.filterByFlags[flag] = !state.filterByFlags[flag]
		}
	}

  },
  actions: {

  }
})
