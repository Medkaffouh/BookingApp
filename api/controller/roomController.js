import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, resp, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    resp.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateRoom = async (req, resp, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    resp.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, resp, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates }, }
    );
    resp.status(200).json("Room status has been updated");
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteRoom = async (req, resp, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    resp.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

//GET
export const getRoom = async (req, resp, next) => {
  try {
    const room = await Room.findById(req.params.id);
    resp.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//GET ALL
export const getRooms = async (req, resp, next) => {
  try {
    const rooms = await Room.find();
    resp.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
