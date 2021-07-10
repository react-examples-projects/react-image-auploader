/**
 * Convert a binary file to base 64 URL
 * @param {File} imageFile The binary file image
 * @returns A promise that contains the base 64 format image
 */
export function imageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(imageFile);
  });
}

/**
 * Build a form data with `form` and `params` object
 * @param {HTMLFormElement} form The form node
 * @param {Object} params Optional params to add of the form data
 * @returns The form data
 */
export function toFormData(form, params) {
  const fd = new FormData(form);
  for (const [v, k] of Object.entries(params)) {
    if (Array.isArray(k)) {
      fd.append(`${v}[]`, k);
    } else {
      fd.append(v, k);
    }
  }
  return fd;
}
