function calculateDistance(
  userLat: number,
  userLon: number,
  roadLat: number,
  roadLon: number
) {
  // Haversine formula
  const R = 6371; // Earth radius in kilometers
  const dLat = (roadLat - userLat) * (Math.PI / 180);
  const dLon = (roadLon - userLon) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat * (Math.PI / 180)) *
      Math.cos(roadLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}
