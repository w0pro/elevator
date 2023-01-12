<template>
  <div class="elevator-settings">
    <input type="number" placeholder="Количество этажей" name="" id="" v-model="starterParam.countFloors">
    <input type="number" placeholder="Количество лифтов" name="" id="" v-model="starterParam.countElevators">

  </div>

</template>

<script>
export default {
  name: "ElevatorSettingsComponent",
  beforeMount() {
    this.$nextTick (() => {
      this.$emit('actualSet', this.starterParam)
    })
  },

  data() {
    return {
      starterParam : {
        countElevators: 1,
        countFloors: 5
      }
    }
  },

  watch: {
    starterParam: {
      handler: function (newVal, oldVal) {
        if (newVal) {
       this.$emit('actualSet', this.starterParam)
        }
      },
      deep: true
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
