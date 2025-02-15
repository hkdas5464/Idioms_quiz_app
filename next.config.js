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
        "mongodb-client-encryption": false,
        kerberos: false,
        "@mongodb-js/zstd": false,
        "@aws-sdk/credential-providers": false,
        "gcp-metadata": false,
        snappy: false,
        socks: false,
        aws4: false,
      };
    }
    return config;
  },
};
