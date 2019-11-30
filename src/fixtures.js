// eslint-disable-next-line import/prefer-default-export
export const types = [
  {
    fields: [
      {
        name: 'offeredBy',
        to: [
          {
            type: 'organization',
          },
        ],
        type: 'reference',
      },
      {
        name: 'urlObject',
        title: 'URL Object',
        type: 'urlObject',
      },
      {
        name: 'discountCodes',
        of: [
          {
            type: 'discountCode',
          },
        ],
        type: 'array',
      },
      {
        name: 'discountCodeReferences',
        of: [
          {
            to: [{ type: 'discountCode' }],
            type: 'reference',
          },
        ],
        type: 'array',
      },
    ],
    name: 'memberPerk',
    type: 'document',
  },
  {
    name: 'organization',
    type: 'document',
  },
  {
    name: 'discountCode',
    type: 'document',
  },
  {
    name: 'urlObject',
    type: 'document',
  },
];
