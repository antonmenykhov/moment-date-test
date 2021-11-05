<template>
<div class="calendar-item" :class="{
      'prevDay': itemDate.isBefore(now) ,
       'current': itemDate.isSame(now) ,
       'holiday': itemDate.day() === 6 || itemDate.day() === 0
  }">
    <div class="number">{{itemDate.date()}}</div>
    <div class="number numberMobile">{{itemDate.format('DD MMMM YYYY dd')}}</div>
    <div class="events">
        <div class="event" :class="event.type"  v-for="event in sortArray(item.events)" :key="event.id">
            <div :class="event.type"  class="eventText">
                {{$moment(event.date).format('HH:mm')}} {{event.name}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        item: Object,
        now: Object
    },
    computed: {
        itemDate: function () {
            return this.$moment(this.item.date)
        },

    },
    methods: {
        sortArray(arr) {
            return arr.slice().sort((a, b) => a.date >= b.date ? 1 : -1)
        }
    },
}
</script>

<style lang="scss">
.calendar-item {
    min-height: 125px;
    box-shadow: 1px 1px 2px rgba(168, 168, 168, 0.25);
    color: rgb(114, 116, 116);
    padding: 10px;
    border-radius: 5px;
    margin: 1px;
    box-sizing: border-box;
    position: relative;

    .number {
        width: 100%;
        text-align: right;
        font-weight: 600;
    }
}

.prevDay {
    color: rgb(180, 180, 180);
    background: rgb(245, 245, 245)
}

.holiday {
    color: rgb(129, 134, 206);
}

.current {
    background: white;
    color: rgb(88, 209, 101);
    box-shadow: 0 0 2px 1px rgba(168, 168, 168, 1);
}

.events {
    margin-top: 5px;
    width: 100%;
    height: 100%;

}

.event {
    box-sizing: border-box;
    height: 20px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    transition: all .3s;
    border-radius: 5px;
}

.eventText {
  
    border-radius: 5px;
    padding: 3px 4px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    z-index: 5;
    transition: all .3s;
}
.numberMobile{
    display: none;
}

.eventText:hover {
    width: fit-content;
    overflow: visible;
}

.orange {
    background: rgb(248, 235, 215);
    color: rgb(250, 189, 98)
}

.red {
    background: rgb(252, 236, 238);
    color: rgb(220, 174, 172)
}

.green {
    background: rgb(230, 245, 234);
    color: rgb(88, 209, 101);
}
@media (max-width: 768px){
    .number{
        display: none;
    }
    .numberMobile{
        display: block;
    }
    .event:hover{
        height: auto;
    }
    .eventText:hover{
        position: relative;
        overflow: visible;
        white-space: unset;
        z-index: 50;
    }
}
</style>
