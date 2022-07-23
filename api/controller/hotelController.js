import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//CREATE
export const createHotel = async (req, resp, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    resp.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateHotel = async (req, resp, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    resp.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteHotel = async (req, resp, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    resp.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

//GET
export const getHotel = async (req, resp, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    resp.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//GET ALL
export const getHotels = async (req, resp, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    resp.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, resp, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    resp.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, resp, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartementCount = await Hotel.countDocuments({ type: "apartement" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const vellaCount = await Hotel.countDocuments({ type: "vella" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    resp.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartement", count: apartementCount },
      { type: "resort", count: resortCount },
      { type: "vella", count: vellaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
