/**
 * Is value numeric
 * 
 * Determine whether variable is a number
 * 
 * @param {*} str
 *
 * Example:
 *   import { isNumeric } from '../helpers/general'
 *   isNumeric(value)
 */
function isNumeric(str) {
  if (['string', 'number'].indexOf(typeof str) === -1) return false; // Process only strings and numbers!
  return (
    !isNaN(str) && // Use type coercion to ensure the entire string is numeric...
    !isNaN(parseFloat(str)) // ...and that strings of whitespace fail
  );
}

/**
 * Validate email format
 * 
 * Checks the provided email address and validates its format
 * 
 * @param {String} email  The email address
 * 
 * Example:
 *   import { validateEmail } from '../helpers/general'
 *   validateEmail(email)
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate strong password format
 * 
 * @param {String} password  The password
 * 
 * Example:
 *   import { validateStrongPassword } from '../helpers/general'
 *   validateStrongPassword(password)
 */
function validateStrongPassword(password) {
  return /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password);
}

/**
 * Checks for empty string
 * 
 * @param {String} input  The input string
 * 
 * Example:
 *   import { isEmpty } from '../helpers/general'
 *   isEmpty(input)
 */
function isEmpty(input) {
  return input === '' || input === null || input === undefined;
}

/**
 * Checks if user is authenticated
 * 
 * Example:
 *   import { isAuth } from '../helpers/general'
 *   isAuth()
 */
function isAuth() {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    const token = window.localStorage.getItem('key');
    return !!token;
  } else {
    return true;
  }
}

/**
 * Returns an optimized image URL.
 * 
 * For local images (starting with '/') that don’t already include the
 * "imgcdn=true" parameter, appends the parameter for image optimization.
 * If imageUrl is undefined or not a string, returns an empty string.
 * 
 * Example:
 *   import { toOptimizedImage } from '../helpers/general'
 *   <img src={toOptimizedImage(image)} .../>
 */
function toOptimizedImage(imageUrl) {
  // Check if imageUrl is defined and is a string
  if (!imageUrl || typeof imageUrl !== 'string') {
    return ''; // or you can return a default image URL if desired
  }
  
  if (!imageUrl.startsWith('/') || imageUrl.endsWith("imgcdn=true")) {
    return imageUrl;
  }
  
  return imageUrl + (imageUrl.includes("?") ? "&" : "?") + "imgcdn=true";
}

export { isNumeric, validateEmail, validateStrongPassword, isEmpty, isAuth, toOptimizedImage };
