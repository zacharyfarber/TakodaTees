import { useQuery } from '@tanstack/react-query';

import { getRecentDrops } from '../apis/storeApi';
import SpotlightBackground from '../assets/images/spotlight_background.png';
import SpotlightShirt from '../assets/images/spotlight_shirt.png';
import SpotlightShort from '../assets/images/spotlight_short.png';
import SpotlightTagLine from '../assets/images/spotlight_tag_line.png';
import ProductSlider from '../components/ProductSlider';
import { Drop, Product } from '../types';

function HomePage() {
  const {
    isLoading,
    error,
    data: drops
  } = useQuery<Drop[]>({
    queryKey: ['recent-drops'],
    queryFn: getRecentDrops
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error occurred: ' + error;

  const renderDrops = () => {
    if (!drops) return null;

    return drops.map((drop: Drop) => {
      return (
        <div key={drop._id}>
          <p className="text-5xl font-nanum text-[#F0F0F0] text-center my-5">
            {drop.name}
          </p>

          <ProductSlider
            products={drop.products as Product[]}
            type="recent-drops"
          />
        </div>
      );
    });
  };

  return (
    <div className="bg-[#1E1E1E]">
      <div
        style={{ backgroundImage: `url(${SpotlightBackground})` }}
        className="w-full h-[37.5rem] bg-cover bg-center bg-no-repeat"
      >
        <div className="flex justify-center">
          <div className="w-[2rem] flex-none mr-auto"></div>
          <img
            src={SpotlightShirt}
            alt="spotlight shirt"
            className="w-[31.25rem] h-[31.25rem]"
          />

          <div className="flex flex-col items-center justify-center">
            <div className="h-[7.5rem]"></div>
            <img
              src={SpotlightShort}
              alt="spotlight shorts"
              className="w-[31.25rem] h-[31.25rem] self-end"
            />
          </div>
          <div className="flex-none ml-auto mt-[1rem] mr-[0.625rem]">
            <img src={SpotlightTagLine} alt="tag line" />
          </div>
        </div>
      </div>

      <div className="border-y-2 border-[#F0F0F0]">
        <div className="w-10/12 mx-auto mb-10">{renderDrops()}</div>
      </div>
    </div>
  );
}

export default HomePage;
