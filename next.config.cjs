/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
};

module.exports = nextConfig;

// If you enable Payload CMS later, follow PAYLOAD-SETUP.md and then replace the export with:
// const { withPayload } = require('@payloadcms/next/withPayload')
// module.exports = withPayload(nextConfig)
