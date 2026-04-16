const { GARMENT_PRICE_LIST, ORDER_STATUSES } = require("./constants");

function validateCreateOrderPayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return ["Payload must be a JSON object"];
  }

  if (!payload.customerName || typeof payload.customerName !== "string") {
    errors.push("customerName is required and must be a string");
  }

  if (!payload.phoneNumber || typeof payload.phoneNumber !== "string") {
    errors.push("phoneNumber is required and must be a string");
  }

  if (!Array.isArray(payload.garments) || payload.garments.length === 0) {
    errors.push("garments must be a non-empty array");
  } else {
    payload.garments.forEach((item, index) => {
      if (!item.garment || typeof item.garment !== "string") {
        errors.push(`garments[${index}].garment is required`);
      } else if (!GARMENT_PRICE_LIST[item.garment] && item.pricePerItem === undefined) {
        errors.push(
          `garments[${index}].garment has no configured price, provide pricePerItem`
        );
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`garments[${index}].quantity must be an integer greater than 0`);
      }

      if (item.pricePerItem !== undefined) {
        const parsed = Number(item.pricePerItem);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          errors.push(`garments[${index}].pricePerItem must be a positive number`);
        }
      }
    });
  }

  return errors;
}

function validateStatus(status) {
  return ORDER_STATUSES.includes(status);
}

module.exports = {
  validateCreateOrderPayload,
  validateStatus,
};
