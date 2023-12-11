const express = require("express");
const router = express.Router();
const Employees = require("../schemas/Employees");

router.get("/:search", async (req, res) => {
  const searchQuery = new RegExp(req.params.search, "i");
  try {
    const employees = await Employees.find({
      $or: [
        { firstname: searchQuery },
        { lastname: searchQuery },
        { email: searchQuery },
      ],
    });

    if (!employees || employees.length === 0) {
      return res.status(404).send("No matching employees found");
    }

    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error searching for employees: ${err.message}`);
  }
});

module.exports = router;
