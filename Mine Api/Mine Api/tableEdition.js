"use strict";
// Metodos para modificar tabla
export function addUserToTable(user, usersList, tableDT) {
  // Agregar el usuario al array de usuarios
  usersList.push(user);

  // Limpiar la DataTable
  tableDT.clear();

  // Repopular la DataTable con la tabla actualizada
  tableDT.rows.add(usersList);

  // Redibujar la tabla
  tableDT.draw();
}

export function updateUserFromTable(updatedUser, usersList, tableDT) {
  // Encontrar el indice  del usuario en el array
  const index = usersList.findIndex((user) => user.id === updatedUser.id);

  if (index !== -1) {
    // Actualizar en el array
    usersList[index] = updatedUser;

    // Redibujar la tabla para reflejar cambios
    tableDT.row(index).data(updatedUser).draw(false);
  }
}

export function deleteUserFromTable(userID, usersList, tableDT) {
  // Find the index of the user in the array
  const index = usersList.findIndex((user) => user.id === userID);

  if (index !== -1) {
    // Quitar usuario del array
    usersList.splice(index, 1);

    // Redibujar la tabla para reflejar cambios
    tableDT.row(index).remove().draw(false);
  }
}

// Metodo carga inicial de tabla

export function loadUsersIntoTable(usersList) {
  return $("#table-user").DataTable({
    responsive: true,
    data: usersList,
    language: {
      search: "Buscar:", // Change the search text
      searchPlaceholder: "Buscar", // Change the search input placeholder
      lengthMenu: "Mostrar _MENU_ registros por página", // Change the pagination length menu text
      info: "Mostrando página _PAGE_ de _PAGES_", // Change the pagination info text
      infoEmpty: "No se encontraron registros", // Change the empty table info text
      zeroRecords: "No se encontraron registros coincidentes", // Change the no records found text
      paginate: {
        first: "Primero", // Change the first page button text
        last: "Último", // Change the last page button text
        next: "Siguiente", // Change the next page button text
        previous: "Anterior", // Change the previous page button text
      },
    },
    columns: [
      { data: "id", title: "#" },
      { data: "name", title: "Nombre" },
      { data: "email", title: "Email" },
      { data: "phone", title: "Telefono" },
      { data: "createdAt", title: "Fecha creacion" },
      {
        data: null,
        title: "Actualizar",
        render: function (data, type, row) {
          return (
            '<button type="button" value="' +
            data.id +
            '" class="btn btn-info update-user">Actualizar</button>'
          );
        },
      },
      {
        data: null,
        title: "Borrar",
        render: function (data, type, row) {
          return (
            '<button type="button" value="' +
            data.id +
            '" class="btn btn-danger delete-user">Borrar</button>'
          );
        },
      },
    ],
    columnDefs: [
      { targets: [5, 6], orderable: false }, // Disable sorting for columns 5 (Actualizar) and 6 (Borrar)
    ],
    rowCallback: function (row, data) {
      $(row).attr("id", "user-" + data.id);
    },
  });
}
