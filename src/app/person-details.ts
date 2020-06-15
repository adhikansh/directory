export class PersonDetails {
    id: number;
    name: string;
    phoneNumber: number;
    age: number;
    address: string;
    constructor(id: number,
        name: string,
        phoneNumber: number,
        age: number,
        address: string,) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.address = address;
    }
}