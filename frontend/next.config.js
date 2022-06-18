/**  @type {import('next').NextConfig} */
require('dotenv').config();

module.exports = { 
  nextConfig: {
    reactStrictMode: true,
  },
  env: {
    BASEURL: process.env.BASEURL
  }
};
