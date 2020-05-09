import API_ENDPOINT from "../Constants";

class LoginResponse {
    success: boolean;
    token: string;
    usertype: string;
    user_id: string;
}

export class LoginService{
    async login(username, password) : Promise<LoginResponse>{
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
            throw new Error("Failed to Login");
        }
        let response = new LoginResponse();

        if (result.ok){
            response.success = true;
            const resultAsJson = await JSON.parse(await result.text());
            response.token = resultAsJson.token;
            response.usertype = resultAsJson.type;
            response.user_id = resultAsJson.user_id;
            return response;
        }
        response.success = false;
        return response;
    }
}