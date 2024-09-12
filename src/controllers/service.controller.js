const express = require('express'); 
const ItemService = require('../application/service')
const MongoItemRepository = require('../adapters/outbound/service.repository')
const responseHandler = require('../utils/responseHandler');

const router = express.Router();
const itemRepository = new MongoItemRepository();
const itemService = new ItemService(itemRepository);

router.get('/', async(req, res) => {
    try {
        const services = await itemService.getAllItems();

        await responseHandler.success(req, res, services, 201);
    } catch (error) {
        await responseHandler.error(req, res, 'Error al obtener servicios', 500);
    }
});

router.post('/', async(req, res) => {
    try {
       const { body } = req;

        const newSevice = await itemService.createItem(body);

        await responseHandler.success(req, res, newSevice, 201);
    } catch (error) {
        console.log(error);
        
        await responseHandler.error(req, res, 'Error al crear el servicio', 500);
    }
});

router.get('/:id', async(req, res) => {
     try {
        const { id } = req.params;
        const services = await itemService.getItem(id);

        await responseHandler.success(req, res, services, 201);
    } catch (error) {
        await responseHandler.error(req, res, 'Error al obtener servicios', 500);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const services = await itemService.updateItem(id, {nombre});

        if (!services) {
            return await responseHandler.error(req, res, 'Servicio no encontrado', 500);
        }
        await responseHandler.success(req, res, services, 201);
    } catch (error) {
        await responseHandler.error(req, res, 'Error al actualizar el servicio', 500);
    }
});

router.delete('/:id', async(req, res) => {
   try {
    const { id } = req.params;

    const services = await itemService.deleteItem(id);

    if (!services) {
        return await responseHandler.error(req, res, 'Reserva no encontrada', 500);
    }

    await responseHandler.success(req, res, services, 201); 
  } catch (error) {
    await responseHandler.error(req, res, 'Error al cancelar la reserva', 500); 
  }
});

module.exports = router;