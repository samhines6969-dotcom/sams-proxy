// Ultraviolet configuration
self.__uv$config = {
  prefix: '/search/',
  encodeUrl: function (url) {
    const key = 'uv';
    let result = '';
    for (let i = 0; i < url.length; i++) {
      const charCode = url.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  decodeUrl: function (encoded) {
    try {
      const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(base64);
      const key = 'uv';
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
      }
      return result;
    } catch {
      return '';
    }
  },
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  sw: '/uv/uv.sw.js',
  bare: {
    server: typeof window !== 'undefined' ? window.location.origin + '/bare/' : '/bare/',
    directory: '/bare/',
    version: 'v2',
    protocol: 'ws:',
  },
};
