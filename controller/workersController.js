const workers = require('../model/workers');
const bcrypt= require('bcrypt');

const createWorkers = async (req, res) => {
    try {
        const {name,age,email,password,phoneNo,address} = req.body;
        const hashPassword = await bcrypt.hash(password,10)
      const add = await workers.address.create({
        ...address
      })
        const newUser = await workers.model.create({
            name,
            age,
            email,
            password : hashPassword,
            phoneNo,
            address:add
        })
        
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

const getWorkersById = async(req,res)=>{
    try{
        const id = req.params.id;
        const getUser = await workers.model.findOne().where("_id").equals(id)
        getUser.sayName()
        res.status(201).json(getUser);
    }catch(error){
        res.status(404).json({  message: "user Not Found!!" });
    }
} 

const getWorks = async(req,res)=>{
    try{
        const users = await workers.model.find().populate("address")
        res.status(201).json(users)
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

const updateWorkers = async(req,res) =>{
    
    try {
        const workerId = req.params.id;
        const { name, age, email, password, phoneNo, gender, streetNo, streetName, city, country } = req.body;
        const worker = await workers.model.findById(workerId);
        if (!worker) {
          return res.status(404).json({ message: 'Worker not found' });
        }
        
        const updateWorker = await workers.model.findByIdAndUpdate(workerId, { name, age, email, password, phoneNo, gender }, { new: true });
        
        let updatedAddress;

        if (worker.address) {
            updatedAddress = await workers.address.findByIdAndUpdate(worker.address, { streetNo, streetName, city, country }, { new: true });
        } 

        res.status(200).json({ message: 'Worker and address updated successfully', updateWorker, updatedAddress });
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
    
    


const updateWorkerAddress = async(req,res)=>{
try{
    const workersId = req.params.id;
    const {streetNo,streetName,city,country} = req.body;
    const worker = await workers.model.findById(workersId);
    
    if(!worker){
        return res.status(404).json({ message: 'Worker not found' });
    }

    let updateAddres;

    if(worker.address){
        updateAddres = await workers.address.findByIdAndUpdate(worker.address,{ streetNo, streetName, city, country }, { new: true })        
    }
    res.status(200).json({ message: 'Worker address updated successfully', updateAddres});
    
}catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' });

}
}

const deleteWorkers = async(req,res)=>{
    try {
        const workerId = req.params.id;
        const worker = await workers.model.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        if (worker.address) {
            await workers.address.findByIdAndDelete(worker.address);
        }

        await workers.model.findByIdAndDelete(workerId);

        res.status(200).json({ message: 'Worker and associated address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }


}

const numberOfWorkers = async(req,res)=>{
    try{
        const totalUsers = await workers.model.countDocuments()
        res.status(201).json(totalUsers)

    }catch(error){
        res.status(400).json({ message: error.message });
    }
}


const getWorksersWithHighestId = async (req, res) => {
    try {
        const highestIdUser = await workers.model.findOne().sort({ _id: -1 }).populate("address")
        console.log(highestIdUser.address.nameEmail);
        res.status(201).json(highestIdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getWorkersWithLowestId = async (req, res) => {
    try {
        const lowestIdUser = await workers.model.findOne().sort({ _id: 1 });
        res.status(200).json(lowestIdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getWorkersbyName = async(req,res)=>{
    try{
     const name = req.params.name;
     console.log(name);
     const username = await workers.model.findByName(name)
     if(username.length === 0){
        return res.status(404).json({message : "user not fount"}); 
     }
     res.status(200).json(username);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}



const findByEmail = async(req,res)=>{    
    try{      
     const email = req.params.email;
     const username = await workers.model.find().byEmail(email)
     if(username.length === 0){
        return res.status(404).json({message : "user not fount"}); 
     }
     res.status(200).json(username);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}



const findByCity = async(req,res)=>{
    try{
        const city = req.params.city;
        
        const workersInCity = await workers.model.findBycity(city);
        res.status(200).json(workersInCity);
       }catch(error){
           res.status(500).json({ message: error.message });
       }
}

const findByStreetName = async(req,res)=>{
    try{
        const streetName = req.params.streetName;
        console.log(streetName)
        const workersInCity = await workers.model.find().findByStreet(streetName);
        // const response = workersInCity.filter(item => item.address.streetName === streetName)
        res.status(200).json(workersInCity);
       }catch(error){
           res.status(500).json({ message: error.message });
       }
}
module.exports ={findByEmail,findByCity,getWorkersbyName,getWorkersWithLowestId,getWorksersWithHighestId,numberOfWorkers,deleteWorkers,updateWorkers,getWorks,createWorkers,getWorkersById,findByStreetName,updateWorkerAddress}