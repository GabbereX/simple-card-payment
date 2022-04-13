import 'babel-polyfill';

import { getCustomCardBrands } from './payment-cart/card-valid.js';
import { renderPaymentForm } from './payment-cart/render-payment-form.js';

const inputDetail = [
  {
    selector: 'cardNumber',
    name: 'Номер карты',
  },
  {
    selector: 'expirationDate',
    name: 'Дата окончания действия карты (ММ/ГГ)',
  },
  {
    selector: 'cvcCvv',
    name: 'CVC/CVV',
  },
  {
    selector: 'email',
    name: 'Email для отправки онлайн-чека',
  },
].reverse();

getCustomCardBrands('Мир', 'mir', [2]);
getCustomCardBrands('JBC', 'jbc', [31, 35]);
renderPaymentForm(inputDetail);
