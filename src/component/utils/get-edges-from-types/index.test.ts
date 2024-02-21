import getEdgesFromTypes from '.';
import types from '../../../fixtures';

it('transforms types to edges', () => {
  const output = getEdgesFromTypes(types);
  expect(output).toEqual([
    '"memberPerk":offeredBy -> "organization":root [penwidth="2" color="gray30" arrowsize="2"  arrowhead="tee"]',
    '"memberPerk":urlObject -> "urlObject":root [penwidth="2" color="gray30" arrowsize="2"  arrowhead="dot"]',
    '"memberPerk":discountCodes -> "discountCode":root [penwidth="2" color="gray30" arrowsize="2"  arrowhead="crow"]',
    '"memberPerk":discountCodeReferences -> "discountCode":root [penwidth="2" color="gray30" arrowsize="2"  arrowhead="crow"]',
  ]);
});
