import fetch from "isomorphic-fetch";

const validResponse = function validResponse(response) {
  return response && response.ok;
};

export default async function getJokes(page) {
  const responseData = {};
  const response = await fetch(
    `https://icanhazdadjoke.com/search?limit=3&page=${page}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!validResponse(response)) {
    throw new Error(`${response.status}. Error when connecting to API.`);
  }

  responseData.data = await response.json();

  return responseData;
}
