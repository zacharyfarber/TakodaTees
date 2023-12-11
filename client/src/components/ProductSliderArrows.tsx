function ProductSliderArrows({
  direction,
  className,
  onClick
}: {
  direction: string;
  className?: string;
  onClick?: () => void;
}) {
  const svgSettings = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '25',
    height: '25',
    viewBox: '0 0 25 25',
    fill: 'none',
    className: `${className} translate-y-[-150%]`,
    onClick
  };

  if (direction === 'left') {
    return (
      <svg {...svgSettings}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 15C23.8278 20.7023 18.7303 25 12.6263 25C5.65774 25 8.4795e-07 19.3988 5.46392e-07 12.5C2.44835e-07 5.60116 5.65774 -2.47308e-07 12.6263 -5.51911e-07C18.7303 -8.18729e-07 23.8278 4.29767 25 10L13.8889 10L13.8889 6.87442L5.05051 12.5L13.8889 18.1244L13.8889 15L25 15Z"
          fill="#F0F0F0"
        />
      </svg>
    );
  }

  if (direction === 'right') {
    return (
      <svg {...svgSettings}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-6.55671e-07 15C1.17218 20.7023 6.26967 25 12.3737 25C19.3423 25 25 19.3988 25 12.5C25 5.60116 19.3423 -2.47308e-07 12.3737 -5.51912e-07C6.26967 -8.18729e-07 1.17219 4.29767 -4.37114e-07 10L11.1111 10L11.1111 6.87442L19.9495 12.5L11.1111 18.1244L11.1111 15L-6.55671e-07 15Z"
          fill="#F0F0F0"
        />
      </svg>
    );
  }

  return null;
}

export default ProductSliderArrows;
