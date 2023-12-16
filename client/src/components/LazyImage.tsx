import { useEffect, useState } from 'react';

function LazyImage({
  src,
  alt,
  className
}: {
  src: string;
  alt: string;
  className?: string;
}) {
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

  return <img src={imageSrc} alt={alt} className={className} />;
}

export default LazyImage;
