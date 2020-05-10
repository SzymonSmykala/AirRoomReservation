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

        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations/user/' + userId);
        }catch (e) {
            console.log(e);
        }
        return JSON.parse(await result.text());
    }

    async getReservationById(reservationId) : Promise<Reservation> {
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations/' + reservationId);
        }catch (e) {
            console.log(e);
        }

        return JSON.parse(await result.text());
    }

    async deleteReservationById(reservationId) : Promise {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations/' + reservationId, requestOptions);
        }catch (e) {
            console.log(e);
        }
        return await result.text();
    }

    async updateReservation(reservation) : Promise {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations/' , requestOptions);
        }catch (e) {
            console.log(e);
        }
        return result;
    }

    async getAllReservations(): Promise<Array<Reservation>>{

        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations');
        }catch (e) {
            console.log(e);
        }
        return JSON.parse(await result.text());
    }
}