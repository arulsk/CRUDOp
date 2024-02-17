const express = require('express');
const route = express.Router();
const userController = require('../controller/workersController');

route.post('/createWorker',userController.createWorkers);
route.get('/getWorkers',userController.getWorks);
route.get('/getWorkerById/:id',userController.getWorkersById);
route.put('/updateWorker/:id',userController.updateWorkers);
route.put('/workers/updateAddress/:id',userController.updateWorkerAddress)
route.delete('/deleteWorker/:id',userController.deleteWorkers);
route.get('/noOfWorks',userController.numberOfWorkers);
route.get('/getWorkerWithHighestId',userController.getWorksersWithHighestId);
route.get('/getWorkerWithLowestId',userController.getWorkersWithLowestId)
route.get('/getWorkerByName/:name',userController.getWorkersbyName);
route.get('/byEmail/:email',userController.findByEmail)
route.get('/findByCity/:city',userController.findByCity)
route.get('/findByStreetName/:streetName',userController.findByStreetName)
module.exports = route;