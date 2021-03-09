import { SignupDto } from "../models/SignupDto";

const pathBase = "http://localhost:10000";

export class ApiService {
    static signIn = (login: string, password: string) => {
        return fetch(pathBase + '/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({"login": login, "password": password}),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    static signUp = (signupDto: SignupDto, inviteCode: string = "") => {
        //const path = inviteCode === "" ? pathBase + '/auth/sign-up' : pathBase + '/auth/sign-up' + "?inviteCode=" + inviteCode;
        const path = inviteCode === "" ? pathBase + '/auth/sign-up' : pathBase + '/auth/sign-up/' + inviteCode;
        
        return fetch(path, {
            method: 'POST',
            body: JSON.stringify(signupDto),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    static createCompany = (name: string) => {
        return fetch(pathBase + '/company', {
            method: 'POST',
            body: JSON.stringify({"name": name}),
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
