Vue.component('column1', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Принято в работу</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @add-task="addTask(index, $event)" @complete-task="completeTask(index, $event)"></list>
            </li>
        </ul>
    </div>
    `,
    methods: {
        addCard() {
            if (this.count < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.count += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completeStyle = !this.cards[cardIndex].tasks[taskIndex].completeStyle
        }
    },
    data() {
        return {
            name: '',
            cards: [],
            count: 0
        }
    }
})

Vue.component('column2', {
    template: `
    <div class="column">
        <h2 class="t-a-c">В моменте</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @add-task="addTask(index, $event)"></list>
            </li>
        </ul>
    </div>
    `,
    methods: {
        addCard() {
            if (this.count < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.count += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            count: 0
        }
    }
})

Vue.component('column3', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Выполнено</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @add-task="addTask(index, $event)"></list>
            </li>
        </ul>
    </div>
    `,
    methods: {
        addCard() {
            if (this.count < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.count += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            count: 0
        }
    }
})

Vue.component('list', {
    props: ['tasks'],
    template: `
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <p :class="{'completeStyle' : task.completeStyle}" @click="completeTask(index)">{{task.name}}</p>
        </li>
        <input v-model="newTask" type="text">
        <button @click="addTask">Добавить задачу</button>
    </ul>
    `,
    data() {
        return {
            newTask: ''
        }
    },
    methods: {
        addTask() {
            if (this.newTask !== ''){
                this.$emit('add-task', {name: this.newTask, completeStyle: false})
                this.newTask = ''
            }
        },
        completeTask(index) {
            this.$emit('complete-task', index)
        }
    }
})

let app = new Vue({
    el: "#todo",
})
