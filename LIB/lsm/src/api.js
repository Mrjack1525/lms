export const callApi = async (method, url, data) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const text = await response.text();
  return text;
};

export const setSession = (key, value, days) => {
  sessionStorage.setItem(key, value);
};
