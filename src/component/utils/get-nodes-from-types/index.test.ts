import getNodesFromTypes from '.';
import types from '../../../fixtures';

it('transforms types to nodes without showing fields', () => {
  const isShowingFields = false;
  const output = getNodesFromTypes(types, isShowingFields);
  expect(output).toEqual([
    '"memberPerk" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="ghostwhite" border="0" port="root"><font  point-size="18">Member Perk</font></td></tr></table></font>> shape="none"]',
    '"organization" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="ghostwhite" border="0" port="root"><font  point-size="18">Organization</font></td></tr></table></font>> shape="none"]',
    '"discountCode" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="ghostwhite" border="0" port="root"><font  point-size="18">Discount Code</font></td></tr></table></font>> shape="none"]',
    '"urlObject" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="ghostwhite" border="0" port="root"><font  point-size="18">Url Object</font></td></tr></table></font>> shape="none"]',
  ]);
});

it('transforms types to nodes with showing fields', () => {
  const isShowingFields = true;
  const output = getNodesFromTypes(types, isShowingFields);
  expect(output).toEqual([
    '"memberPerk" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="mediumorchid" border="0" port="root"><font color="white" point-size="18">Member Perk</font></td></tr><tr><td align="left" border="0" bgcolor="white" port="offeredBy">Offered By</td></tr><tr><td align="left" border="0" bgcolor="white" port="urlObject">URL Object</td></tr><tr><td align="left" border="0" bgcolor="white" port="discountCodes">Discount Codes</td></tr><tr><td align="left" border="0" bgcolor="white" port="discountCodeReferences">Discount Code References</td></tr></table></font>> shape="none"]',
    '"organization" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="mediumorchid" border="0" port="root"><font color="white" point-size="18">Organization</font></td></tr></table></font>> shape="none"]',
    '"discountCode" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="mediumorchid" border="0" port="root"><font color="white" point-size="18">Discount Code</font></td></tr></table></font>> shape="none"]',
    '"urlObject" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td bgcolor="mediumorchid" border="0" port="root"><font color="white" point-size="18">Url Object</font></td></tr></table></font>> shape="none"]',
  ]);
});
