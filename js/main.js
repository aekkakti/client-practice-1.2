Vue.component('column-1', {
    template: `
        
    <div>
    <h1>Столбец 1</h1>
    <h2>Добавить название</h2>
        <input type="text" name="card">
        <button @click="addCard">Add</button>
     </div>
    `,
    data() {
        return {
            cards: []
        }
    },
    methods: {
        addList(value) {
            this.$emit('change', value)
        },
    }
})

// Проверка работоспособности LocalStorage
let app = new Vue({
    el: '#todo',
    data: {
        name:'',
        column1Cards: [],
        column2Cards: [],
        column3Cards: []
    },
    methods: {
        addCard(value) {
            this.cards.push(this.card)
            console.log(this.cards);
        }
    }
})