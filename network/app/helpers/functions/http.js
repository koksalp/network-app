import { fetchUrl } from "../constants"; 

export async function signUp(name, email, username, password) {
  const url = `${fetchUrl}/users/signup`;

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
    });
    var data = await response.json();
  } catch (error) {
    return null;
  }

  return data;
}

export async function signIn(username, password) {
  const url = `${fetchUrl}/users/signin`;

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    var data = await response.json();
  } catch (error) { 
    console.log(error.message); 
    return null;
  }

  return data;
}

export async function getUserByUsername(username ) {
  const url = `${fetchUrl}/users/${username}`; 
  let data; 
  try { 
    const response = await fetch(url); 
    data = await response.json(); 
  } catch(error) {
    return null; 
  } 

  return data; 
} 

export async function createNewPost(userId, postContent ) {
  if (userId=== undefined || postContent===undefined) {
    return; 
  } 

  const url = `${fetchUrl}/posts/`; 
  let post; 
  try {
    const response = await fetch(url, { 
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: postContent, 
        sharedById: userId, 
      }),
    }); 

    post = await response.json(); 
  } catch(error) {
    console.log(error.message ); 
    return; 
  } 

  return post; 
}