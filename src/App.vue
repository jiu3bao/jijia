<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
   get token() {
      return this.$store.state.token
   }

   @Watch('token')
   watchtoken(val) {
     console.log(val)
   }
}
</script>

<style>
   @import "./style/base.less"
   
</style>