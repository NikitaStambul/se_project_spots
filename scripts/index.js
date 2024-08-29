const initialCards = [
  {
    name: "Val Thorens",
    link: "images/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "images/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "images/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "images/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "images/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// profile edit
const editModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const projileNameInput = editModal.querySelector("#profile-name-input");
const profileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditModalCloseBtn = editModal.querySelector(".modal__close-btn");
const profileEditForm = document.forms["edit-profile"];

profileEditBtn.addEventListener("click", () => {
  projileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});
profileEditModalCloseBtn.addEventListener("click", () => closeModal(editModal));
profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);

// new post
const newPostModal = document.querySelector("#new-post-modal");
const newPostImageLinkInput = newPostModal.querySelector(
  "#post-image-link-input"
);
const newPostNameInput = newPostModal.querySelector("#post-name-input");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModalCloseBtn = newPostModal.querySelector("#new-post-close-btn");
const newPostForm = document.forms["new-post"];

newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostModalCloseBtn.addEventListener("click", () => closeModal(newPostModal));
newPostForm.addEventListener("submit", handleNewPostSubmit);

loadInitialCards();

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
  const cardsList = document.querySelector(".cards__list");
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

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardNameEl.textContent = data.name;
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.name + " image");
  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-btn_is-liked")
  );
  cardDeleteBtn.addEventListener("click", () => cardElement.remove());

  return cardElement;
}

function loadInitialCards() {
  const cardsList = document.querySelector(".cards__list");

  initialCards.forEach((cardData) => {
    const cardEl = getCardElement(cardData);
    cardsList.append(cardEl);
  });
}
