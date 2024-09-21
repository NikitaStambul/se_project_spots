import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
  formValidationConfig,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setBtnText } from "../utils/helpers.js";

let selectedCardEl, selectedCardId;
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4775fc00-e1d6-4cc2-859b-b095cced12a0",
    "Content-Type": "application/json",
  },
});

const avatarImageEl = document.querySelector(".profile__avatar");

// profile edit
const editProfileModal = document.querySelector("#edit-profile-modal");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const avatarEl = document.querySelector(".profile__avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditForm = document.forms["edit-profile"];
const profileAvatarForm = document.forms["edit-avatar"];

profileAvatarBtn.addEventListener("click", () => openModal(editAvatarModal));
profileAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileEditBtn.addEventListener("click", () => {
  resetValidation([profileNameInput, profileDescriptionInput]);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);

// new post
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostForm = document.forms["new-post"];
const postSubmitBtn = newPostForm.querySelector(".modal__btn");

newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostForm.addEventListener("submit", handleNewPostSubmit);

// delete post
const deletePostModal = document.querySelector("#delete-post-modal");
const deletePostForm = document.forms["delete-post"];
deletePostForm.addEventListener("submit", handlePostDelete);

// preview
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionEl = previewModal.querySelector(".modal__caption");

const modals = document.querySelectorAll(".modal");
const cardList = document.querySelector(".cards__list");

function setModalCloseBtnListeners() {
  const closeButtons = document.querySelectorAll(".modal__close-btn");

  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });
}

function setModalOverlayCloseListeners() {
  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeModal(evt.target);
      }
    });
  });
}

function openModal(modal) {
  document.addEventListener("keydown", closeModalOnEscape);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", closeModalOnEscape);
  modal.classList.remove("modal_opened");
}

function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".modal_opened");
    modals.forEach(closeModal);
  }
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const saveBtnEl = evt.submitter;
  const { avatar } = evt.target.elements;

  setBtnText(saveBtnEl, false);
  api
    .editUserAvatar(avatar.value)
    .then((data) => {
      avatarEl.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => console.error(err))
    .finally(() => setBtnText(saveBtnEl, true));
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const saveBtnEl = evt.submitter;
  const { name, about } = evt.target.elements;

  setBtnText(saveBtnEl, false);
  api
    .editUserInfo({
      name: name.value,
      about: about.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => console.error(err))
    .finally(() => setBtnText(saveBtnEl, true));
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const addPostBtnEl = evt.submitter;
  const { name, link } = evt.target.elements;

  setBtnText(addPostBtnEl, true, "Add post", "Adding post...");
  api
    .addPost({
      name: name.value,
      link: link.value,
    })
    .then((cardData) => {
      const cardEl = getCardElement(cardData);
      cardList.prepend(cardEl);
      closeModal(newPostModal);
    })
    .catch((err) => console.error(err))
    .finally(() => setBtnText(saveBtnEl, false, "Add post", "Adding post..."));

  evt.target.reset();
  disableButton(postSubmitBtn, formValidationConfig);
}

function handlePostDelete(evt) {
  const submitDeleteBtn = evt.submitter;
  evt.preventDefault();

  setBtnText(submitDeleteBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCardEl.remove();
      closeModal(deletePostModal);
    })
    .catch((err) => console.error(err))
    .finally(() => setBtnText(submitDeleteBtn, false, "Delete", "Deleting..."));
}

function getCardElement(cardData) {
  const { _id: id, link, name, isLiked } = cardData;
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

  if (isLiked) {
    cardLikeBtn.classList.add("card__like-btn_is-liked");
  }

  cardLikeBtn.addEventListener("click", () => {
    const isLiked = cardLikeBtn.classList.contains("card__like-btn_is-liked");
    api
      .changeLikeStatus(id, isLiked)
      .then(() => cardLikeBtn.classList.toggle("card__like-btn_is-liked"))
      .catch((err) => console.error(err));
  });
  cardDeleteBtn.addEventListener("click", () => {
    selectedCardEl = cardElement;
    selectedCardId = id;

    openModal(deletePostModal);
  });
  cardImageEl.addEventListener("click", () => {
    previewImageEl.setAttribute("src", link);
    previewImageEl.setAttribute("alt", name + " image");
    captionEl.textContent = name;

    openModal(previewModal);
  });

  return cardElement;
}

function initialFetch() {
  api
    .getAppInfo()
    .then(([cards, userInfo]) => {
      cards.forEach((cardData) => {
        const cardEl = getCardElement(cardData);
        cardList.append(cardEl);
      });

      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      avatarImageEl.src = userInfo.avatar;
    })
    .catch(console.error);
}

enableValidation(formValidationConfig);
setModalCloseBtnListeners();
setModalOverlayCloseListeners();
initialFetch();
