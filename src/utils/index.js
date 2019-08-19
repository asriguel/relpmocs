export const checkValidFileExtension = (fileValue, exts) => (
  new RegExp(`(${exts.join('|').toLowerCase().replace(/\./g, '\\.')})$`)
).test(fileValue);

export const makeArrayFromMapValues = (map) => {
  const list = [];
  map.forEach((value) => {
    list.push(value);
  });

  return list;
};

export const calculateDomElementWidth = (domElement) => {
  const style = domElement.currentStyle || window.getComputedStyle(domElement);
  const width = domElement.offsetWidth;
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

  return width + margin - padding + border;
};
