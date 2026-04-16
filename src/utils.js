const { GARMENT_PRICE_LIST } = require("./constants");

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${timestamp}-${randomPart}`;
}

function calculateItemsAndTotal(garments = []) {
  const normalizedItems = garments.map((item) => {
    const garment = item.garment;
    const quantity = Number(item.quantity);
    const configuredPrice = GARMENT_PRICE_LIST[garment];
    const pricePerItem = Number(
      item.pricePerItem === undefined ? configuredPrice : item.pricePerItem
    );
    const lineTotal = quantity * pricePerItem;

    return {
      garment,
      quantity,
      pricePerItem,
      lineTotal,
    };
  });

  const totalAmount = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    items: normalizedItems,
    totalAmount,
  };
}

module.exports = {
  generateOrderId,
  calculateItemsAndTotal,
};
