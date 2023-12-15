function CheckoutCheckIcon({ status }: { status: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="33"
        viewBox="0 0 34 33"
        fill="none"
      >
        <g clipPath="url(#clip0_113_810)">
          <path
            d="M17.3681 29.9725C9.70954 29.9725 3.50146 23.8731 3.50146 16.3486C3.50146 8.82416 9.70954 2.72476 17.3681 2.72476C25.0266 2.72476 31.2347 8.82416 31.2347 16.3486C31.2347 23.8731 25.0266 29.9725 17.3681 29.9725ZM15.9856 21.7982L25.7893 12.1647L23.8285 10.2383L15.9856 17.9453L12.0627 14.0911L10.102 16.0176L15.9856 21.7982Z"
            fill={status === 'complete' ? '#3BEF38' : '#1E1E1E'}
          />
        </g>
        <defs>
          <clipPath id="clip0_113_810">
            <rect
              width="33.2798"
              height="32.6973"
              fill="white"
              transform="translate(0.728027)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default CheckoutCheckIcon;
