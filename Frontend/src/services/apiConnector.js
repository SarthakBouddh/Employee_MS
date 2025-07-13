export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = {},
  params = null
) => {
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const isFormData = bodyData instanceof FormData;

  const options = {
    method: method.toUpperCase(),
    headers: {
      ...headers,
    },
  };

  if (bodyData && !["GET", "DELETE"].includes(method.toUpperCase())) {
    options.body = isFormData ? bodyData : JSON.stringify(bodyData);

    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
    }
  }

  const response = await fetch(url + queryString, options);
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "API request failed");
    error.response = result;
    error.status = response.status;
    throw error;
  }  

  return result;
};
