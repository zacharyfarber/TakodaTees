import useCart from '../hooks/useCart';
import { CartItemType } from '../types';
import LazyImage from './LazyImage';

type Props = {
  cartItem: CartItemType;
};

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const {
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    updateCartItemQuantity,
    removeFromCart
  } = useCart();

  const { item, count } = cartItem;

  const {
    product: { name: productName, images, price },
    variant: { _id: variantId, name: variantName },
    color,
    size
  } = item;

  let image = '';

  if (images)
    image = Object.values(images)[0]
      .split(',')
      .filter((image) => {
        return (
          image.includes('thumbnail') && !image.includes('color_thumbnail')
        );
      })[0];

  return (
    <div key={variantName}>
      <button onClick={() => removeFromCart(variantId)}>Remove Item</button>

      <div className="h-20 w-20">
        <LazyImage src={image} alt={variantName} />
      </div>

      <div>
        <p>{productName}</p>

        <div>
          <p>{color}</p>

          <p>{size}</p>
        </div>
      </div>

      <p>{price}</p>

      <div>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) =>
            updateCartItemQuantity(variantId, parseInt(e.target.value))
          }
        />

        <button onClick={() => increaseCartItemQuantity(variantId)}>+</button>

        <button onClick={() => decreaseCartItemQuantity(variantId)}>-</button>
      </div>
    </div>
  );
};

export default CartItem;
