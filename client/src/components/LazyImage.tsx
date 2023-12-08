import { useEffect, useState } from 'react';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  if (isLoading) {
    return <span className="image-loader"></span>;
  }

  return <img src={imageSrc} alt={alt} />;
}

export default LazyImage;
