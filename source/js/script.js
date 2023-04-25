"use strict";

document.body.classList.remove("no-js");

//Mobile menu

const menuButton = document.querySelector(".burger-button");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("menu-open-js");
  });
}

// Select

const selects = document.querySelectorAll(".custom-select");
const selectButtons = document.querySelectorAll(".custom-select__title");
const selectOptions = document.querySelectorAll(".custom-select__item");

if (selectButtons.length) {
  selectButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const select = evt.target.closest(".custom-select");
      select.classList.toggle("select-opened");
    });
  });
}

if (selectOptions.length) {
  selectOptions.forEach((option) => {
    option.addEventListener("click", (evt) => {
      const select = evt.target.closest(".custom-select");
      const selectedValue = evt.target.getAttribute("data-value");
      const hidden = document.querySelector(`#${select.id} input[type=hidden]`);
      const button = document.querySelector(
        `#${select.id} .custom-select__title`
      );
      const lis = document.querySelectorAll(
        `#${select.id} .custom-select__item`
      );

      select.classList.remove("select-opened");
      hidden.value = selectedValue;
      button.textContent = selectedValue;

      if (lis.length) {
        lis.forEach((li) => {
          li.classList.remove("selected");
        });
      }

      evt.target.classList.add("selected");
    });
  });
}

const closeAllSelects = () => {
  selects.forEach((select) => {
    select.classList.remove("select-opened");
  });
};

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeAllSelects();
  }
});

// File

const fileInputs = document.querySelectorAll(".custom-file__input");
const fileButtons = document.querySelectorAll(".custom-file__button");

const onFileButtonClick = (evt) => {
  const customFile = evt.target.closest(".custom-file");
  const inputFile = customFile.querySelector("input");

  inputFile.click();
};

const onFileButtonRemoveClick = (evt) => {
  const customFile = evt.target.closest(".custom-file");
  const button = evt.currentTarget;
  const input = customFile.querySelector(`#${customFile.id} input`);
  const buttonText = button.querySelector(".custom-file__button-text");

  input.value = "";
  button.classList.remove("loaded");
  buttonText.textContent = "Прикрепить файл";

  button.removeEventListener("click", onFileButtonRemoveClick);
  button.addEventListener("click", onFileButtonClick);
};

if (fileButtons.length) {
  fileButtons.forEach((button) => {
    button.addEventListener("click", onFileButtonClick);
  });
}

if (fileInputs.length) {
  fileInputs.forEach((input) => {
    input.addEventListener("change", (evt) => {
      const { files } = evt.target;
      const customFile = evt.target.closest(".custom-file");
      const button = customFile.querySelector(".custom-file__button");
      const buttonText = button.querySelector(".custom-file__button-text");

      if (files.length) {
        const fileName = files[0]["name"];

        button.classList.add("loaded");
        buttonText.textContent = fileName;

        button.removeEventListener("click", onFileButtonClick);
        button.addEventListener("click", onFileButtonRemoveClick);
      }
    });
  });
}

// Form

const form = document.querySelector(".order-form");
const formFileButtons = form.querySelectorAll(".custom-file__button");

const showSuccessMessage = (formData) => {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
    if (typeof value === "object") {
      data[key] = value.name;
    }
  }

  const message = document.createElement("div");
  message.className = "modal";
  message.innerHTML = `
  <div class="modal__header">Вы успешно отправили следующие данные:</div>
  <div class="modal__body">
    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
  </div>
  <div class="modal__footer">
    <button class="modal__successes-button button">OK</button>
  <div>
  `;

  document.body.append(message);
  const buttons = document.querySelectorAll(".modal button");
  if (buttons.length) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        message.remove();
      });
    });
  }
  setTimeout(() => message.remove(), 5000);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  new FormData(evt.target);
  evt.target.reset();
  formFileButtons.forEach((button) => {
    const buttonText = button.firstChild;

    button.classList.remove("loaded");
    buttonText.textContent = "Прикрепить файл";
  });
};

const showFormDataValues = (evt) => {
  showSuccessMessage(evt.formData);
};

form.addEventListener("submit", onFormSubmit);
form.addEventListener("formdata", showFormDataValues);
