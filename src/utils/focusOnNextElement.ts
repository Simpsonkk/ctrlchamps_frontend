// To run correctly, the input elements must have an id that is the index of the element in the array
// and the length of the array must be passed to the function

export const focusNextInput = (index: number, length: number): void => {
  const nextIndex = index + 1;
  if (nextIndex < length) {
    const nextInput = document.getElementById(`${nextIndex}`) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
};
