import JwtDecode from "jwt-decode";

const userToken = "token";
const company = "company_id";
export class StorageService {
    static getToken = (): string | null => {
        const storedToken = localStorage.getItem(userToken);
        if(storedToken) {
            return storedToken;
        }
        return null;
    }
    static getDetailToken = (): any => {
        const storedToken = localStorage.getItem(userToken);
        if(storedToken) {
            return JwtDecode(storedToken);
        }

        return null;
    }
    static setToken = (token: string) => {
        localStorage.setItem(userToken, token);
    }
    static removeToken = () => {
        localStorage.removeItem(userToken);
    }

    static getCompany = (): string | null => {
        return localStorage.getItem(company);
    }
    static setCompany = (company_id: string) => {
        localStorage.setItem(company, company_id);
    }
    static removeCompany = () => {
        localStorage.removeItem(company);
    }
}
