// there is too much of nesting functions to pass through config options
// better to make it globally available instead of drilling
const formValidationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__submit-btn",
  errorSelector: ".modal__error",
  inputTypeErrorClass: "modal__input_type_error",
  errorActiveClass: "modal__error_active",
  inactiveSubmitBtnClass: "modal__submit-btn_inactive",
}

function enableValidation() {
  const formList = document.querySelectorAll(formValidationConfig.formSelector);

  formList.forEach((formEl) => {
    setValidationOnEvent(formEl, formValidationConfig);
  });
}

function setValidationOnEvent(formEl) {
  const inputList = formEl.querySelectorAll(formValidationConfig.inputSelector);
  const buttonEl = formEl.querySelector(formValidationConfig.submitBtnSelector);

  updateButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      toggleInputError(inputEl);
      updateButtonState(inputList, buttonEl);
    });
  });
}

function updateButtonState(inputList, buttonEl) {
  const hasInvalidInput = (() => {
    return Array.from(inputList).some((inputEl) => {
      return !inputEl.validity.valid;
    });
  })();

  if (hasInvalidInput) {
    disableButton(buttonEl);
  } else {
    enableButton(buttonEl);
  }
}

function toggleInputError(inputEl) {
  if (inputEl.validity.valid) {
    hideInputError(inputEl);
  } else {
    showInputError(inputEl);
  }
}

function hideInputError(inputEl) {
  const errorEl = inputEl.parentElement.querySelector(formValidationConfig.errorSelector);

  inputEl.classList.remove(formValidationConfig.inputTypeErrorClass);
  errorEl.classList.remove(formValidationConfig.errorActiveClass);
}

function showInputError(inputEl) {
  const errorEl = inputEl.parentElement.querySelector(formValidationConfig.errorSelector);

  inputEl.classList.add(formValidationConfig.inputTypeErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(formValidationConfig.errorActiveClass);
}

function disableButton(buttonEl) {
  buttonEl.classList.add(formValidationConfig.inactiveSubmitBtnClass);
  buttonEl.disabled = true;
}

function enableButton(buttonEl) {
  buttonEl.classList.remove(formValidationConfig.inactiveSubmitBtnClass);
  buttonEl.disabled = false;
}

function resetValidation(inputList) {
  inputList.forEach((inputEl) => hideInputError(inputEl));
}

enableValidation();
