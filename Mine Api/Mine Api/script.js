"use strict";
import { getAll, getOne, addOne, updateOne, deleteOne } from "./service.js";
import { addUserToTable, updateUserFromTable, deleteUserFromTable, loadUsersIntoTable } from "./tableEdition.js";
document.addEventListener("DOMContentLoaded", function () {
  //   Actividad sobre la tabla
  let wrapperTabla = document.getElementById("table-wrapper");
  let usersList = [];
  let tableDT;

  // Modals
  let creationModal = new bootstrap.Modal(
    document.getElementById("modal-create-user"),
    {}
  );
  let updateModalElement = document.getElementById("modal-update-user");
  let updateModal = new bootstrap.Modal(updateModalElement, {});
  let deletionModalElement = document.getElementById("modal-delete-user");
  let deletionModal = new bootstrap.Modal(deletionModalElement, {});

  // Forms
  let creationForm = document.getElementById("form-create-user");
  let updateForm = document.getElementById("form-update-user");
  let deleteForm = document.getElementById("form-delete-user");

  // Inside items
  let nameField = updateForm.querySelector("#user-name");
  let emailField = updateForm.querySelector("#user-email");
  let phoneField = updateForm.querySelector("#user-phone");

  creationForm.addEventListener("submit", () => {
    handleCreationSubmit();
  });

  updateForm.addEventListener("submit", () => {
    handleUpdateSubmit();
  });

  deleteForm.addEventListener("submit", () => {
    handleDeletionSubmit();
  });

  // Boton confirmar submit update

  let confirmUpdate = document.getElementById("submit-update-user");

  // Metodos para manejar submits

  function handleCreationSubmit() {
    const userData = new FormData(creationForm);
    let user = {
      name: userData.get("user-name"),
      email: userData.get("user-email"),
      phone: userData.get("user-phone"),
      createdAt: getCurrentDate(),
    };
    addOne(user)
      .then((res) => {
        addUserToTable(res, usersList, tableDT);
        creationModal.hide();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateSubmit() {
    let userInputElement = document.getElementById("user-id");
    let userID = userInputElement.value;
    const userData = new FormData(updateForm);
    let user = {
      name: userData.get("user-name"),
      email: userData.get("user-email"),
      phone: userData.get("user-phone"),
    };
    updateOne(userID, user)
      .then((res) => {
        updateUserFromTable(res, usersList, tableDT);
        updateModal.hide();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletionSubmit() {
    let userInputElement = document.getElementById("user");
    let userID = userInputElement.value;
    deleteOne(userID)
      .then((res) => {
        deleteUserFromTable(userID, usersList, tableDT);
        deletionModal.hide();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Metodo auxiliar para obtener la fecha actual

  function getCurrentDate() {
    const currentDate = new Date();
    // Extraer el dia, mes y anio
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();
    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }

  // Metodo carga inicial de tabla

  function loadTable() {
    getAll()
      .then((users) => {
        usersList = users;
        tableDT = loadUsersIntoTable(usersList);

        // Change the parent classes of dataTables_length and dataTables_filter
        $(".dataTables_length")
          .parent()
          .removeClass("col-sm-12 col-md-6")
          .addClass("col-sm-12 col-md-4 py-1");
        $(".dataTables_filter")
          .parent()
          .removeClass("col-sm-12 col-md-6")
          .addClass("col-sm-12 col-md-4 py-1");

        // Create a new element and append it to the parent container
        var navElement =
          '<div class="col-sm-12 col-md-4 py-1 d-flex justify-content-sm-center justify-content-md-end">' +
          '<button id="create-user" class="btn btn-secondary" type="button">' +
          "Crear usuario" +
          "</button>" +
          "</div>";

        $(".dataTables_filter").parent().after(navElement);
      })
      .catch((err) => console.log(err));
  }

  // Listeners en botones creacion, actualizacion y borrado

  wrapperTabla.addEventListener("click", (event) => {
    if (event.target.matches("#create-user")) {
      let userID = event.target.getAttribute("value");
      openCreateUserModal();
    }
    if (event.target.matches(".update-user")) {
      let userID = event.target.getAttribute("value");
      openUpdateUserModal(userID);
    } else if (event.target.matches(".delete-user")) {
      let userID = event.target.getAttribute("value");
      openDeleteUserModal(userID);
    }
  });

  // Metodos de apertura de modals

  function openCreateUserModal() {
    creationModal.show();
  }

  function openUpdateUserModal(userID) {
    let hiddenInput = updateModalElement.querySelector("#user-id");
    hiddenInput.value = userID;
    nameField.value = "";
    emailField.value = "";
    phoneField.value = "";
    confirmUpdate.setAttribute("disabled", "");
    getOne(userID)
      .then((res) => {
        nameField.value = res.name;
        emailField.value = res.email;
        phoneField.value = res.phone;
        confirmUpdate.removeAttribute("disabled");
      })
      .catch((err) => {
        console.log(err);
      });
    updateModal.show();
  }

  function openDeleteUserModal(userID) {
    let hiddenInput = deletionModalElement.querySelector("#user");
    hiddenInput.value = userID;
    deletionModal.show();
  }

  loadTable();
});
