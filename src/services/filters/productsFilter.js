// const materials = [
//   {
//     id: 1,
//     name: "گلاسه",
//     categories: ["xwrap", "xbag"],
//   },
//   {
//     id: 2,
//     name: "کرافت",
//     categories: ["xwrap", "xbag"],
//   },
//   {
//     id: 3,
//     name: "لینن",
//     categories: ["xwrap"],
//   },
//   {
//     id: 4,
//     name: "رنگی",
//     categories: ["xwrap"],
//   },
//   {
//     id: 5,
//     name: "یووی",
//     categories: ["xwrap"],
//   },
//   {
//     id: 6,
//     name: "شاینی",
//     categories: ["xwrap"],
//   },
//   {
//     id: 7,
//     name: "مخمل",
//     categories: ["xwrap"],
//   },
//   {
//     id: 8,
//     name: "اوپال",
//     categories: ["xwrap"],
//   },
//   {
//     id: 9,
//     name: "متال باکس",
//     categories: ["xbox"],
//   },
//   {
//     id: 10,
//     name: "کیت باکس",
//     categories: ["xbox"],
//   },
//   {
//     id: 11,
//     name: "متال پات",
//     categories: ["xbox"],
//   },
//   {
//     id: 12,
//     name: "ویلو (مخمل)",
//     categories: ["xbag"],
//   },
//   {
//     id: 13,
//     name: "دفترچه دیلی بوکلت (بولت ژورنال)",
//     categories: ["xmemo"],
//   },
//   {
//     id: 14,
//     name: "دفترچه وولن بوکلت",
//     categories: ["xmemo"],
//   },
//   {
//     id: 15,
//     name: "دفترچه اسکچ بوکلت",
//     categories: ["xmemo"],
//   },
// ];

// export default materials;

const productsFilters = {
  xwrap: [
    {
      material: "گلاسه",
      sizes: [],
    },
    {
      material: "کرافت",
      sizes: [],
    },
    {
      material: "لینن",
      sizes: [],
    },
    {
      material: "رنگی",
      sizes: [],
    },
    {
      material: "یووی",
      sizes: [],
    },
    {
      material: "شاینی",
      sizes: [],
    },
    {
      material: "مخمل",
      sizes: [],
    },
    {
      material: "اوپال",
      sizes: [],
    },
  ],
  xbox: [
    {
      material: "متال باکس",
      sizes: Array.from({ length: 15 }, (_, i) => i + 1),
    },
    {
      material: "کیت باکس",
      sizes: Array.from({ length: 2 }, (_, i) => i + 1),
    },
    {
      material: "متال پات",
      sizes: [],
    },
  ],
  xbag: [
    {
      material: "گلاسه",
      sizes: Array.from({ length: 18 }, (_, i) => i + 1),
    },
    {
      material: "کرافت",
      sizes: Array.from({ length: 4 }, (_, i) => i + 1),
    },
    {
      material: "ویلو",
      sizes: [3],
    },
  ],
  xmemo: [
    {
      material: "دفترچه دیلی بوکلت (بولت ژورنال)",
      sizes: [3],
    },
    {
      material: "دفترچه وولن بوکلت",
      sizes: Array.from({ length: 6 }, (_, i) => i + 1),
    },
    {
      material: "دفترچه اسکچ بوکلت",
      sizes: [2],
    },
  ],
  tissue: [],
};

const productsFilterTemp = [
  {
    xwrap: [
      {
        material: "گلاسه",
        sizes: [],
      },
      {
        material: "کرافت",
        sizes: [],
      },
      {
        material: "لینن",
        sizes: [],
      },
      {
        material: "رنگی",
        sizes: [],
      },
      {
        material: "یووی",
        sizes: [],
      },
      {
        material: "شاینی",
        sizes: [],
      },
      {
        material: "مخمل",
        sizes: [],
      },
      {
        material: "اوپال",
        sizes: [],
      },
    ],
  },
  {
    xbox: [
      {
        material: "متال باکس",
        sizes: Array.from({ length: 15 }, (_, i) => i + 1),
      },
      {
        material: "کیت باکس",
        sizes: Array.from({ length: 2 }, (_, i) => i + 1),
      },
      {
        material: "متال پات",
        sizes: [],
      },
    ],
  },
  {
    xbag: [
      {
        material: "گلاسه",
        sizes: Array.from({ length: 18 }, (_, i) => i + 1),
      },
      {
        material: "کرافت",
        sizes: Array.from({ length: 4 }, (_, i) => i + 1),
      },
      {
        material: "ویلو",
        sizes: [3],
      },
    ],
  },
  {
    xmemo: [
      {
        material: "دفترچه دیلی بوکلت (بولت ژورنال)",
        sizes: [3],
      },
      {
        material: "دفترچه وولن بوکلت",
        sizes: Array.from({ length: 6 }, (_, i) => i + 1),
      },
      {
        material: "دفترچه اسکچ بوکلت",
        sizes: [2],
      },
    ],
  },
  {
    tissue: [],
  },
];

export { productsFilters, productsFilterTemp };
