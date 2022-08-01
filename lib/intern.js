const Employee =require('./Employee');

class Intern extends Employee {
    constructor (name, id, email , School) {
        super(name , id ,email);
        this.School = School;
    }

    getSchool() {
        return this.School;
    }
    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;