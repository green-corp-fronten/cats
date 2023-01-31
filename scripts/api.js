// - GET (https://cats.petiteweb.dev/api/single/:user/show) - отобразить всех котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/ids) - отобразить все возможные айди котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/show/:id) - отобразить конкретного котика
// - POST (https://cats.petiteweb.dev/api/single/:user/add) - добавить котика
// - PUT (https://cats.petiteweb.dev/api/single/:user/update/:id) - изменить информацию о котике
// - DELETE (https://cats.petiteweb.dev/api/single/:user/delete/:id)- удалить котика из базы данных by id

const configApi = {
  url: 'https://cats.petiteweb.dev/api/single/Valdemar',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
};

 class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject({ ...res, message: 'error' });
  }
  getAllCats() {
    /// отобразить всех котиков
    return fetch(`${this._url}/show`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  getAllCatsId() {
    /// отобразить все возможные айди котиков
    return fetch(`${this._url}/ids`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  getCatById(id) {
    /// отобразить конкретного котика
    return fetch(`${this._url}/show/${id}`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  addNewCat(body) {
    return fetch(`${this._url}/add`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._onResponse);
  }
  updateCatById(id, data) {
    return fetch(`${this._url}/update/${id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onResponse);
  }
  deleteCatById(id) {
    /// удалить конкретного котика по айди
    return fetch(`${this._url}/delete/${id}`, {
      method: 'DELETE',
    }).then(this._onResponse);
  }
}

export const api = new Api(configApi);
// console.log(api);

// const newCat = {
//   id: 1673690003098,
//   name: 'Motroskn',
//   favorite: true,
//   rate: 1,
//   age: 10,
//   description: 'ласковый и пушистый котяра',
//   image: 'https://http.cat/100',
// };
// const newCatUpdated = {
//   id: 1673690003098,
//   name: 'MotrosknUpdated',
//   image: 'https://http.cat/100',
// };

// api.getAllCats();
// api.getAllCatsId();
// // api.getCatById(1673690003098);
// // api.addNewCat(newCat)
// api.updateCatById(1673690003098, newCatUpdated)

// api.deleteCatById(1673690003098);
