import { types } from '../../../fixtures';
import getNodesFromTypes from '.';

const sharedOutput = [
  '"organization" [ label ="<root> Organization" shape="record" style=rounded]',
  '"discountCode" [ label ="<root> Discount Code" shape="record" style=rounded]',
  '"urlObject" [ label ="<root> Url Object" shape="record" style=rounded]',
];

it('transforms types to nodes without showing fields', () => {
  const isShowingFields = false;
  const output = getNodesFromTypes(types, isShowingFields);
  expect(output).toEqual(['"memberPerk" [ label ="<root> Member Perk" shape="record" style=rounded]', ...sharedOutput]);
});

it('transforms types to nodes with showing fields', () => {
  const isShowingFields = true;
  const output = getNodesFromTypes(types, isShowingFields);
  expect(output).toEqual([
    '"memberPerk" [ label ="<root> Member Perk|<offeredBy> Offered By|<urlObject> URL Object|<discountCodes> Discount Codes|<discountCodeReferences> Discount Code References" shape="record" style=rounded]',
    ...sharedOutput,
  ]);
});
