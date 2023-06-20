/**
 *
 * @param {string} route
 * @param {any} val
 * @returns string
 */

const createRouteWithParam = (route, val) =>
  route.replace(/:([0-9_a-z]+)/gi, val);
export default createRouteWithParam;
