<template>
<div class="calendar">
    <div class="controls">
        <button class="prevMonth" @click="getCalendarSheet(currentMonth.subtract(1,'month'))"></button>
        <div class="date">
            <p class="currentMonth">{{currentMonth.format('MMMM')}}</p>
            <p class="currentYear" v-if="currentMonth.year() != now.year()">{{currentMonth.year()}}</p>
        </div>
        <button class="nextMonth" @click="getCalendarSheet(currentMonth.add(1,'month'))"></button>

    </div>
    <div class="calendar-wrapper">
        <div class="calendar-label" :class="{'holidayLabel': $moment(item.date).day() === 6 || $moment(item.date).day() === 0}" v-for="item,i in currentCalendar.slice(0,7)" :key="i">{{$moment(item.date).format('dddd') }}</div>
        <calendar-item v-for="item in currentCalendar" :key="item.date" :item="item" :now="now"></calendar-item>
    </div>
</div>
</template>

<script>
import CalendarItem from './CalendarItem.vue';
export default {
    props: {
        events: Array
    },
    components: {
        CalendarItem
    },
    computed: {
        now: function () {

            return this.$moment() //Получаю текущую дату
        }
    },
    data() {
        return {
            currentCalendar: [],
            currentMonth: {},
        }
    },
    created() {
        this.currentMonth = this.now.clone() //Делаю копию, для того чтобы переключать месяцы
        this.getCalendarSheet(this.now) //Вызываю генератор текущего листа
    },

    methods: {
        getCurrentEvents(calendar) { //Получаю события только для текущего листа
            let midCalendar = [];
            calendar.forEach(day => {
                let dayWithEvents = {};
                dayWithEvents.date = day.date;
                dayWithEvents.events = this.events.filter(event => 
                    this.$moment(event.date).format('DD/MM/YYYY') ==  (this.$moment(day.date)).format('DD/MM/YYYY')
                )
                midCalendar.push(dayWithEvents)
            });
            this.currentCalendar = midCalendar;
        },
        getCalendarSheet(date) { //Генератор текущего листа 
            let currentDay = this.$moment(date).date(); //Получаю какое число сегодня
            let startOfMonth = this.$moment(date).startOf('month') // Получаю день начала месяца
            let startOfMonthDay = startOfMonth.day(); //Получаю номер дня в неделе
            let endOfMonth = this.$moment(date).endOf('month'); //Получаю день конца месяца
            let endOfMonthDay = endOfMonth.day(); //Получаю номер дня в неделе
            let endDateNumber = endOfMonth.date() //Получаю последнее число в месяце, для количества дней
            let prevMonthDays = [] //Массив с днями из предидущего месяца
            let nextMonthDays = [] //Массив с днями из следующего месяца
            let daysCurBefore = [] //Массив с днями из текущего месяца до текущей даты
            let daysCurAfter = [] //Массив с днями из текущего месяца после текущей даты
            let iteraitedDay = startOfMonth.clone()
            if (startOfMonthDay === 0) { startOfMonthDay = 7 }
            for (let i = 1; i < startOfMonthDay; i++) { //Получаю дни из предидущего месяца
                prevMonthDays.unshift({ date: iteraitedDay.subtract(1, 'day').toISOString() })
            }
            if (endOfMonthDay != 0) { //Получаю дни из следующего месяца
                iteraitedDay = endOfMonth.clone()
                for (let i = 7; i > endOfMonthDay; i--) {
                    nextMonthDays.push({ date: iteraitedDay.add(1, 'day').toISOString() })
                }
            }
            //Разделил на 2 цикла чтобы добавлять в массив текущюю дату с временем
            iteraitedDay = startOfMonth.clone() //Получаю дни текщего месяца до текущей даты
            for (let i = 0; i < currentDay - 1; i++) {
                daysCurBefore.push({ date: iteraitedDay.toISOString() })
                iteraitedDay.add(1, 'day')
            }
            iteraitedDay = date.clone()
            for (let i = endDateNumber; i > (currentDay - 1); i--) { //Получаю дни текущего месяца после текущей даты
                daysCurAfter.push({ date: iteraitedDay.toISOString() })
                iteraitedDay.add(1, 'day')
            }
            this.currentCalendar = [...prevMonthDays, ...daysCurBefore, ...daysCurAfter, ...nextMonthDays]
            this.getCurrentEvents(this.currentCalendar)
        }
    },
}
</script>

<style lang="scss">
.controls {
    display: flex;
    align-items: center;

    .prevMonth,
    .nextMonth {
        background: url('/img/back.svg') no-repeat center center / contain;
        height: 20px;
        width: 20px;
        border: none;
        cursor: pointer;
        transition: all .3s;
    }

    .nextMonth {
        background: url('/img/forward.svg') no-repeat center center / contain;
    }

    .prevMonth:hover,
    .nextMonth:hover {
        transform: scale(1.1);
    }

    .prevMonth:focus,
    .nextMonth:focus {
        outline: none;

    }

    .date {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 140px;

        p {
            text-transform: uppercase;
            color: rgb(90, 94, 145);
            font-weight: 600;
        }

        .currentYear {
            margin-left: 5px;
        }
    }
}

.calendar-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

}

.calendar-label {
    font-weight: 700;
    text-transform: uppercase;
    padding: 10px 0;
    font-size: 14px;
    text-align: right;
}

.holidayLabel {
    color: rgb(153, 153, 153)
}

.calendar {
    background: white;
    border-radius: 30px;
    padding: 30px;

}
</style>
