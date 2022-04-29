import { NextFunction, request, Request, Response } from 'express';
import mongoose from 'mongoose';
import PriceListings from '../models/PriceListings';
import axios from "axios";

export const HistoricalChart = (id:any, days = 365, currency:string) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const createPriceListings = (req: Request, res: Response, next: NextFunction) => {
  const {  coin="bitcoin", days=1, currency="usd" } = req.body;
  let historicData:any = [];

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin, days, currency));
    console.log(data);
    historicData = data;
  };
  fetchHistoricData();

  const priceListing = new PriceListings({
    _id: new mongoose.Types.ObjectId(),
     data: historicData,
  });

  return priceListing
    .save()
    .then((priceListing) => res.status(201).json({ priceListing }))
    .catch((error) => res.status(500).json({ error }));
};

const readPriceListings = (req: Request, res: Response, next: NextFunction) => {
  const priceListingId = req.params.priceListingId;

  return PriceListings.findById(priceListingId)
    .then((priceListing) =>
      priceListing
        ? res.status(200).json({ priceListing })
        : res.status(404).json({ message: 'PriceListings not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return PriceListings.find()
    .then((priceListings) =>
      priceListings
        ? res.status(200).json({ priceListings })
        : res.status(404).json({ message: 'PriceListings not found' })
    )
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

export default {
  createPriceListings,
  readPriceListings,
  readAll,
//   updatePriceListings,
//   deletePriceListings,
};
