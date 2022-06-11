/**  @type {import('next').NextConfig} */
require('dotenv').config();

module.exports = { 
  nextConfig: {
    reactStrictMode: true,
  },
  env: {
    BASE_URL: process.env.BASEURL
  }
};
