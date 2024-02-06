Vue.component('column1', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Принято в работу</h2>
        <button @click="removeFromLocalStorage" class="clearTODO">Удалить все карточки</button><br><br>
        <input v-model="name" type="text" class="addCardInput"><br><br>
        <button @click="addCard(name)" class="addCardButton">Добавить карточку</button>
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
            if (this.countCards < 3 && this.name !== '') {
                let newCard = {name: this.name, tasks: []}
                this.cards.push(newCard);
                this.$parent.$children[1].Column1Cards.push(newCard);
                this.name = ''
                this.countCards += 1
                this.saveToLocalStorage()
            }
            else if (this.name === '') {
                alert('Нельзя создавать пустую карточку!')
            }
            else {
                alert('Максимум можно добавить только 3 карточки!')
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask);
            this.saveToLocalStorage()
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completeStyle = !this.cards[cardIndex].tasks[taskIndex].completeStyle
            const completedTasks = this.cards[cardIndex].tasks.filter(task => task.completeStyle)
            this.completeTaskPercent = 100 / this.cards[cardIndex].tasks.length * completedTasks.length
            if (this.completeTaskPercent >= 50) {
                app.$children[1].moveCardToInProgress(cardIndex);
                this.cards.splice(cardIndex, 1)
            }
            this.saveToLocalStorage()
        },
        loadFromLocalStorage() {
            let savedData = localStorage.getItem('todo');
            if (savedData) {
                this.cards = JSON.parse(savedData)
                }
            },
        saveToLocalStorage() {
            let jsonData = JSON.stringify(this.cards);
            localStorage.setItem('todo', jsonData)
            },
        removeFromLocalStorage(){
            localStorage.clear()
            location.reload()
        }
        },
    mounted() {
        this.loadFromLocalStorage()
    },
    data() {
        return {
            name: '',
            cards: [],
            countCards: 0,
        }
    }
})

Vue.component('column2', {
    template: `
    <div class="column">
        <h2 class="t-a-c">В моменте</h2>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @complete-task="completeTask(index, $event)"></list>
            </li>
        </ul>
    </div>
    `,
    methods: {
        addCard(name) {
            if (this.countCards < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.countCards += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
        moveCardToInProgress(cardIndex) {
            if (this.countCards < 3) {
                this.cards.push(this.Column1Cards[cardIndex]);
                this.Column1Cards.splice(cardIndex, 1);
                this.countCards += 1;
            }
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completeStyle = !this.cards[cardIndex].tasks[taskIndex].completeStyle
            const completedTasks = this.cards[cardIndex].tasks.filter(task => task.completeStyle)
            this.completeTaskPercent = 100 / this.cards[cardIndex].tasks.length * completedTasks.length
            if (this.completeTaskPercent === 100) {
                app.$children[2].moveCardToFinish(cardIndex);
                this.cards.splice(cardIndex, 1)
            }
        },
    },

    data() {
        return {
            name: '',
            cards: [],
            countCards: 0,
            Column1Cards: []
        }
    }
})

Vue.component('column3', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Выполнено</h2>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @complete-task="completeTask(index, $event)"></list>
            </li>
        </ul>
        </ul>
    </div>
    `,
    methods: {
        addCard(name) {
            if (this.countCards < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.countCards += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
        moveCardToFinish(cardIndex) {
            if (this.countCards < 3) {
                this.cards.push(this.Column2Cards[cardIndex]);
                this.Column2Cards.splice(cardIndex, 1);
                this.countCards += 1;
            }
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            countCards: 0,
            Column2Cards: []
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
            newTask: '',
            countTask: 0
        }
    },
    methods: {
        addTask() {
            if (this.newTask !== '' && this.countTask < 3){
                this.$emit('add-task', {name: this.newTask, completeStyle: false})
                this.newTask = ''
                this.countTask += 1
            }
            else if (this.newTask !== '' && this.countTask < 5) {
                this.$emit('add-task', {name: this.newTask, completeStyle: false})
                this.newTask = ''
                this.countTask += 1
            }
            else if (this.newTask === '') {
                alert('Нельзя создавать пустую задачу!')
            }
            else {
                alert('Максимум можно добавить только 5 задач!')
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
