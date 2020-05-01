import API_ENDPOINT from "../Constants";

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
        console.log("params: " +  startDate + " " + endDate + " " + user + " " + room);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user, startDate: startDate, room: room, endDate: endDate })
        };
        console.log("Wysylam:... " + requestOptions.body);
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/reservations', requestOptions);
        }catch (e) {
            console.log(e);
        }
        console.log("Result" + JSON.stringify(result));
        return result;
    }
}