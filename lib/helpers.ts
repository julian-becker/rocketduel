// calculate the offset in pixels for an image displayed on a panorama
// given the width of the image, an initial azimuth and a current azimuth
// used by the GameBackground panorama view to display targets according
// to their azimuth direction
const calculateOffset = (imageWidth: number, initialAzimuth: number, currentAzimuth: number) => {
  const initialPixelOffset = (initialAzimuth / 360 ) * imageWidth;
  const currentPixelOffset = (currentAzimuth / 360 ) * imageWidth;
  const totalOffset = initialPixelOffset + currentPixelOffset;
  return totalOffset >= imageWidth ? totalOffset - imageWidth : totalOffset;
}

// calculate the relative direction of a target compared to the player's
// current viewing direction
// used by GameBackground to render targets in the correct direction
// relative to the player
// will be positive if (targetPos - playerPos) is less than half of the image width
// since turning right would be the fastest way to get to it
// negative if it's greater
const calculateXPos = (imageWidth: number, playerPos: number, targetPos: number) => {
  const offset = targetPos - playerPos;
  return offset > (imageWidth / 2) ? offset - imageWidth : offset;
}

// Given an object of size in meters realSize at a given distance in meters, 
// How big should it appear in reference pixels?
const calculatePerceivedHeight = (realSize: number, distance: number) => {
  const referencePixelAngleRatio = (Math.PI/180) * 0.021315384;
  const pixelLength = 1/96;
  const finalperceived = 2 * Math.atan2(realSize / 2, distance) / referencePixelAngleRatio;
  return finalperceived
}

export { calculateOffset, calculatePerceivedHeight, calculateXPos };
