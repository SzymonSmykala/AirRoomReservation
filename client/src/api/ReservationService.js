import API_ENDPOINT from "../Constants";
import Cookie from "js-cookie"

export class Reservation {
    _id;
    startDate;
    endDate;
    user;
    room;
    __v;
}

export class ReservationService{
    async addReservation(startDate, endDate, user, room){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user, startDate: startDate, room: room, endDate: endDate })
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations', requestOptions);
        }catch (e) {
            console.log(e);
        }
        return result;
    }

    async getReservationByUser() : Promise<Array<Reservation>> {
        const userId = Cookie.get('user_id');
        const token = Cookie.get('token');

        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations/' + userId);
        }catch (e) {
            console.log(e);
        }
        return JSON.parse(await result.text());
    }
}