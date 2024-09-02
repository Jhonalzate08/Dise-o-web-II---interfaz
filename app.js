// Modelo
class UserModel {
    constructor() {
        this.users = [];
    }

    addUser(name, email) {
        const user = { name, email };
        this.users.push(user);
        return user;
    }

    getUsers() {
        return this.users;
    }
}

// Vista
class UserView {
    constructor() {
        this.form = document.getElementById('userForm');
        this.nameInput = document.getElementById('nameInput');
        this.emailInput = document.getElementById('emailInput');
        this.userList = document.getElementById('userList');
    }

    bindAddUser(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            handler(this.nameInput.value, this.emailInput.value);
        });
    }

    displayUsers(users) {
        this.userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            this.userList.appendChild(li);
        });
    }

    clearInputs() {
        this.nameInput.value = '';
        this.emailInput.value = '';
    }
}

// Controlador
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindAddUser(this.handleAddUser.bind(this));
        this.updateView();
    }

    handleAddUser(name, email) {
        this.model.addUser(name, email);
        this.view.clearInputs();
        this.updateView();
    }

    updateView() {
        this.view.displayUsers(this.model.getUsers());
    }
}

// Inicialización
const app = new UserController(new UserModel(), new UserView());