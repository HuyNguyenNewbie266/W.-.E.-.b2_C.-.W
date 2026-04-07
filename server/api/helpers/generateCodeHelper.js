exports.generateCustomCode = (prefix, objectId) => {
  const idStr = objectId.toString().toUpperCase();

  const timeHex = idStr.slice(0, 8);

  const counterHex = idStr.slice(-6);

  return `${prefix}-${timeHex}-${counterHex}`;
};