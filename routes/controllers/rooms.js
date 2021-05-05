const User = require('../../models/User')
const Room = require('../../models/Room')

module.exports = {
    createRoom: async (req, res) => {
        try {
            // get the user by its id from database
            const user = await User.findById(req.user.id)

            // get from body
            const { roomName, people } = req.body;

            // people is an array of usernames, convert it into an array of ids
            const newPeople = [];
            const newPeopleObjs = [];
            if (people != null) {
                for (let person of people) {
                    const newPersonObj = await User.findOne({ 'auth.username': person.name })
                    if (newPersonObj) {
                        newPeople.push(newPersonObj._id)
                        newPeopleObjs.push(newPersonObj)
                    }
                }
            }

            const users = newPeople.length == 0 ? [user.id] : [user.id, ...newPeople]
            const userObjs = newPeople.length == 0 ? [user] : [user, ...newPeopleObjs]

            // create a new room
            const newRoom = new Room({
                roomName: roomName,
                people: users,
                messages: [],
                createdBy: req.user._id
            })

            // save the room in database
            await newRoom.save()

            // update the user's room list
            userObjs.forEach(async userObj => {
                await User.update({ _id: userObj._id }, { $push: { rooms: newRoom._id } })
            })

            res.status(201).json({ newRoom })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error, errorMessage: 'Error while creating room' })
        }
    },
    // TODO: change this method to use findById
    joinRoomById: async (req, res) => {
        // get the room by roomId
        const foundRoom = await Room.findOne({ roomId: req.params.roomid })
        if (!foundRoom) {
            // if not found return not found error
            return res.status(404).json({ error: 'Room not found' })
        }

        // find user in db
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: 'User not found in db' })
        }

        if (user.rooms.includes(foundRoom.roomId)) {
            if (foundRoom.people.includes(req.user.id)) {
                return res.status(400).json({ error: 'User already joined in the room' })
            }
        }

        // update & save user
        user.rooms = [...user.rooms, foundRoom.roomId]
        await user.save()

        // update & save rooms
        foundRoom.people = [...foundRoom.people, req.user.id]
        await foundRoom.save()

        return res.status(200).json({ foundRoom })
    },
    exitRoom: async (req, res) => {
        try {
            console.log(req.params);
            // get the room by roomId
            const foundRoom = await Room.findById(req.params.roomid)
            if (!foundRoom) {
                // if not found return not found error
                return res.status(404).json({ error: 'Room not found' })
            }

            // find user in db
            const user = await User.findById(req.user.id)

            if (!user) {
                return res.status(404).json({ error: 'User not found in db' })
            }

            await User.update({ _id: req.user.id }, { $pull: { 'rooms': req.params.roomid } })
            await Room.update({ _id: req.params.roomid }, { $pull: { 'people': req.user.id } })
            return res.status(200).json({ foundRoom, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },
    setProfilePic: async (req, res) => {
        try {
            const { url, roomId } = req.body;

            console.log(req.body);
            await Room.findOneAndUpdate({ _id: roomId }, { pfpUrl: url }, function (err, doc) {
                if (err) {
                    return res.status(500).json({ err });
                }

                return res.status(200).json({ status: 'OK' })
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
    },
    deleteProfilePic: async (req, res) => {
        try {
            const { roomId } = req.body;

            // console.log(req.body);
            Room.findOneAndUpdate({ _id: roomId }, { pfpUrl: '' }, function (err, doc) {
                if (err) {
                    return res.status(500).json({ err });
                }

                return res.status(200).json({ status: 'OK' })
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
    },
    deleteRoom: async (req, res) => {
        res.send('permanently delete room')
    }
}