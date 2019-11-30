import { types } from '../../../fixtures';
import getEdgesFromTypes from '.';

it('transforms types to edges', () => {
  const output = getEdgesFromTypes(types);
  expect(output).toEqual([
    '"memberPerk":offeredBy -> "organization":root [label="Offered By" arrowhead="tee"]',
    '"memberPerk":urlObject -> "urlObject":root [ arrowhead="dot"]',
    '"memberPerk":discountCodes -> "discountCode":root [label="Discount Codes" arrowhead="crow"]',
    '"memberPerk":discountCodeReferences -> "discountCode":root [label="Discount Code References" arrowhead="crow"]'
  ]);
});
