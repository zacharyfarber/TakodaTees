import { model, Schema } from 'mongoose';

const VariantSchema = new Schema({
  printfulId: Number,
  name: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

const VariantModel = model('Variant', VariantSchema);

export default VariantModel;
