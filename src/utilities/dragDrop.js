/**
 * item have addedIndex and removedIndex
 * if col 1 - index 1 move col 2 - index 3
 * remove col 1 - index 1 && add col 2 - index 3
 */

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  // Nhận 1 cái mảng[col-1,col-2,col-3], payload: là item kéo thả
  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    // Thay đổi mảng bằng splice
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}
