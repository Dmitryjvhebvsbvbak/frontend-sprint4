// @todo: Темплейт карточки
const template = document.getElementById('card-template').content;
const templateImg = template.querySelector('.card__image');
const templateTitle = template.querySelector('.card__title');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const cardFormElement = cardPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescript = document.querySelector('.profile__description');
const nameInputProfilePopup = profilePopup.querySelector('.popup__input_type_name');
const descriptInputProfilePopup = profilePopup.querySelector('.popup__input_type_description');
const nameInputCardPopup = cardPopup.querySelector('.popup__input_type_card-name');
const urlInputCardPopup = cardPopup.querySelector('.popup__input_type_url');
const captionImagePopup = imagePopup.querySelector('.popup__caption');
const imgCardImagePopup = imagePopup.querySelector('.popup__image');

// @todo: Функция создания карточки
const createCard = (title, srcImg) => {
  const card = template.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  cardImg.src = srcImg;
  cardImg.alt = title;
  card.querySelector('.card__title').textContent = title;
  cardImg.addEventListener('click', () => {
    captionImagePopup.textContent = title;
    imgCardImagePopup.src = srcImg;
    imgCardImagePopup.alt = title;
    openModal(imagePopup);
  });
  return card;
};

// @todo: Функция удаления карточки
cardList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }
});

// @todo: Вывести карточки на страницу
const renderCard = (name, link) => {
  cardList.prepend(createCard(name, link));
};

initialCards.map(({ name, link }) => renderCard(name, link));

// @todo: Открытие и закрытие модальных окон
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
  nameInputProfilePopup.value = profileName.textContent;
  descriptInputProfilePopup.value = profileDescript.textContent;
  openModal(profilePopup);
});

profileAddButton.addEventListener('click', () => openModal(cardPopup));

popups.forEach(popup => {
  const buttonClose = popup.querySelector('.popup__close');
  buttonClose.addEventListener('click', () => closeModal(popup));
});

// @todo: Обработка форм
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfilePopup.value;
  profileDescript.textContent = descriptInputProfilePopup.value;
  closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(nameInputCardPopup.value, urlInputCardPopup.value);
  cardFormElement.reset();
  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

// @todo: Лайк карточки
cardList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
});