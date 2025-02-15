// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: false,
          tls: false,
          fs: false,
          child_process: false,
          "util/types": false,
        };
      }
      return config;
    },
  };
  