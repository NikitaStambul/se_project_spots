const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "  https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");

// profile edit
const editModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const projileNameInput = editModal.querySelector("#profile-name-input");
const profileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditForm = document.forms["edit-profile"];

profileEditBtn.addEventListener("click", () => {
  projileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});
profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);

// new post
const newPostModal = document.querySelector("#new-post-modal");
const newPostImageLinkInput = newPostModal.querySelector(
  "#post-image-link-input"
);
const newPostNameInput = newPostModal.querySelector("#post-name-input");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostForm = document.forms["new-post"];

newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostForm.addEventListener("submit", handleNewPostSubmit);

loadInitialCards();

// preview
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionEl = previewModal.querySelector(".modal__caption");

// close modal btns listeners
const closeButtons = document.querySelectorAll('.modal__close-btn');

closeButtons.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

// functions

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = projileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editModal);
}

function handleNewPostSubmit(event) {
  event.preventDefault();
  const link = newPostImageLinkInput.value;
  const name = newPostNameInput.value;
  newPostImageLinkInput.value = "";
  newPostNameInput.value = "";

  const cardEl = getCardElement({
    link,
    name,
  });

  cardsList.prepend(cardEl);
  closeModal(newPostModal);
}

function getCardElement({ link, name }) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardNameEl.textContent = name;
  cardImageEl.setAttribute("src", link);
  cardImageEl.setAttribute("alt", name + " image");
  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-btn_is-liked")
  );
  cardDeleteBtn.addEventListener("click", () => cardElement.remove());
  cardImageEl.addEventListener("click", () => {
    previewImageEl.setAttribute("src", link);
    previewImageEl.setAttribute("alt", name + " image");
    captionEl.textContent = name;

    openModal(previewModal);
  });

  return cardElement;
}

function loadInitialCards() {
  initialCards.forEach((cardData) => {
    const cardEl = getCardElement(cardData);
    cardsList.append(cardEl);
  });
}
