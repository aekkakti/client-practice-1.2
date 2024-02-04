Vue.component('column1', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Принято в работу</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard() {
            if (this.quantity < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.quantity += 1
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
            quantity: 0
        }
    }
})

Vue.component('column2', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">В моменте</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard(name) {
            if (this.quantity < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.quantity += 1
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
            quantity: 0
        }
    }
})

Vue.component('column3', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Выполнено</h2>
        <input v-model="name" type="text">
        <button v-on:click="addCard(name)">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard(name) {
            if (this.quantity < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.quantity += 1
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
            quantity: 0
        }
    }
})

Vue.component('todo-list', {
    props: ['tasks'],
    template: `
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <p>{{task.name}}</p>
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
                this.$emit('add-task', {name: this.newTask})
                this.newTask = ''
            }
        },
    }
})

let app = new Vue({
    el: "#todo",
})