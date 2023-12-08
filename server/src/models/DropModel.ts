import { model, Schema } from 'mongoose';

const DropSchema = new Schema(
  {
    name: String,
    access: {
      type: String,
      default: 'private',
      enum: ['public', 'private']
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
);

const DropModel = model('Drop', DropSchema);

export default DropModel;
