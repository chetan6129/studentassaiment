const studentmodel = require("../model/studentmodel.js")


const { isValidObjectId, isValiDNUMBER, isValidString} = require("../validator/vaild.js")

//Name Subject Marks
const createstudent = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "can't create student without data" })
        let { Name,Subject, Marks } = data

        if (!Name) return res.status(400).send({ status: false, message: "Name is mandatory" })
        if (!isValidString(Name.trim())) return res.status(400).send({ status: false, message: "put a valid first name" })

        if (!Subject) return res.status(400).send({ status: false, message: "subject is mandatory" })
        if (!isValidString(Subject.trim())) return res.status(400).send({ status: false, message: "put a valid last name" })
        if (!isValiDNUMBER(Marks)) return res.status(400).send({ status: false, msg: "put a valid number" })
        if (!Marks) return res.status(400).send({ status: false, message: "Number is mandatory" })
              
        
        const oldstudent=await studentmodel.findOne({Name:data.Name,Subject:data.Subject})
        if (oldstudent){
            let marks=oldstudent.Marks+data.Marks 
            const update=await studentmodel.findOneAndUpdate({Name:data.Name,Subject:data.Subject},{Marks:marks},{new:true})
            return res.status(200).send({status:true,data:update})
        }
        
        let student = await studentmodel.create(data)
        return res.status(201).send({status:true,message:"success",data:student})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getstudent= async function(req,res){

    try{
        data=req.query
        
        const student=await studentmodel.find(data) 
        if(student.length==0)return res.status(404).send({status:false,msg:"esa koi student nhi hai"})
         return res.status(200).send({status:true,data:student})
    }
    catch(err){
       return res.status.send({status:false,message:err.message})
    }
}
const deletestudent= async function(req,res){
    try{
        let Id= req.params.studentId
        if(!isValidObjectId(Id)){return res.status(400).send({status:false,message:"invalid studentId"})}
        let findstudent= await studentmodel.findOne({_id:Id,isdeleted:false })
        if(!findstudent){return res.status(404).send({status:false,message:"student not found"})}
        
        const check= await studentmodel.findById(Id)
        if(!check)return res.status(400).send({status:false,msg:"no student"})
         if(check.isDeleted==true){return res.status(200).send({status:true,msg:"it is already deleted"})}
         await studentmodel.findOneAndUpdate({_id:Id},{isDeleted:true})
         
 
        return res.status(200).send({status:false,data:"deleted Succesfully"})
    }
    catch(error){
     return res.status(500).send({status:false,message:error.message})
    }
 }

module.exports.createstudent = createstudent
module.exports.getstudent=getstudent
module.exports.deletestudent=deletestudent