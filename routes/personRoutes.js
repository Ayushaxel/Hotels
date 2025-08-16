const express= require('express');
const router= express.Router();
const Person= require('./../models/person')

// insert person data
router.post("/", async (req, res) => {
  try {
    const person = req.body;
    const newPerson = new Person(person);
    const result = await newPerson.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create person" });
    console.log(error);
  }
});

// get all perosn  data
router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      if (data.length === 0) {
        return res.status(404).json({ message: "No persons found" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to get persons" });
      console.log(error);
    }

});

//get data work type
router.get("/:type", async (req, res) => {
  try {
      const type = req.params.type;
    if (type == "Chef" || type == "Waiter" || type == "Manager") {
    
      const data = await Person.find({ work: type });
      res.status(200).json(data);
    }
    else{
      res.status(404).json("invaild workType")
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get person by work type" });
  }
});
// delete person data
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Person.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "person data deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete person" });
    console.log(error);
  }
});

// update person data
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Person.findByIdAndUpdate(id, data, { new: true,runValidators:true});
    if (!result) {
      res.status(404).json({ error: "Person not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update person" });
    console.log(error);
  }
});

module.exports= router;