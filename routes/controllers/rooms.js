const User = require('../../models/User')
const Room = require('../../models/Room')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    getRoomsOfUser: async (req,res) => {
        console.log(req.user.rooms)
        let allRooms = [];

        for(let roomId of req.user.rooms) {
            const room = await Room.findOne({ roomId: roomId })
            allRooms.push(room);
        }

        console.log(allRooms)

        res.status(200).json({ rooms: allRooms })
    },
    createRoom: async (req,res) => {
        // get the user by its id from database
        const user = await User.findById(req.user.id)
        
        // create a new room and save its roomId in users room list
        const newRoom = new Room({
            roomId: uuidv4(),
            people: [ user.id ],
            messages: []
        })

        // save the room in database
        await newRoom.save()

        // update the user's room list
        user.rooms = [ ...user.rooms, newRoom.roomId ]

        await user.save()

        res.status(201).json({ newRoom })
    },
    joinRoomById: async (req,res) => {
        res.send('room by id')
    },
    exitRoom: async (req,res) => {
        res.send('exit room')
    },
    deleteRoom: async (req,res) => {
        res.send('permanently delete room')
    }
}