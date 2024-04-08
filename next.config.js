/** @type {import('next').NextConfig} */
require("dotenv").config;
const nextConfig = {
  env: {
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
