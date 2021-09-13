import Prismic from "@prismicio/client";

const url = process.env.REACT_APP_PRISMIC_API_URL;
const token = process.env.REACT_APP_PRISMIC_SECRET_CODE;

const Client = Prismic.client(url, { accessToken: token });

export default Client;
