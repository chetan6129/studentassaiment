const express = require('express')
const { createstudent, getstudent, deletestudent } = require('../controlller/studentcontroller')
const router=express.Router()


///student
router.post("/createstundent",createstudent)
router.delete('/deletestudent/:studentId',deletestudent)
router.get("/getstudent",getstudent)


router.all("/*" ,function(req,res){
    return res.status(404).send({msg:"enter the vaild endpoint"})
    })








module.exports = router