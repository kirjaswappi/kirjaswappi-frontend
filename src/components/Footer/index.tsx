import BottomNav from './_components/BottomNav';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="fixed bottom-0 left-0 w-full shadow-sm bg-white  items-center justify-center ">
        <BottomNav />
        {/* <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          height="80"
          // viewBox="0 0 0 90"
          fill="none"
        >
          <g filter="url(#filter0_d_4047_10837)">
            <path
              d="M131.532 5.5H3.5V88H379V5.5H245.682C235.408 5.5 226.655 12.5199 219.88 20.2438C213.795 27.1813 204.274 33.5 190 33.5C175.361 33.5 164.889 27.4527 158.063 20.2715C150.889 12.7249 141.945 5.5 131.532 5.5Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_4047_10837"
              x="0"
              y="0"
              height="89.5"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-2" />
              <feGaussianBlur stdDeviation="1.75" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.605954 0 0 0 0 0.605954 0 0 0 0 0.605954 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_4047_10837"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_4047_10837"
                result="shape"
              />
            </filter>
          </defs>
        </svg> */}
      </div>
    </footer>
  );
}
