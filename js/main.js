Vue.component('column', {
    template: `
        <div class="t-a-c">
            <h1 class="fs-32pt">{{ title }}</h1><br>
            <h2>Добавить карточку</h2>
            <input type="text" v-model="name"><br><br>
            <button @click="addCard(name)">Добавить</button>
            <ul>
                <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>           
                <add-tasks :tasks="card.tasks" @add-task="addTask(index, $event)"></add-tasks>
                </li>
            </ul>
            
        </div>
    `,
    methods: {
        addCard() {
            if (this.count < 3){
                this.cards.push({name: this.name, tasks: []})
                this.name = '';
                this.count += 1;
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        }
    },
    data() {
        return {
            name: '',
            cards: [],
            count: 0,
        }
    },
});

Vue.component('add-tasks', {
    props: ['tasks'],
    template: `
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <p>{{task.name}}</p>
        </li>
        <h2>Добавить задачу</h2>
        <input type="text" v-model="newTask" name="task">
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
            this.$emit('add-task', {name: this.newTask})
            this.newTask = ''
        },
    }
})

let app = new Vue({
    el: '#todo',
});