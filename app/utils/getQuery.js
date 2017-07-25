
let queryParams = null;

function parseQuery() {
  return location.search
    .substring(1)
    .split('&')
    .reduce((params, paramString) => {
      const [key, value] = paramString.split('=');
      return {
        ...params,
        [decodeURIComponent(key)]: decodeURIComponent(value),
      };
    }, {});
}

export default function getQuery() {
  if (!queryParams && window.location.search) {
    queryParams = parseQuery();
  }
  return queryParams;
}
