<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary"></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeView',
  setup() {
    let obj: any = { name: 'demo' };
    let firstName = obj.name;
    obj.name = null;
    console.log(firstName);
    // let obj: any = { name: 'demo' };
    // let ws = new WeakSet();
    // ws.add(obj);
    // obj = null;
    // console.log(ws);
  },
});
</script>
