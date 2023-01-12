<template>
  <elevator-place-component :actual-set="actualSet"/>
   <elevator-settings-component @actual-set="checkActualSet($event)"/>
</template>

<script>
import ElevatorSettingsComponent from "./components/ElevatorSettingsComponent.vue";
import ElevatorPlaceComponent from "./components/ElevatorPlaceComponent.vue";
export default {
  components: {ElevatorSettingsComponent, ElevatorPlaceComponent},
  data() {
    return {
      actualSet: {}
    }
  },

  methods: {
    checkActualSet (ev)  {
      this.actualSet = ev
    }
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
  width: 100%;
  display: flex;
  align-items: flex-start;
}

ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
