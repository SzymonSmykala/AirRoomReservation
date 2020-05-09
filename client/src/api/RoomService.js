import API_ENDPOINT from "../Constants";

export class Room {
    _id;
    __v;
    name;
    costPerDay;
    photoUrl;
}

export class RoomService {
    async fetchRoomsAsync() : Array<Room>{
        let rooms = await fetch(API_ENDPOINT + "/rooms");
        let roomsObjects = JSON.parse(await rooms.text());
        console.log(roomsObjects);
        return roomsObjects;
    }

    async fetchRoomByIdAsync(roomId): Room {
        console.log(roomId);
        let room = await fetch(API_ENDPOINT + "/rooms/" + roomId);
        console.log(room);
        let roomObject = JSON.parse(await room.text());
        console.log("Fetched: " + roomObject.name);
        return roomObject;
    }

    async fetchAvailableRoomsForSelectedDatesAsync(startDate, endDate): Array<Room> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate: startDate, endDate: endDate })
        };
        let result;
        try {
            result = await fetch(API_ENDPOINT + '/rooms/roomsForDates', requestOptions);
        }catch (e) {
            console.log(e);
        }
        let resultAsText = await result.text();
        let objectResult = JSON.parse(resultAsText);
        return objectResult;
    }
}