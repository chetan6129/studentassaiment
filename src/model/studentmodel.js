const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
//Name Subject Marks
const stundetschema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true

    }, Subject: {
        type: String,
        trim: true,required:true
       

    }, Marks: {
        type: Number,
        trim: true,required:true
    },isDeleted:{
        type:Boolean,
       default:false
    },
   

}, { timestamps: true })

module.exports = mongoose.model('studentdata',stundetschema)