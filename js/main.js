Vue.component('column', {
    props: ['cards', 'addCard', 'title'],
    template: `
        <div>
            <h1>{{ title }}</h1>
            <h2>Добавить название</h2>
            <input type="text" v-model="newCard" name="card">
            <button @click="addCard(newCard)">Add</button>
            <ul>
                <li v-for="card in cards">{{ card }}</li>
            </ul>
        </div>
    `,
    data() {
        return {
            newCard: ''
        }
    },
});

let app = new Vue({
    el: '#todo',
    data: {
        columns: {
            column1: { title: 'Принято в работу', cards: [] },
            column2: { title: 'Выполняется', cards: [] },
            column3: { title: 'Готово', cards: [] }
        }
    },
    methods: {
        addCard(column) {
            return (newCard) => {
                this.columns[column].cards.push(newCard);
            };
        }
    }
});