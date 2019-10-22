new Vue({
  el: '#app',
  vuetify: new Vuetify(),

  data() {
    return {
      show: true,
      todoTitle: '',
      todos: []
    }
  },

  methods: {
    addTodo() {
      const title = this.todoTitle.trim();

      if (!title) return;

      fetch('/api/todo', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          this.todos.push(todo);
          this.todoTitle = '';
        })
        .catch((err) => console.error(err));
    },

    removeTodo(id) {
      fetch(`/api/todo/${id}`, { method: 'delete' })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((err) => console.error(err));
    },

    completeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: true })
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const ndx = this.todos.findIndex((t) => t.id === todo.id);

          this.todos[ndx].updatedAt = todo.updatedAt;
        })
        .catch((err) => console.error(err));
    }
  },

  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },

    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };

      if (withTime) {
        options.hour = '2-digit',
        options.minute = '2-digit',
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('en-En', options).format(new Date(value));
    }
  },

  created () {
    this.$vuetify.theme.dark = true;

    fetch('/api/todo', { method: 'get' })
      .then((res) => res.json())
      .then((todos) => this.todos = todos)
      .catch((err) => console.error(err));
  },
});
