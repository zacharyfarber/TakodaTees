// Notes: When switching colors switch back to front image

import { useContext } from 'react';
import Slider from 'react-slick';

import ProductContext from '../contexts/ProductContext';
import { Product } from '../types';
import LazyImage from './LazyImage';

function ProductImages({ product }: { product: Product }) {
  const { selectedColor } = useContext(ProductContext)!;

  const { name, images } = product;

  const selectedColorImages =
    images && images[selectedColor] ? images[selectedColor].split(',') : [];

  const imagesToDisplay: string[] = [];

  const frontImage = selectedColorImages.find((image) =>
    image.includes('front')
  );

  if (frontImage) {
    imagesToDisplay.push(frontImage);
  }

  const backImage = selectedColorImages.find((image) => image.includes('back'));

  if (backImage) {
    imagesToDisplay.push(backImage);
  }

  const sliderSettings = {
    customPaging: function (index: number) {
      return (
        <div>
          <LazyImage
            src={imagesToDisplay[index]}
            alt={`${name}_thumb_${index}`}
            className="h-[6rem] w-[6rem]"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const renderImages = () => {
    return imagesToDisplay.map((image, index) => {
      return (
        <div key={`${name}_image_${index}`}>
          <LazyImage src={image} alt={name} />
        </div>
      );
    });
  };

  return (
    <div>
      <Slider {...sliderSettings}>{renderImages()}</Slider>
    </div>
  );
}

export default ProductImages;
