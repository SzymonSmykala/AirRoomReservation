module.exports = async () => {

    // const Rooms = require("./models/Room");
    const User = require("./models/User");

    console.log("Running bootstrap")

    const errHandler = (err) => {
        console.error("Error: ", err)
    }

    const user  = await User.create({username: "username123", password: "pass234"}).catch(errHandler);

}