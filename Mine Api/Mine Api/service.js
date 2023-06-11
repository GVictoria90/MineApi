"use strict";
const BASE_URL = "https://647a6c84d2e5b6101db05861.mockapi.io/users";

export async function getAll() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOne(id) {
  try {
    const response = await fetch(BASE_URL + `/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addOne(user) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create User");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOne(id, user) {
  try {
    const response = await fetch(BASE_URL + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to update User");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOne(id) {
  try {
    const response = await fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to delete User");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
