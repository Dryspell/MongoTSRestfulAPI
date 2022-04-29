import { any } from 'joi';
import mongoose, {Document, Schema} from 'mongoose';

export interface IPriceListings {
    coin: string,
    days: number,
    currency: string,
}

export interface IPriceListingsModel extends IPriceListings, Document {}

const PriceListingsSchema: Schema = new Schema({
        coin: { type: String, required: true },
        days: { type: Number, required: true },
        currency: { type: String, required: true },
      },
      {
        timestamps: true,
        // versionKey: true,
      }
);

export default mongoose.model<IPriceListingsModel>('PriceListings', PriceListingsSchema);