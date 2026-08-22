// Ultraviolet bundle stub - provides the __uv$config global
// In production, this would be the full Ultraviolet bundle from @mercuryworkshop/ultraviolet
(function () {
  if (typeof self !== 'undefined' && !self.__uv$config) {
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
        server: '/bare/',
        directory: '/bare/',
        version: 'v2',
        protocol: 'ws:',
      },
    };
  }
})();
