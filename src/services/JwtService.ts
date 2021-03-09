const userToken = "token";
export class JwtService {
    static getToken = (): string | null => {
        return localStorage.getItem(userToken);
    }

    static setToken = (token: string) => {
        localStorage.setItem(userToken, token);
    }
}
