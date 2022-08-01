const Employee =require('./Employee');

class Manager extends Employee {
    constructor (name, id, email , Officenumber) {
        super(name , id ,email);
        this.OfficeNumber = Officenumber;
    }

    getOfficeNumber() {
        return this.OfficeNumber;
    }
    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;