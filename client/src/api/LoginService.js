import API_ENDPOINT from "../Constants";


export class LoginService{
    async login(username, password) : Promise<string>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/users/login', requestOptions);
        }catch (e) {
            console.log(e);
            return new Error("Failed to Login");
        }
        console.log("Login successful");
        console.log(result);
        return result;
    }
}