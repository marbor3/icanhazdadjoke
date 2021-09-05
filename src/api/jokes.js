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
  ).catch((e) => {
    responseData.message = "API - fetch error.";
  });

  if (!validResponse(response)) {
    responseData.message = `${response.status}. Error when connecting to API.`;
  }

  try {
    responseData.data = await response.json();
  } catch (error) {
    responseData.message = "API - error parsing respose ";
  }

  return responseData;
}
