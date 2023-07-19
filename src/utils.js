// format: dd/mm/yyyy
export const getDateAndTime = (date) => {
  let dateString = `${date?.getDate()}/${
    date?.getMonth() + 1
  }/${date?.getFullYear()}`;

  let timeString = date.toLocaleString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${dateString} ${timeString}`;
};

// check if it is object and has atleast one item
export const isObjectAndHasData = (obj) => {
  return obj && obj.constructor === Object && Object.keys(obj).length !== 0;
};

// setup local storage for favorite emails
export const initFavoriteInLocalStorage = () => {
  if (!localStorage.getItem("favoriteEmails")) {
    localStorage.setItem("favoriteEmails", JSON.stringify([]));
  }
};

// setup local storage for read emails
export const initReadInLocalStorage = () => {
  if (!localStorage.getItem("readEmails")) {
    localStorage.setItem("readEmails", JSON.stringify([]));
  }
};
