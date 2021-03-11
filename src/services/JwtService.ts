import JwtDecode from "jwt-decode";

const userToken = "token";
export class JwtService {
    static getToken = (): string | null | any => {

        const storedToken = localStorage.getItem(userToken);
        if(storedToken) {
            return JwtDecode(storedToken);
        }
        return null;
    }

    static setToken = (token: string) => {
        localStorage.setItem(userToken, token);
    }
}
