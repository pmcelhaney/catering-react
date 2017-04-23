export default function generateMenu() {
  const items = [
    {
      id: 1,
      name: 'BBQ',
      unitPrice: 4,
      categories: [
        'lunch',
        'dinner',
      ],
    },
    {
      id: 2,
      name: 'Baked beans',
      unitPrice: 2.50,
      categories: [
        'breakfast',
        'lunch',
        'dinner',
      ],
    },
    {
      id: 3,
      name: 'Buns',
      unitPrice: 0.50,
      categories: [
        'lunch',
      ],
    },
    {
      id: 4,
      name: 'Eggs',
      unitPrice: 2.75,
      categories: [
        'breakfast',
        'lunch',
      ],
    },
  ];

  for (let i = 5; i < 40; i += 1) {
    items.push({
      id: i,
      name: 'Another Item',
      unitPrice: Math.floor(Math.random() * 50) / 4,
    });
  }
  return items;
}
