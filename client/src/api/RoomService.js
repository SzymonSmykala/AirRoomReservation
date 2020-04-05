import API_ENDPOINT from "../Constants";

export class Room {
    _id;
    __v;
    name;
    costPerDay;
}

export class RoomService {

    async fetchRoomsAsync() : Array<Room>{
        let books = await fetch(API_ENDPOINT + "/rooms");
        let booksObjects = JSON.parse(await books.text());
        console.log(booksObjects);
        return booksObjects;
    }
    
}