class LocalStorage {

    static getLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    }

    static setLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getActiveUser() {
        const users = this.getLocalStorage();
        const activeUser = users.find(user => user.isLogged === true);
        return activeUser;
    }

    static setInactiveUser() {
        const users = this.getLocalStorage();
        const user = users.find(user => user.isLogged === true);
        user.isLogged = false;
        this.setLocalStorage(users);
    }
    
}

export { LocalStorage };