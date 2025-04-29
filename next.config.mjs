/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "trysai.s3.us-west-1.amazonaws.com",
      "localhost",
    ],
  },
};

export default nextConfig;
