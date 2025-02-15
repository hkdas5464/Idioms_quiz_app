// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        "util/types": false,
        "timers/promises": false,
        "mongodb-client-encryption": false, // Ignore this optional module on the client
      };
    }
    return config;
  },
};
