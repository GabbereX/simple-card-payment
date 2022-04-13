import { valid } from './card-valid.js';
import { error } from './error.js';
import { cardIcon } from './card-icon.js';
import { $, val, attr, removeAttr } from 'dom7';

$.fn.val = val;
$.fn.attr = attr;
$.fn.removeAttr = removeAttr;

let numberValidation = null;
let maxLengthCardNumber = 19;
let maxLengthCvcCvv = 3;
let cardGaps = [4, 8, 12];
let selectionStart = null;

const validationProgress = {
  cardNumber: 0,
  expirationDate: 0,
  cvcCvv: 0,
  email: 0,
  count() {
    return this.cardNumber + this.expirationDate + this.cvcCvv + this.email;
  },
};

function eventOnInput(e) {
  error(`#${e.target.id}`, false);

  if (['cardNumber', 'expirationDate', 'cvcCvv'].includes(e.target.id)) {
    const input = $(`#${e.target.id}`);
    input.val(input.val().replace(/[^\d\s/]/g, ''));
  }

  if (e.target.id === 'cardNumber') {
    numberValidation = valid.number(cardNumber.value);

    if (numberValidation.card) {
      cardGaps = numberValidation.card.gaps;
      maxLengthCvcCvv = numberValidation.card.code.size;
      maxLengthCardNumber =
        Math.max(...numberValidation.card.lengths) +
        numberValidation.card.gaps.length;

      cardIcon(numberValidation.card.type);
    } else {
      $('#card-icon') && $('#card-icon').remove();
    }

    $('#cardNumber').attr('maxlength', maxLengthCardNumber);
    $('#cvcCvv').attr('maxlength', maxLengthCvcCvv);

    if (cardNumber.value.length === cardNumber.selectionStart) {
      if (cardGaps.includes(cardNumber.value.replace(/\D/g, '').length)) {
        cardNumber.value += ' ';
      }
    }

    if (cardNumber.value.length === maxLengthCardNumber) {
      validationProgress.cardNumber = 1;
    } else {
      validationProgress.cardNumber = 0;
    }
  }

  if (e.target.id === 'expirationDate') {
    $('#expirationDate').attr('maxlength', 5);
    expirationDate.value.length === 2 && (expirationDate.value += '/');

    if (expirationDate.value.length === 5) {
      validationProgress.expirationDate = 1;
    } else {
      validationProgress.expirationDate = 0;
    }
  }

  if (e.target.id === 'cvcCvv') {
    if (cvcCvv.value.length === maxLengthCvcCvv) {
      validationProgress.cvcCvv = 1;
    } else {
      validationProgress.cvcCvv = 0;
    }
  }

  if (e.target.id === 'email') {
    email.value = email.value.replace(/[^\-\w\@\.]/, '');

    if (/[-\w]{2,}@[-\w\.]{2,10}\.[\w]{2,10}/.test(email.value)) {
      validationProgress.email = 1;
    } else {
      validationProgress.email = 0;
    }
  }

  checkValidation();
}

function eventOnBlur(e) {
  if (e.target.id === 'cardNumber') {
    numberValidation = valid.number(cardNumber.value);

    if (cardNumber.value) {
      cardNumber.value = cardNumber.value
        .replace(/\D/g, '')
        .split('')
        .map((item, index) =>
          cardGaps.includes(index + 1) ? (item += ' ') : item
        )
        .join('');
    }

    if (!numberValidation.isValid) {
      error('#cardNumber', 'Номер карты введен неверно!');
      validationProgress.cardNumber = 0;
    } else {
      error('#cardNumber', false);
      validationProgress.cardNumber = 1;
    }
  }

  if (e.target.id === 'expirationDate') {
    const date = expirationDate.value;
    const month = date.substring(0, 2);
    const year = date.substring(3, 5);
    const nowMonth = new Date().getMonth() + 1;
    const nowYear = new Date().getFullYear().toString().substring(2);

    if (
      date.length !== 5 ||
      month > 12 ||
      month < 1 ||
      year < nowYear ||
      (year === nowYear && +month <= nowMonth)
    ) {
      error('#expirationDate', 'Дата действия карты введена неверно!');
      validationProgress.expirationDate = 0;
    } else {
      error('#expirationDate', false);
      validationProgress.expirationDate = 1;
    }
  }

  if (e.target.id === 'cvcCvv') {
    cvcCvv.value.length < maxLengthCvcCvv
      ? error('#cvcCvv', `Минимальное количество цифр: ${maxLengthCvcCvv}`)
      : error('#cvcCvv', false);
  }

  if (e.target.id === 'email') {
    !/[-\w]{2,}@[-\w\.]{2,10}\.[\w]{2,10}/.test(email.value)
      ? error('#email', `Неверный формат электронной почты`)
      : error('#email', false);
  }

  checkValidation();
}

function eventOnKeydown(e) {
  if (e.code === 'Space' || e.code === 'Slash') {
    return e.preventDefault();
  }

  const deleteSpace = (spacePosition, splicePosition, countSpaces) => {
    if (cardNumber.value[cardNumber.selectionStart - spacePosition] === ' ') {
      const value = cardNumber.value.split('');
      value.splice(cardNumber.selectionStart - splicePosition, countSpaces);
      cardNumber.value = value.join('');
      cardNumber.selectionStart = selectionStart;
      cardNumber.selectionEnd = selectionStart;
    }
  };

  if (e.code === 'Backspace') {
    selectionStart = cardNumber.selectionStart - 1;
    deleteSpace(1, 1, 1);
    deleteSpace(2, 2, 1);
  }

  if (e.code === 'Delete') {
    selectionStart = cardNumber.selectionStart;
    deleteSpace(0, -1, 1);
    deleteSpace(-1, 0, 1);
  }
}

function checkValidation() {
  if (validationProgress.count() === 4) {
    $('.btn').removeAttr('disabled');
  } else {
    $('.btn').attr('disabled', true);
  }
}

export { eventOnBlur, eventOnInput, eventOnKeydown };
