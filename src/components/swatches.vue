<template>
  <div style="display: inline-block">
    <v-swatches v-model="color" :swatches="swatches" :swatch-style="swatchStyle" :trigger-style="triggerStyle"></v-swatches>
  </div>
</template>
 
<script>
  import VSwatches from 'vue-swatches'
  import utilities from '../utilities'
 
  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.css"
 
  export default {
    name: 'swatches',
    components: { VSwatches }, 
    props: ['startColor', 'groupId'],
    mixins: [utilities],
    data () {
      return {
        color: this.startColor,
        swatches: [],
        swatchStyle: {
          width: '24px',
          height: '24px',
          border: 'none',
          borderRadius: '0'
        },
        triggerStyle : {
          width: '12px',
          height: '12px',
          border: 'none',
          borderRadius: '0'          
        }
      }
    },
    mounted() {
      // create some random colors
      const numColors = 24;
      let arr = [];
      for(let i = 0; i < numColors; i++) {
        arr.push(this.randomHexColor());
      }
      this.swatches = arr;
      this.thisGroupId = this.groupId
    },
    watch: {
      color(value) {
        this.$emit('updateColor', {color: value, id: this.groupId});
      }
    }
  }
</script>

<style>

</style>