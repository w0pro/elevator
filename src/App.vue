<template>
  <div id="app">
   <elevator-settings-component/>
  </div>
</template>

<script>
import ElevatorSettingsComponent from "./components/ElevatorSettingsComponent.vue";
export default {
  components: {ElevatorSettingsComponent},
  data() {
    return {
      message: 'Hello World',
    };
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
  width: 100%;
}
</style>
