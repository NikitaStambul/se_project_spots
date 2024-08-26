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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const projileNameInput = editModal.querySelector("#profile-name-input");
const profileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const editBtn = document.querySelector(".profile__edit-btn");
const closeBtn = editModal.querySelector(".modal__close-btn");
editBtn.addEventListener("click", openEditModal);
closeBtn.addEventListener("click", closeEditModal);

const editForm = editModal.querySelector("#edit-profile-form");
editForm.addEventListener("submit", handleEditProfileFormSubmit);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function openEditModal() {
  projileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeEditModal() {
  editModal.classList.remove("modal_opened");
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = projileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeEditModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.name + " image");

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardEl = getCardElement(cardData);
  cardsList.prepend(cardEl);
});
