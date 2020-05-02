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
}