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

      const query = `
        mutation {
          createTodo(todo: { title: "${title}" }) {
            id
            title
            done
            createdAt
            updatedAt
          }
        }
      `;

      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      })
        .then((res) => res.json())
        .then(({ data }) => {
          const todo = data.createTodo;

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
      const query = `
        mutation {
          completeTodo(id: "${id}") {
            updatedAt
          }
        }
      `;

      fetch(`/graphql`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      })
        .then((res) => res.json())
        .then(({ data }) => {
          const ndx = this.todos.findIndex((t) => t.id === id);

          this.todos[ndx].updatedAt = data.completeTodo.updatedAt;
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

      return new Intl.DateTimeFormat('en-En', options).format(new Date(+value));
    }
  },

  created () {
    this.$vuetify.theme.dark = true;

    const query = `
      query {
        getTodos {
          id
          title
          done
          createdAt
          updatedAt
        }
      }
    `;

    fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then(({ data }) => this.todos = data.getTodos)
      .catch((err) => console.error(err));
  },
});
