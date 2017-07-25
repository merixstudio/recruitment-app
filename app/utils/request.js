class Request {
  constructor() {
    this.request = {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.store = null;
  }
  req(url, method, data = null) {
    const options = {
      ...this.request,
      method,
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const request = fetch(url, options);
    return request.then((response) => {
      if (response.status >= 200 && response.status <= 302) {
        return response;
      }
      throw new Error();
    });
  }

  get(url) {
    return this.req(url, 'GET').then(response => response.json());
  }

  post(url, data) {
    return this.req(url, 'POST', data).then(response => response.json());
  }

  put(url, data) {
    return this.req(url, 'PUT', data).then(response => response.json());
  }

  options(url) {
    return this.req(url, 'OPTIONS').then(response => response.json());
  }

  patch(url, data) {
    return this.req(url, 'PATCH', data).then(response => response.json());
  }

  remove(url, data) {
    return this.req(url, 'DELETE', data).then(response => response);
  }

  setStore(store) {
    this.store = store;
  }
}

export default new Request();
