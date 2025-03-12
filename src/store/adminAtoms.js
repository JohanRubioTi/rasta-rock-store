import { atom } from 'jotai';

export const adminStateAtom = atom({
  products: [
    {
      id: 1,
      name: 'Gorro Rasta',
      description: 'Gorro Rasta cálido y estiloso.',
      price: 25,
      imageUrl: 'https://placehold.co/400',
      category: 'clothing'
    },
    {
      id: 2,
      name: 'Camiseta Bob Marley',
      description: 'Camiseta clásica de Bob Marley.',
      price: 30,
      imageUrl: 'https://placehold.co/400',
      category: 'clothing'
    },
    {
      id: 3,
      name: 'Collar Signo de la Paz',
      description: 'Elegante collar con signo de la paz.',
      price: 15,
      imageUrl: 'https://placehold.co/400',
      category: 'accessories'
    },
    {
      id: 4,
      name: 'Set de Pulseras Rasta',
      description: 'Set de pulseras Rasta coloridas.',
      price: 20,
      imageUrl: 'https://placehold.co/400',
      category: 'accessories'
    },
    {
      id: 5,
      name: 'Papel de Liar - Tamaño King',
      description: 'Papel de liar tamaño king.',
      price: 5,
      imageUrl: 'https://placehold.co/400',
      category: 'smoke-accessories'
    },
    {
      id: 6,
      name: 'Grinder de Hierbas',
      description: 'Grinder de hierbas de alta calidad.',
      price: 35,
      imageUrl: 'https://placehold.co/400',
      category: 'smoke-accessories'
    },
    {
      id: 7,
      name: 'Posavasos Rasta Hechos a Mano',
      description: 'Set de posavasos Rasta hechos a mano.',
      price: 22,
      imageUrl: 'https://placehold.co/400',
      category: 'handmade-decorations'
    },
    {
      id: 8,
      name: 'Tapiz Rasta',
      description: 'Vibrante decoración de pared Rasta.',
      price: 40,
      imageUrl: 'https://placehold.co/400',
      category: 'handmade-decorations'
    },
    {
      id: 9,
      name: 'Piercing de Nariz - Oro',
      description: 'Piercing de nariz de oro.',
      price: 18,
      imageUrl: 'https://placehold.co/400',
      category: 'piercings'
    },
    {
      id: 10,
      name: 'Piercing de Oreja - Aros de Plata',
      description: 'Piercings de oreja de aros de plata.',
      price: 28,
      imageUrl: 'https://placehold.co/400',
      category: 'piercings'
    }
  ],
  shipments: [
    {
      id: 'shipment1',
      orderId: 'order1',
      status: 'pending',
      trackingNumber: null,
      shippedDate: null
    }
    // Additional shipments as needed
  ],
  inventory: {
    // Use product IDs as keys
    "product1": {
      quantity: 20,
      reorderThreshold: 5,
      lastUpdated: "2025-03-07T17:00:00Z"
    }
    // Additional inventory items
  },
  categories: [
    { id: 'all', name: 'Todos' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'clothing', name: 'Ropa' },
    { id: 'smoke-accessories', name: 'Accesorios de Fumar' },
    { id: 'handmade-decorations', name: 'Decoración Artesanal' },
    { id: 'piercings', name: 'Piercings' }
  ],
  orders: [
    {
      id: 'order1',
      items: [
        { productId: 'product1', quantity: 2 }
        // Additional items as needed
      ],
      buyer: {
        name: "John Doe",
        address: "123 Street"
      },
      payment: {
        status: 'pending',
        transactionId: null
      },
      orderStatus: 'processing',
      shipment: {
        trackingCode: '',
        trackingLink: ''
      },
      createdAt: "2025-03-07T17:00:00Z"
    }
    // Additional orders
  ]
});
