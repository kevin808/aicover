const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/aicover/**',
      }
    ],
  },
}

module.exports = nextConfig 