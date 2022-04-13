import '../../sass/reseter.scss';
import '../../sass/main.scss';

import { eventOnBlur, eventOnInput, eventOnKeydown } from './input-events.js';
import { $, append, prepend, on } from 'dom7';

$.fn.on = on;
$.fn.append = append;
$.fn.prepend = prepend;

function renderPaymentForm(inputDetail) {
  $('body').append(`
    <div id="paymentFormContainer">
      <h1 class="title">
        Онлайн Оплата
      </h1>
      <form id="paymentForm">
        <button class="btn" disabled="true">
          Отправить
        </button>
      </form>
    </div>
  `);

  inputDetail.forEach(input => {
    $('#paymentForm').prepend(`
      <div class="input-wrap">
        <label for="${input.selector}">
          ${input.name}
        </label>
        <input name="${input.selector}"
               id="${input.selector}"
               class="input">
        </input>
      </div>
    `);

    $(`#${input.selector}`).on('input', eventOnInput);
    $(`#${input.selector}`).on('blur', eventOnBlur);
    $(`#${input.selector}`).on('keydown', eventOnKeydown);
  });
}

export { renderPaymentForm };
