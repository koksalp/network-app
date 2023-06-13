export function handleUsernameFormat(username) {
  const formattedUsername = username.trim().toLowerCase();

  if (formattedUsername.split(" ").length !== 1) {
    return null;
  }

  if (isAlpha(formattedUsername)) {
    return formattedUsername;
  }

  return null;
}

function isAlpha(string) {
  let strRegex = new RegExp(/^[a-z0-9]+$/i);
  return strRegex.test(string);
}

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export function handleNameFormat(name) {
  const formattedArr = name.trim().toLowerCase().split(" ");
  let formattedName = "";

  for (let i = 0; i < formattedArr.length; i++) {
    const namePart = formattedArr[i];
    if (namePart === "") {
      continue;
    }
    if (!isAlpha(namePart)) {
      return null;
    }

    formattedName += capitalizeFirstLetter(namePart) + " ";
  }

  return formattedName.trim();
}

export function handleEmailValidation(email) {
  let emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}
