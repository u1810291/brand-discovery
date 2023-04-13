/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
})

const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
})
module.exports = nextConfig
