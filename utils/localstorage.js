let supportsLocalStorage;

const browserSupportsLocalStorage = () => {
  if (supportsLocalStorage !== undefined) {
    return supportsLocalStorage;
  }

  try {
    if (localStorage) {
      supportsLocalStorage = true;
    }
  } catch {
    supportsLocalStorage = false;
  }

  return supportsLocalStorage;
};

const isObject = (value) =>
  value !== null && value.constructor.name === 'Object';

export const set = (key, value, options) => {
  if (!browserSupportsLocalStorage()) {
    return null;
  }

  try {
    const setExpiry = options?.expiresIn > 0;

    const data = setExpiry
      ? { value, ttl: Date.now() + options?.expiresIn }
      : value;

    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    return null;
  }
};

export const get = (key) => {
  if (!browserSupportsLocalStorage()) {
    return null;
  }

  const dataString = localStorage.getItem(key);

  if (!dataString) {
    return null;
  }

  const data = JSON.parse(dataString);

  const dataExpires = isObject(data) && Object.keys(data).includes('ttl');

  if (!dataExpires) {
    return data;
  }

  if (Date.now() > data.ttl) {
    localStorage.removeItem(key);

    return null;
  }

  return data.value;
};

export const remove = (key) => {
  if (!supportsLocalStorage) {
    return null;
  }

  localStorage.removeItem(key);
};

export const clear = () => {
  if (!supportsLocalStorage) {
    return null;
  }

  localStorage.clear();
};
