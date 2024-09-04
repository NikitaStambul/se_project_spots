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
const profileNameInput = editModal.querySelector("#profile-name-input");
const profileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditForm = document.forms["edit-profile"];

profileEditBtn.addEventListener("click", () => {
  resetValidation([profileNameInput, profileDescriptionInput]);
  setProfileFormValues();
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
const postSubmitBtn = newPostForm.querySelector(".modal__submit-btn");

newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostForm.addEventListener("submit", handleNewPostSubmit);

// preview
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionEl = previewModal.querySelector(".modal__caption");

// close modal btns listeners
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// close modals on overlay click

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(event.target);
    }
  });
});

// functions

function setProfileFormValues() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openModal(modal) {
  document.addEventListener("keydown", closeModalOnEscape);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", closeModalOnEscape);
  modal.classList.remove("modal_opened");
}

function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal_opened");
    modals.forEach(closeModal);
  }
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editModal);
}

function handleNewPostSubmit(event) {
  event.preventDefault();
  const link = newPostImageLinkInput.value;
  const name = newPostNameInput.value;
  event.target.reset();

  const cardEl = getCardElement({
    link,
    name,
  });

  cardsList.prepend(cardEl);
  closeModal(newPostModal);
  disableButton(postSubmitBtn, formValidationConfig);
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

setProfileFormValues();
loadInitialCards();
