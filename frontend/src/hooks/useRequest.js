export const baseUrl = "http://localhost:4000";

export const FireAPI = async (
  endPoint,
  method = "GET",
  body,
  customHeader = {},
) => {
  const url = `${baseUrl}${endPoint ? `/${endPoint}` : ""}`;

  let headers = {
    ...customHeader,
  };

  const options = {
    method: method.toUpperCase(),
    headers,
  };

  if (body instanceof FormData) {
    options.body = body;
  } else if (body && method.toUpperCase() !== "GET") {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data || { message: "Something went wrong" });
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
