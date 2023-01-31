// const card = document.querySelector('#tmp-card');
// const template = document.querySelector('#card-template').content;

import { api } from './api.js';

// console.log({ card });
// console.log({ template });

const onDelete = (id) => {
  console.log(id);
  if (confirm('Are you shure?')) {
    // api.deleteCat(id).then(() => {
    //   // updateLocalStorage(cat, 'DELETE_CAT');
    //   renderCats();
    //   popupCatInfo.close();
    // });
  }
};

export class Card {
  constructor(dataCat, selectorTemplate, onClickToEdit = () => {}) {
    this._data = dataCat;
    this._selectorTemplate = selectorTemplate;
    this._onClickToEdit = onClickToEdit;

    // this._handleCatTitle = handleCatTitle
  }

  _getTemplate() {
    // возвращает содержимое шаблона в виде дом -узла
    // узел типа тег  btn div
    // узел типа text  какойто текст
    // узел типа 'элемент
    // узел типа - документ фрагмент у него свойство content
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector('.card');
    // документ фрагмент -  это легковесная версия ноды типа элемент.
  }
  getElement() {
    this.element = this._getTemplate().cloneNode(true);
    // const cardTitle = this.element.querySelector('.card__name');
    const cardImage = this.element.querySelector('.card__image');
    const cardLike = this.element.querySelector('.card__like');
    const cardLink = this.element.querySelector('.card__link');
    const deleteBtn = this.element.querySelector('.card__delete');
    this.cardTitle = this.element.querySelector('.card__name');

    deleteBtn.setAttribute('id', `btn-${this._data.id}`);
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you shure?')) {
        api.deleteCatById(this._data.id).then(() => {
          const elem = document.getElementById(`btn-${this._data.id}`);
          console.log({ elem });
          // updateLocalStorage(cat, 'DELETE_CAT');
          elem.parentElement.remove();
        });
      }
    });

    if (!this._data.favorite) {
      cardLike.remove();
    }

    this.cardTitle.textContent = this._data.name ?? 'Barsik';
    cardImage.src =
      this._data.image ||
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

    cardLink.addEventListener('click', (e) => {
      console.log('>>>', this._data.id);
      this._onClickToEdit(this.element, this._data.id);
    });
    return this.element;
  }

  setEventListener() {
    // console.log('', this.cardTitle);
    // this.cardTitle.addEventlistener('click', ()=> this._handleCatTitle(this))
  }
}

//  const card = new Card(cats[0], '#card-template');

// card.getElement();

// console.log({ card });

// {
//   "name": "Базиль",
//   "image": "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
//   "age": 2,
//   "rate": 10,
//   "favorite": false,
//   "description": "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
//   "id": 2
// },
