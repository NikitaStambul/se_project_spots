const formValidationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__submit-btn",
  errorSelector: ".modal__error",
  inputTypeErrorClass: "modal__input_type_error",
  errorActiveClass: "modal__error_active",
  inactiveSubmitBtnClass: "modal__submit-btn_inactive",
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formEl) => {
    setValidationOnEvent(formEl, config);
  });
}

function setValidationOnEvent(formEl, config) {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonEl = formEl.querySelector(config.submitBtnSelector);

  updateButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      toggleInputError(inputEl, config);
      updateButtonState(inputList, buttonEl, config);
    });
  });
}

function updateButtonState(inputList, buttonEl, config) {
  const hasInvalidInput = (() => {
    return Array.from(inputList).some((inputEl) => {
      return !inputEl.validity.valid;
    });
  })();

  if (hasInvalidInput) {
    disableButton(buttonEl, config);
  } else {
    enableButton(buttonEl, config);
  }
}

function toggleInputError(inputEl, config) {
  if (inputEl.validity.valid) {
    hideInputError(inputEl, config);
  } else {
    showInputError(inputEl, config);
  }
}

function hideInputError(inputEl, config) {
  const errorEl = inputEl.parentElement.querySelector(config.errorSelector);

  inputEl.classList.remove(config.inputTypeErrorClass);
  errorEl.classList.remove(config.errorActiveClass);
}

function showInputError(inputEl, config) {
  const errorEl = inputEl.parentElement.querySelector(config.errorSelector);

  inputEl.classList.add(config.inputTypeErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(config.errorActiveClass);
}

function disableButton(buttonEl, config) {
  buttonEl.classList.add(config.inactiveSubmitBtnClass);
  buttonEl.disabled = true;
}

function enableButton(buttonEl, config) {
  buttonEl.classList.remove(config.inactiveSubmitBtnClass);
  buttonEl.disabled = false;
}

function resetValidation(inputList) {
  inputList.forEach((inputEl) => hideInputError(inputEl, formValidationConfig));
}

export { enableValidation, resetValidation, disableButton, formValidationConfig };