export const buildResponse = () => {
  let buffer;

  const send = (data) => {
    buffer = data;
  };

  const blob = (data) => {};

  const emptyBuffer = () => {
    const result = buffer;
    buffer = undefined;
    return result;
  };

  return {
    send,
    blob,
    emptyBuffer
  };
};
