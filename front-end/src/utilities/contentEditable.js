// Khi bấm enter thì tự động blur ra
export const saveContentAfterPressEnter = e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

// Khi click vào thì focus, select inline text input
export const selectAllInlineText = e => {
  e.target.focus()
  e.target.select()
  // document.execCommand('selectAll', false, null)
}
