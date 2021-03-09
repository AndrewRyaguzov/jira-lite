export class SignupDto {
    login: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;

    constructor(login: string, password: string, name: string, lastName: string, phone: string) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone.split(' ').join(''); // Порнография, но трим не отрабатывает как ожидается :) 
    }
}