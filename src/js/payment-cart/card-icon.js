import { $, parent, remove } from 'dom7';
import '../../assets/images/cat.jpg';

$.fn.parent = parent;
$.fn.remove = remove;

function cardIcon(imageName) {
  const imageSrc = require(`../../assets/images/${imageName}.png`);
  $('#card-icon') && $('#card-icon').remove();

  $('#cardNumber').parent().prepend(`<img src="${imageSrc}" id="card-icon" />`);
}

export { cardIcon };
