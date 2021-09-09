

var TestComponent = new Vue({
    el: '#test-component',
    delimiters: ['[[', ']]'],
    data: function () {
        return {
            message: 'You loaded this page on ' +  new Date().toLocaleString(),
            seen: true,
            todos: [
                {text: 'todo-1'},
                {text: 'todo-2'},
                {text: 'todo-3'},
            ],
            input: 'Type something',
            newTodo: '',
            a: 1,
        }
    },
    methods: {
        pushTodo: function () {
            this.todos.push({ text: this.newTodo })
        },
    },
    created: function() {
        console.log(this.message)
    },
    mounted: function() {
        console.log('component mounted')
    },
    updated: function() {
        console.log('component updated')
    },
    destroyed: function() {
        console.log('component destroyed')
    }
})

TestComponent.$watch('a', function(newValue, oldValue) {
    // this callback will be called when TestComponent.a changes
    console.log('new value =  ' + newValue + ' old value = ' + oldValue)
})