import API_ENDPOINT from "../Constants";


export class RegisterService{
    async registerUser(username, password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/users/signup', requestOptions);
        }catch (e) {
            console.log(e);
            return new Error("Failed to register");
        }
        console.log("Register successful");
        return result;
    }
}