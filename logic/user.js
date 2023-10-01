class User {
    
    constructor(username, email, password, firstName, lastName, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.shifts = [];
    }

}

export { User };