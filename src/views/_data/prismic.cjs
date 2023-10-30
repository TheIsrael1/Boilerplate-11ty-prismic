// require('dotenv').config();
//
// const axios = require('axios');
// const prismic = require('@prismicio/client');
//
// const PRISMIC_REPO = process.env.PRISMIC_REPOSITORY;
// const PRISMIC_TOKEN = process.env.PRISMIC_ACCESS_TOKEN;
//
//
// /**
//  * Fetch data with axios
//  * @param url
//  * @param options
//  * @return {Promise<{statusText: *, json: (function(): Promise<unknown>), ok: boolean, status}|{statusText: string, json: (function(): Promise<unknown>), ok: boolean, status: number}>}
//  */
// const axiosAdapter = async (url, options = {}) => {
//   try {
//     const response = await axios({ url, ...options });
//     return {
//       ok: response.status >= 200 && response.status < 300,
//       status: response.status,
//       statusText: response.statusText,
//       json: () => Promise.resolve(response.data),
//     };
//   } catch (error) {
//     if (error.response) {
//       return {
//         ok: false,
//         status: error.response.status,
//         statusText: error.response.statusText,
//         json: () => Promise.resolve(error.response.data),
//       };
//     }
//     throw error;
//   }
// };
//
// const client = prismic.createClient(PRISMIC_REPO, {
//   accessToken: PRISMIC_TOKEN,
//   fetch: axiosAdapter,
// });
//
// module.exports = client;


// Pour utiliser ce client pour récupérer un type de document "about", :
// async function fetchAbout() {
//   return await client.getSingle('about');
// }
// fetchAbout().then((document) => {
//   console.log(document);
// })
