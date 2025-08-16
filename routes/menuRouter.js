const express = require("express");
const router = express.Router();
const MenuItems = require("./../models/menu");

//Menu Insert
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItems(data);
    const result = await newMenuItem.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
    console.log(error);
  }
});

// get all data of menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error", error);
  }
});

//delete menu item
router.delete("/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await MenuItems.findByIdAndDelete(id);
        if(!result){
            res.status(404).json({error:"Menu item not found"});
        }
        else{
            res.status(200).json({message:"Menu item deleted successfully"});
        }
    }catch(error){
        res.status(500).json({error:"Failed to delete menu item"});
        console.log(error);
    }
});

//update menu item

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const data=req.body;
        const result = await MenuItems.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });
        if(!result){
            res.status(404).json({error:"Menu item not found"});
        }else{
            res.status(200).json(result);
        }
    }catch(error){
        res.status(500).json({error:"Failed to update menu item"});
        console.log(error);
    }
})

module.exports= router;