class LocalStorage {

    static getUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    }

    static setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getActiveUser() {
        const users = this.getUsers();
        const activeUser = users.find(user => user.isLogged === true);
        return activeUser;
    }

    static setInactiveUser() {
        const users = this.getUsers();
        const user = users.find(user => user.isLogged === true);
        user.isLogged = false;
        this.setUsers(users);
    }
    
}

export { LocalStorage };
