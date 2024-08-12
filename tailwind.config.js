/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          xsm: "100%",
          xm: "100%",
          xlg: "100%",
          sm: "100%",
          md: "100%",
          tab: "100%",
          lg: "1024px",
          xl: "1245px",
        },
        padding: {
          DEFAULT: "1rem",
          xl: "0rem",
        },
      },
      colors: {
        primary: "#114074",
        secondary: "#B90E25",
        white: "#FFFFFF",
        black: "#090909",
        grey: "#777777",
        night:"#363739",
        gray:"#CDCDCD",
        grayDark:"#9B9B9C"
      },
      // fontSize: {

      // },
      borderRadius: {
        '5px':"5px"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xsm: "320px",
        xm: "390px",
        xlg: "425px",
        sm: "640px",
        md: "768px",
        tab: "992px",
        lg: "1024px",
        xl: "1224px",
      },
      spacing: {
        "1px": "1px",
      },
      gap: {
        "19px": "19px",
      },
      backgroundImage: {
        // "footer-background": "url('/src/assets/images/footer-bg.png')",
        // "campaign-background": "url('/src/assets/images/campaign_bg_cover.jpg')",
        // "campaign-page-background-sm": "url('/src/assets/images/campaign-bg-sm.jpg')",
        // "deals-background": "url('https://i.ibb.co/1Rc430n/Group-48695.jpg')",
        // "deals-background-sm": "url('/src/assets/images/dealOfTheWeekBG.jpg')",
      },
      boxShadow: {
        'custom-box-shadow':"0px 0px 5px #64646439"
      },
      dropShadow: {},
    },
  },
  plugins: [],
}