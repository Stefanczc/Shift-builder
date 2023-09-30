class LocalStorage {
    static setLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    }
}

export { LocalStorage };