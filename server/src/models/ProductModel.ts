import { model, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    colors: {
      type: Map,
      of: String
    },
    sizes: {
      type: Array,
      of: String
    },
    images: {
      type: Map,
      of: Schema.Types.Mixed
    },
    description: String,
    details: String,
    category: {
      type: String,
      enum: ['Tops', 'Bottoms', 'Accessories']
    },
    keywords: {
      type: Array,
      of: String
    },
    drop: {
      type: Schema.Types.ObjectId,
      ref: 'Drop'
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Variant'
      }
    ]
  },
  { timestamps: true }
);

const ProductModel = model('Product', ProductSchema);

export default ProductModel;
