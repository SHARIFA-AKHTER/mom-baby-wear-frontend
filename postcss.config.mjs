/* eslint-disable import/no-anonymous-default-export */
/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: {
   "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

// import tailwindcss from "@tailwindcss/postcss";
// import autoprefixer from "autoprefixer";

// export default {
//   plugins: [
//     tailwindcss(),
//     autoprefixer(),
//   ],
// };