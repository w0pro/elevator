<template>
  <div class="elevators-place" :ref="'place'">
    <ul class="elevators-list">
      <li v-for="elevator in actualSet.countElevators"  class="elevator-box">
        <ul class="floor-box">
          <li v-for="floor in actualSet.countFloors" :ref="`${installButtons(floor)}`" :key="floor" class="floor">
          </li>
          <div class="elevator" :class="{active: elevatorsSet[elevator].status === 'active'}" :ref="'elevator'"
                                :style="{'transition': `${elevatorsSet[elevator].transition}`,
                                         'bottom': `${(elevatorsSet[elevator].state - 1) * 100 + 'px'}`}">
          </div>
        </ul>
      </li>
    </ul>
    <ul class="buttons-elevators__wrapper">
      <li v-for="button in actualSet.countFloors" class="button-elevator__box" :key="button">
        <div class="button">
          <span>{{installButtons(button)}}</span>
          <button class="button-click" @click="elevatorController(installButtons(button))"></button>
        </div>

      </li>

    </ul>

  </div>

</template>

<script>
export default {
  name: "ElevatorPlaceComponent",
  props: {
    actualSet: {
      type: Object
    }
  },

  data() {
    return {
      elevatorsSet : {},
      callQueue: [],
      timeData : {},
      counterClicker: 0,
      status: ''
    }
  },

  watch: {
    actualSet: {
      handler: function (newVal) {
        if (newVal) {
          this.elevatorsSet = {}
          for (let i = 1; i <= this.actualSet.countElevators; i++) {
            this.elevatorsSet[i] = {
              'status': 'waiting',
              'transition' : 'all',
              'state': 1
            }
          }
        }
      },
      deep: true
    },
    status (newVal) {
      if (newVal && this.callQueue.length) {
        console.log(newVal)
          console.log('снова отправляем')
          this.elevatorController(this.callQueue[0].position)
      }
    }

  },

  methods: {
    installButtons(btn) {
      return this.actualSet.countFloors + 1 - btn
    },

    elevatorController (event) {
      if (this.counterClicker < this.actualSet.countElevators) {
        if (this.callQueue.length) {
          this.callQueue.splice(0, 1)
        }
        this.counterClicker++
        let x = true
        let allWaitingElevator;
        for (let item = 1; item <= this.actualSet.countElevators; item++) {
          if (this.elevatorsSet[item].status === 'waiting' && x) {
            if (!allWaitingElevator || allWaitingElevator.time > Math.abs(event - this.elevatorsSet[item].state)) {
              allWaitingElevator = {'elevatorId': item, 'time': Math.abs(event - this.elevatorsSet[item].state), 'state' : event}
            }
          }
      }
        x = false
        this.dvij(allWaitingElevator)
      } else {
        console.log('превысили клики')
        this.callQueue.push({'position' : event})
      }


    },
    dvij(data) {
      if (data) {
        this.elevatorsSet[data.elevatorId].status = 'active'
        this.elevatorsSet[data.elevatorId].transition = `${data.time}s ease`
        this.$refs.elevator[data.elevatorId - 1].style.top = (this.installButtons(data.state) - 1) * 100 + 'px';
        this.elevatorsSet[data.elevatorId].state = data.state
        console.log(`вошли в таймаут ${data.elevatorId}`)
        setTimeout( ()=> {
          this.elevatorsSet[data.elevatorId].status = 'waiting'
          this.status = `status ok for${data.elevatorId}`
          this.counterClicker--
        }, data.time * 1000)
      }

    }
  }
}
</script>

<style scoped>

.elevators-place {
  width: calc(100% - 300px);
  height: fit-content;
  background-color: bisque;
  display: flex;
}

.elevators-list {
  display: flex;
  height: 100%;
  column-gap: 20px;
}

.elevator-box {
  width: 100px;
  height: auto;
  border-left: 2px solid red;
  border-right: 2px solid red;
}

.floor-box {
  position: relative;
}

.floor {
  width: 100%;
  height: 100px;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}

.elevator {
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: blue;
}

.elevator.active{
  animation: elevatorActive 1s ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes elevatorActive {
  0%{
    opacity: 1;
  }50% {
    opacity: 0.5;
   }100% {
  opacity: 1;
  }

}

.buttons-elevators__wrapper {
  width: 100px;
  height: auto;
}

.button-elevator__box {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-click {
  width: 40px;
  height: 20px;
  border-radius: 12px;
  cursor: pointer;
}

</style>
