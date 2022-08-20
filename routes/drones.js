const express = require("express");
const router = express.Router();
(mongoose = require("mongoose")), (Drone = require("../models/Drone.model"));

//Todo Iteration #2: List the drones

router.get("/drones", async (req, res, next) => {
  try {
    const drones = await Drone.find();

    // dont need status 200
    res.json(drones);
    console.log(drones);
  } catch (error) {
    next(error);
  }
});

//Todo Iteration #3: Add a new drone

router.post("/drones", async (req, res, next) => {
  try {
    const newDrone = req.body;
    const createdDrone = await Drone.create(newDrone);

    res.status(201).json(createdDrone);
  } catch (error) {
    res.status(400).json(`There is an error ${error}`);
  }
});

//Todo Iteration #4: Update the drone

router.post("/drones/:id", async (req, res, next) => {
  try {
    const [droneId, droneUpdate] = [req.params.id, req.body],
      updatedDrone = await Drone.findByIdAndUpdate(droneId, droneUpdate, {
        new: true,
      });

    return res.status(200).json(updatedDrone);
  } catch (error) {
    if (error.kind === `ObjectId`) {
      return res
        .status(404)
        .json({ message: `No such drone with id: ${req.params.id}` });
    }
    return res.status(400).json({ message: error.message });
  }
});

//Todo Iteration #5: Delete the drone

router.delete("/drones/:id", async (req, res, next) => {
  try {
    const droneId = req.params.id;

    await Drone.findByIdAndDelete(droneId);

    return res.status(204).send();
  } catch (error) {
    return res
      .status(404)
      .json({ message: `No such drone with id: ${req.params.id}` });
  }
});

module.exports = router;
