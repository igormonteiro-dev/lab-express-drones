const Drone = require("../models/Drone.model");
const mongoose = require("mongoose");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

require("../db/index");

(async () => {
  try {
    // await Drone.deleteMany();

    const insertedDrones = await Drone.insertMany(drones);

    console.log(`${insertedDrones.length} drones were created`);

    return mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
})();
