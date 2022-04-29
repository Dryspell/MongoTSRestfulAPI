"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalChart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PriceListings_1 = __importDefault(require("../models/PriceListings"));
const axios_1 = __importDefault(require("axios"));
const HistoricalChart = (id, days = 365, currency) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
exports.HistoricalChart = HistoricalChart;
const createPriceListings = (req, res, next) => {
    const { coin = "bitcoin", days = 1, currency = "usd" } = req.body;
    let historicData = [];
    const fetchHistoricData = () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield axios_1.default.get((0, exports.HistoricalChart)(coin, days, currency));
        console.log(data);
        historicData = data;
    });
    fetchHistoricData();
    const priceListing = new PriceListings_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        data: historicData,
    });
    return priceListing
        .save()
        .then((priceListing) => res.status(201).json({ priceListing }))
        .catch((error) => res.status(500).json({ error }));
};
const readPriceListings = (req, res, next) => {
    const priceListingId = req.params.priceListingId;
    return PriceListings_1.default.findById(priceListingId)
        .then((priceListing) => priceListing
        ? res.status(200).json({ priceListing })
        : res.status(404).json({ message: 'PriceListings not found' }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return PriceListings_1.default.find()
        .then((priceListings) => priceListings
        ? res.status(200).json({ priceListings })
        : res.status(404).json({ message: 'PriceListings not found' }))
        .catch((error) => res.status(500).json({ error }));
};
// const updatePriceListings = (req: Request, res: Response, next: NextFunction) => {
//   const priceListingId = req.params.priceListingId;
//   return PriceListings.findById(priceListingId)
//     .then((priceListing) => {
//       if (priceListing) {
//         priceListing.set(req.body);
//         return priceListing
//           .save()
//           .then((priceListing) => res.status(200).json({ priceListing }))
//           .catch((error) => res.status(500).json({ error }));
//       } else {
//         res.status(404).json({ message: 'PriceListings not found' });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };
// const deletePriceListings = (req: Request, res: Response, next: NextFunction) => {
//   const priceListingId = req.params.priceListingId;
//   return PriceListings.findByIdAndRemove(priceListingId)
//     .then((priceListing) =>
//       priceListing
//         ? res.status(200).json({ message: 'PriceListings deleted' })
//         : res.status(404).json({ message: 'PriceListings not found' })
//     )
//     .catch((error) => res.status(500).json({ error }));
// };
exports.default = {
    createPriceListings,
    readPriceListings,
    readAll,
    //   updatePriceListings,
    //   deletePriceListings,
};
