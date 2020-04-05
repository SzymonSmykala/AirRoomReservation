import API_ENDPOINT from "../Constants";

export class Room {

}

export class RoomService {

    async fetchRoomsAsync(){
        let books = await fetch(API_ENDPOINT + "/rooms");
        let booksObjects = JSON.parse(await books.text());
        console.log(booksObjects);
        return booksObjects;
    }
    
}