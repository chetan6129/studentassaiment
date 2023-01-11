const mongoose= require("mongoose")

//=========================================VALIDATIONS=====================================================//
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidString = (String) => {
    const regexName=/^[a-zA-Z ]+$/;
    return regexName.test(String)
  }
 const isValiDNUMBER = (Number) => {
    const regexName=/^[1-9]?[0-9]{1}$|^100$/;
    return regexName.test(Number)
  }

  
  
  module.exports={isValidObjectId,isValidString,isValiDNUMBER}