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
        name: "discountCodeReferences",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "discountCode" }],
          },
        ],
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
