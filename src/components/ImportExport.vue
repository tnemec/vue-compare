<template>
	<div class="import-export panel">
		<div class="title">Import / Export</div>
		<div class="top-row row">
			<a class="btn" @click="getExport">Export Items</a>
			<a class="btn" @click="getImport">Import Items</a>
		</div>
		<div class="message">{{message}}</div>
		<textarea id="output" v-model="output"></textarea>
		<div class="right">
			<a class="btn" @click="copy">Copy</a>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ImportExport',
	data() {
		return {
			output: '',
			message: '',
		}
	},
	methods: {
		getExport() {
			const outputFormat = {
				groups: this.$store.state.groups,
				items: this.$store.state.items
			} 
			this.output = JSON.stringify(outputFormat);
		},
		getImport() {
			try {
				const inputObj = JSON.parse(this.output);
				if(inputObj.items && inputObj.groups) {
					this.$store.commit('importItemsAndGroups', inputObj);
					this.output = '';
				}

			} catch(e) {
				this.message = 'Format incorrect: ' + e;
			}
		},
		copy() {
			const outputEle = document.getElementById('output');
			if(outputEle) {
				outputEle.select();
				document.execCommand("copy");
			}
		}
	}

}

</script>


<style>


</style>