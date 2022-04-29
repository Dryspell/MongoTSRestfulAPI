import express from 'express';
import controller from '../controllers/PriceListings';

const router = express.Router();

router.post('/create', controller.createPriceListings);
router.get('/read/:VariableNameId', controller.readPriceListings);
router.get('/read', controller.readAll);
// router.patch('/update/:VariableNameId', controller.updatePriceListings);
// router.delete('/delete/:VariableNameId', controller.deletePriceListings);

export = router;