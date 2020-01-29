/**
 * Calculate a weighted estimate for the interval until the next purchase
 * Current purchase a tiny bit less weight than all previous purchases
 * @param {Number} lastEstimate The last stored purchase interval estimate
 * @param {Number} latestInterval The interval between the most recent and previous purchases
 * @param {Number} numberOfPurchases Total number of purchases for the item
 */
const calculateEstimate = (lastEstimate, latestInterval, numberOfPurchases) => {
  if (isNaN(lastEstimate)) {
    lastEstimate = 14;
  }

  // FIXME algorithm doesn't work when there's only 1 purchase in the database
  let previousFactor = lastEstimate * numberOfPurchases;
  let latestFactor = latestInterval * (numberOfPurchases - 1);
  let totalDivisor = numberOfPurchases * 2 - 1;
  return (previousFactor + latestFactor) / totalDivisor;
};

export default calculateEstimate;
