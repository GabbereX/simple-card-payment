import { $, parent, append, remove, next, css } from 'dom7';

$.fn.parent = parent;
$.fn.append = append;
$.fn.remove = remove;
$.fn.next = next;
$.fn.css = css;

function error(selectorId, errorText) {
  $(selectorId).next().remove();
  $(selectorId).css('border-color', '');

  if (errorText) {
    $(selectorId).css('border-color', 'red');
    $(selectorId)
      .parent()
      .append(`<span class="validation-error">${errorText}</span>`);
  }
}

export { error };
