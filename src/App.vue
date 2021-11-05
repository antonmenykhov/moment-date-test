<template>
<div id="app">
    <div class="container">
        <calendar :events="events" />
    </div>
</div>
</template>

<script>
import Calendar from './components/Calendar/Calendar.vue';

export default {
    name: 'App',
    components: { Calendar },
    data() {
        return {
            events: [{
                    id: 1,
                    name: 'первое событие первое событие первое событие первое событие',
                    date: '2021-11-05T18:00',
                    type: 'orange'
                },
                {
                    id: 2,
                    name: 'второе событие второе событие второе событие',
                    date: '2021-11-06T20:00',
                    type: 'green'
                },
                {
                    id: 3,
                    name: 'третье событие третье событие третье событие',
                    date: '2021-11-09T16:00',
                    type: 'orange'
                },
                {
                    id: 4,
                    name: 'третье событие третье событие третье событие',
                    date: '2021-11-12T16:00',
                    type: 'red'
                },
                {
                    id: 5,
                    name: 'третье событие третье событие третье событие',
                    date: '2021-11-16T16:00',
                    type: 'red'
                },
                {
                    id: 6,
                    name: 'третье событие третье событие третье событие',
                    date: '2021-11-21T16:00',
                    type: 'green'
                },
                {
                    id: 7,
                    name: 'третье событие третье событие третье событие',
                    date: '2021-11-23T16:00',
                    type: 'red'
                },
                
            ]
        }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

* {
    font-family: Montserrat, sans-serif;

}
body{
  background: rgb(245,245,245);
  overflow-x: hidden;
}
#app {
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.container{
  max-width: 1170px;
  margin: 0 auto;
  width: 100%;
}
</style>
