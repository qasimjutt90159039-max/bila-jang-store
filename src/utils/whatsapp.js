export const HELPLINE_PHONE = '+92 301 7928133';
export const WHATSAPP_NUMBER = '923017928133'; // without plus or spaces for wa.me URL
export const BUSINESS_EMAIL = 'info@bilalganjautoparts.com';
export const BUSINESS_NAME = 'Bilal Ganj Auto Parts & Shop Lahore';
export const WAREHOUSE_LOCATION = 'Circular Road / Near Data Darbar, Bilal Ganj Auto Market, Lahore 54000, Punjab, Pakistan';

/**
 * Format number to Pakistani Rupee format
 */
export function formatPKR(amount) {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(amount).replace('PKR', 'Rs.');
}

/**
 * Generate WhatsApp URL with prefilled message
 */
export function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * 1-Click "Order via WhatsApp" link for a product
 */
export function getProductWhatsAppOrderUrl(product, selectedVehicle = null) {
  const vehicleText = selectedVehicle && selectedVehicle.make 
    ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.year})` 
    : `${product.make} ${product.model}`;

  const message = `Salam Bilal Ganj Auto Parts! 🚗
I want to order the following spare part:

📦 *Part Name*: ${product.name}
🔢 *OEM / Part No*: ${product.oemNumber}
🏷️ *Condition*: ${product.conditionGrade || product.condition}
💰 *Price*: ${formatPKR(product.price)}
🚘 *Car Fitment*: ${vehicleText}
📍 *Warehouse Depot*: ${product.stockStatus || 'Bilal Ganj, Lahore'}

Please confirm if this is ready for dispatch and calculate Bilty/Cargo delivery to my city.`;

  return buildWhatsAppUrl(message);
}

/**
 * "Request Part Video / Photos" for Japanese Kabli & mechanical parts
 */
export function getPartInspectionVideoWhatsAppUrl(product, selectedVehicle = null) {
  const vehicleText = selectedVehicle && selectedVehicle.make 
    ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.year})` 
    : `${product.make} ${product.model}`;

  const message = `Salam Bilal Ganj Team! 📹
I am interested in buying this tested part from Bilal Ganj:

📦 *Part*: ${product.name}
🔢 *OEM #*: ${product.oemNumber}
🏷️ *Condition*: ${product.conditionGrade || product.condition}
🚘 *My Vehicle*: ${vehicleText}

Could you please share actual 360-degree photos and a short test-run / compression video of this exact part from your Bilal Ganj shop bench before I place the order?`;

  return buildWhatsAppUrl(message);
}

/**
 * WhatsApp Cart checkout order confirmation
 */
export function getCartCheckoutWhatsAppUrl(cartItems, customerDetails, cargoDetails) {
  const itemsText = cartItems.map((item, idx) => 
    `${idx + 1}. *${item.name}* (OEM: ${item.oemNumber})
   Qty: ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`
  ).join('\n\n');

  const grandTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cargoFeeText = cargoDetails.fee ? formatPKR(cargoDetails.fee) : 'To be paid on Bilty collection / Local COD';

  const message = `Salam Bilal Ganj Auto Parts Lahore! 🛒
I would like to place an order from your online store:

*ORDER SUMMARY:*
-------------------------------------
${itemsText}
-------------------------------------
Subtotal: ${formatPKR(grandTotal)}
Delivery / Bilty: ${cargoFeeText}

*CUSTOMER & CARGO DETAILS:*
👤 *Name*: ${customerDetails.name || 'Not provided'}
📱 *Phone*: ${customerDetails.phone || 'Not provided'}
📍 *Delivery City*: ${customerDetails.city || 'Lahore'}
🏢 *Delivery Mode*: ${cargoDetails.method}
📦 *Cargo Service / Terminal*: ${cargoDetails.terminal || 'Daewoo / Faisal Movers Cargo'}
🏠 *Shipping Address*: ${customerDetails.address || 'Self Pickup at Bilal Ganj'}

Please confirm receipt, verify stock availability in warehouse, and share payment details (Meezan Bank / JazzCash / COD).`;

  return buildWhatsAppUrl(message);
}

/**
 * Custom Part Request WhatsApp URL for rare / scrap sourcing
 */
export function getCustomPartRequestWhatsAppUrl({ make, model, year, partName, chassisNumber, notes }) {
  const message = `Salam Bilal Ganj Auto Parts Team! 🔍
I am searching for a specific spare part that is hard to find:

🚘 *Make & Model*: ${make} ${model}
📅 *Year / Model*: ${year}
🆔 *Chassis / Frame No*: ${chassisNumber || 'Not specified'}
🔧 *Part Needed*: ${partName}
📝 *Additional Details*: ${notes || 'Looking for Japanese Kabli or Brand New OEM'}

Please check your scrap yards in Bilal Ganj and send me availability, condition, and price quotation. Thank you!`;

  return buildWhatsAppUrl(message);
}
