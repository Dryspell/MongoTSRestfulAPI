"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const PriceListings_1 = __importDefault(require("../controllers/PriceListings"));
const router = express_1.default.Router();
router.post('/create', PriceListings_1.default.createPriceListings);
router.get('/read/:VariableNameId', PriceListings_1.default.readPriceListings);
router.get('/read', PriceListings_1.default.readAll);
module.exports = router;
