import { SignupDto } from "../models/SignupDto";
import { StorageService } from "./StorageService";
const pathBase = "http://localhost:10000";
const bearer = "Bearer_" ;
export class ApiService {
    static signIn = (login: string, password: string) => {
        return fetch(pathBase + '/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({"login": login, "password": password}),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    static signUp = (signupDto: SignupDto, inviteCode: string = "") => {
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
    static getCompanyUsers = () => {
        const company_id = StorageService.getCompany();
        const auth = bearer + StorageService.getToken();
        return fetch(pathBase + '/admin/users/' + company_id, {
            method: 'GET',
            headers: { 'Authorization': auth}
        });
    }
    static setUserAdmin = (user_id: string) => {
        const auth = bearer + StorageService.getToken();
        return fetch(pathBase + '/admin​/company​/' + user_id + '/set-admin', {
            method: 'POST',
            headers: { 'Authorization': auth}
        });
    }
    static setUserNotAdmin = (user_id: string) => {
        const auth = bearer + StorageService.getToken();
        return fetch(pathBase + '/admin​/company​/' + user_id + '/remove-admin', {
            method: 'POST',
            headers: { 'Authorization': auth}
        });
    }
    static setUserArchived = (user_id: string) => {
        const auth = bearer + StorageService.getToken();
        return fetch(pathBase + '/admin​/company​/' + user_id + '/archive', {
            method: 'POST',
            headers: { 'Authorization': auth}
        });
    }
    static setUserActive = (user_id: string) => {
        const auth = bearer + StorageService.getToken();
        return fetch(pathBase + '/admin​/company​/' + user_id + '/archive', {
            method: 'POST',
            headers: { 'Authorization': auth}
        });
    }
}
