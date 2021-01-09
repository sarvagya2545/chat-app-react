const User = require('../../models/User')
const Room = require('../../models/Room')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    getRoomsOfUser: async (req, res) => {
        try {
            console.log(req.user.rooms)
            let allRooms = [];
            for (let roomId of req.user.rooms) {
                const room = await Room.findOne({ roomId: roomId })
                if (room) allRooms.push(room);
            }
            res.status(200).json({ rooms: allRooms })
        } catch (error) {
            res.status(500).json({ errorMessage: 'error while joining rooms', error })
        }
    },
    createRoom: async (req, res) => {
        try {
            // get the user by its id from database
            const user = await User.findById(req.user.id)

            // get from body
            const { roomName, people } = req.body;

            // people is an array of usernames, convert it into an array of ids
            const newPeople = [];
            if(people != null) {
                for(let personName of people) {
                    const newPersonObj = await User.findOne({ 'auth.username': personName })
                    if(newPersonObj) newPeople.push(newPersonObj._id)
                }
            }

            const users = newPeople.length == 0 ? [ user.id ] : [ user.id, ...newPeople ]

            // create a new room and save its roomId in users room list
            const newRoom = new Room({
                roomName: roomName,
                roomId: uuidv4(),
                people: users,
                messages: []
            })

            // save the room in database
            await newRoom.save()

            // update the user's room list
            for(let user of users) {
                // console.log(user)
                newuser = await User.findById(user)
                newuser.rooms = [...newuser.rooms, newRoom.roomId]
                console.log(newuser)
                await newuser.save()
            }

            res.status(201).json({ newRoom })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error, errorMessage: 'Error while creating room' })
        }
    },
    joinRoomById: async (req, res) => {
        // get the room by roomId
        const foundRoom = await Room.findOne({ roomId: req.params.roomid })
        if (!foundRoom) {
            // if not found return not found error
            return res.status(404).json({ error: 'Room not found' })
        }

        // find user in db
        const user = await User.findById(req.user.id)

        if(!user) {
            return res.status(404).json({ error: 'User not found in db' })
        }

        if(user.rooms.includes(foundRoom.roomId)) {
            if(foundRoom.people.includes(req.user.id)) {
                return res.status(400).json({ error: 'User already joined in the room' })
            }
        }

        // update & save user
        user.rooms = [ ...user.rooms, foundRoom.roomId ]
        await user.save()

        // update & save rooms
        foundRoom.people = [ ...foundRoom.people, req.user.id ]
        await foundRoom.save()

        return res.status(200).json({ foundRoom })
    },
    exitRoom: async (req, res) => {
        // get the room by roomId
        const foundRoom = await Room.findOne({ roomId: req.params.roomid })
        if (!foundRoom) {
            // if not found return not found error
            return res.status(404).json({ error: 'Room not found' })
        }

        // find user in db
        const user = await User.findById(req.user.id)

        if(!user) {
            return res.status(404).json({ error: 'User not found in db' })
        }

        if(user.rooms.includes(foundRoom.roomId)) {
            if(foundRoom.people.includes(req.user.id)) {
                // only now should we update the data in db
                user.rooms = user.rooms.filter(room => room !== foundRoom.roomId)
                foundRoom.people = foundRoom.people.filter(personId => personId.toString() !== req.user.id)

                user.save()
                foundRoom.save()

                return res.status(200).json({ foundRoom })
            }
        }
    },
    deleteRoom: async (req, res) => {
        res.send('permanently delete room')
    }
}