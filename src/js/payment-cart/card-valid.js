const valid = require('card-validator');

function getCustomCardBrands(niceType, type, patterns) {
  return valid.creditCardType.addCard({
    niceType: niceType,
    type: type,
    patterns: patterns,
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVV',
      size: 3,
    },
  });
}

export { valid, getCustomCardBrands };
