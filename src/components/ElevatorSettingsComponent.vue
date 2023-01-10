<template>
  <div class="elevator-settings">
    <input type="number" placeholder="Количество этажей" name="" id="">
    <input type="number" placeholder="Количество лифтов" name="" id="">

  </div>

</template>

<script>
export default {
  name: "ElevatorSettingsComponent",
  data() {
    return {
      countElevators: 1,
      countFloors: 5
    }
  }
}
</script>

<style scoped>
.elevator-settings {
  width: 300px;
  height: 250px;
  background-color: aquamarine;
}

</style>
