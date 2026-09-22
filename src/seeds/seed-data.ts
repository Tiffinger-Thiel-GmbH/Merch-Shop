import {
  OrderCreateManyInput,
  OrderItemCreateManyInput,
  OrderItemVariantCreateManyInput,
  ProductCreateInput,
  ProductVariantCreateManyInput,
  UserCreateManyInput,
} from '../generated/prisma/models';

type SeedProductInput = ProductCreateInput;

export const productsData: SeedProductInput[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'T-Shirt',
    description: 'Schwarzes T-Shirt aus Baumwolle',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Pullijacke',
    description: 'Schwarze Sweatjacke mit Kapuze und Reißverschluss',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Tiffiletten',
    description: 'Schwarze Adiletten mit gepolstertem Fußbett',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    name: 'DinA4 Block weiß kariert',
    description: 'Weißer DinA4 Notizblock mit karierten Seiten',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    name: 'Notizheft',
    description: 'Schwarzes Notizheft mit karierten Seiten',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    name: 'Kugelschreiber',
    description: 'Schwarzer Kugelschreiber mit blauer Mine',
    imageUrl: 'http://localhost:3000/assets/default',
  },
  {
    id: '77777777-7777-4777-8777-777777777777',
    name: 'Feuerzeug',
    description: 'Schwarzes Einweg-Feuerzeug',
    imageUrl: 'http://localhost:3000/assets/default',
  },
];

export const productVariantsData: ProductVariantCreateManyInput[] = [
  // T-Shirt
  {
    id: '10000000-0000-4000-8000-000000000001',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: 'S',
    description: 'Größe S',
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: 'M',
    description: 'Größe M',
  },
  {
    id: '10000000-0000-4000-8000-000000000004',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: 'L',
    description: 'Größe L',
  },
  {
    id: '10000000-0000-4000-8000-000000000005',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: 'XL',
    description: 'Größe XL',
  },
  {
    id: '10000000-0000-4000-8000-000000000006',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: 'XXL',
    description: 'Größe XXL',
  },
  {
    id: '10000000-0000-4000-8000-000000000007',
    productId: '11111111-1111-4111-8111-111111111111',
    category: 'Größe',
    name: '3XL',
    description: 'Größe 3XL',
  },
  // Pullijacke
  {
    id: '10000000-0000-4000-8000-000000000008',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
  {
    id: '10000000-0000-4000-8000-000000000009',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: 'S',
    description: 'Größe S',
  },
  {
    id: '10000000-0000-4000-8000-000000000010',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: 'M',
    description: 'Größe M',
  },
  {
    id: '10000000-0000-4000-8000-000000000011',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: 'L',
    description: 'Größe L',
  },
  {
    id: '10000000-0000-4000-8000-000000000012',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: 'XL',
    description: 'Größe XL',
  },
  {
    id: '10000000-0000-4000-8000-000000000013',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: 'XXL',
    description: 'Größe XXL',
  },
  {
    id: '10000000-0000-4000-8000-000000000014',
    productId: '22222222-2222-4222-8222-222222222222',
    category: 'Größe',
    name: '3XL',
    description: 'Größe 3XL',
  },
  // Tiffiletten
  {
    id: '10000000-0000-4000-8000-000000000015',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
  {
    id: '10000000-0000-4000-8000-000000000016',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '37',
    description: 'Größe 37',
  },
  {
    id: '10000000-0000-4000-8000-000000000017',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '38',
    description: 'Größe 38',
  },
  {
    id: '10000000-0000-4000-8000-000000000018',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '39',
    description: 'Größe 39',
  },
  {
    id: '10000000-0000-4000-8000-000000000019',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '40',
    description: 'Größe 40',
  },
  {
    id: '10000000-0000-4000-8000-000000000020',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '41',
    description: 'Größe 41',
  },
  {
    id: '10000000-0000-4000-8000-000000000021',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '42',
    description: 'Größe 42',
  },
  {
    id: '10000000-0000-4000-8000-000000000022',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '43',
    description: 'Größe 43',
  },
  {
    id: '10000000-0000-4000-8000-000000000023',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '44',
    description: 'Größe 44',
  },
  {
    id: '10000000-0000-4000-8000-000000000024',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '45',
    description: 'Größe 45',
  },
  {
    id: '10000000-0000-4000-8000-000000000025',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '46',
    description: 'Größe 46',
  },
  {
    id: '10000000-0000-4000-8000-000000000026',
    productId: '33333333-3333-4333-8333-333333333333',
    category: 'Größe',
    name: '47',
    description: 'Größe 47',
  },
  // Notizheft
  {
    id: '10000000-0000-4000-8000-000000000027',
    productId: '55555555-5555-4555-8555-555555555555',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
  {
    id: '10000000-0000-4000-8000-000000000028',
    productId: '55555555-5555-4555-8555-555555555555',
    category: 'Liniatur',
    name: 'Kariert',
    description: 'Karierte Seiten',
  },
  // Kugelschreiber
  {
    id: '10000000-0000-4000-8000-000000000029',
    productId: '66666666-6666-4666-8666-666666666666',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
  // Feuerzeug
  {
    id: '10000000-0000-4000-8000-000000000030',
    productId: '77777777-7777-4777-8777-777777777777',
    category: 'Farbe',
    name: 'Schwarz',
    description: 'Deckendes Schwarz',
  },
];

export const userData: UserCreateManyInput[] = [{ id: '9aaca58e-4ea2-4008-bfc7-2007cd91c0f1', email: 'test@test.example', name: 'Test' }];

export const ordersData: OrderCreateManyInput[] = [
  { id: '20000000-0000-4000-8000-000000000001', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000002', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000003', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000004', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000005', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000006', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000007', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000008', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000009', userId: userData[0].id! },
  { id: '20000000-0000-4000-8000-000000000010', userId: userData[0].id! },
];

// Reihenfolge der Produkte je Bestellung: T-Shirt, Pullijacke, Tiffiletten, DinA4 Block,
// Notizheft, Kugelschreiber, Feuerzeug, T-Shirt, Pullijacke, Tiffiletten
export const ordersItemData: OrderItemCreateManyInput[] = [
  {
    id: '30000000-0000-4000-8000-000000000001',
    orderId: ordersData[0].id!,
    productId: productsData[0].id!, // T-Shirt
    name: productsData[0].name,
    description: productsData[0].description,
    quantity: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000002',
    orderId: ordersData[1].id!,
    productId: productsData[1].id!, // Pullijacke
    name: productsData[1].name,
    description: productsData[1].description,
    quantity: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000003',
    orderId: ordersData[2].id!,
    productId: productsData[2].id!, // Tiffiletten
    name: productsData[2].name,
    description: productsData[2].description,
    quantity: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000004',
    orderId: ordersData[3].id!,
    productId: productsData[3].id!, // DinA4 Block
    name: productsData[3].name,
    description: productsData[3].description,
    quantity: 3,
  },
  {
    id: '30000000-0000-4000-8000-000000000005',
    orderId: ordersData[4].id!,
    productId: productsData[4].id!, // Notizheft
    name: productsData[4].name,
    description: productsData[4].description,
    quantity: 2,
  },
  {
    id: '30000000-0000-4000-8000-000000000006',
    orderId: ordersData[5].id!,
    productId: productsData[5].id!, // Kugelschreiber
    name: productsData[5].name,
    description: productsData[5].description,
    quantity: 5,
  },
  {
    id: '30000000-0000-4000-8000-000000000007',
    orderId: ordersData[6].id!,
    productId: productsData[6].id!, // Feuerzeug
    name: productsData[6].name,
    description: productsData[6].description,
    quantity: 2,
  },
  {
    id: '30000000-0000-4000-8000-000000000008',
    orderId: ordersData[7].id!,
    productId: productsData[0].id!, // T-Shirt
    name: productsData[0].name,
    description: productsData[0].description,
    quantity: 2,
  },
  {
    id: '30000000-0000-4000-8000-000000000009',
    orderId: ordersData[8].id!,
    productId: productsData[1].id!, // Pullijacke
    name: productsData[1].name,
    description: productsData[1].description,
    quantity: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000010',
    orderId: ordersData[9].id!,
    productId: productsData[2].id!, // Tiffiletten
    name: productsData[2].name,
    description: productsData[2].description,
    quantity: 1,
  },
];

export const orderItemVariantData: OrderItemVariantCreateManyInput[] = [
  // Bestellung 1: T-Shirt, Schwarz, M
  {
    id: '40000000-0000-4000-8000-000000000001',
    orderItemId: ordersItemData[0].id!,
    productVariantId: productVariantsData[0].id!, // Farbe Schwarz
    category: productVariantsData[0].category,
    name: productVariantsData[0].name,
    description: productVariantsData[0].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000002',
    orderItemId: ordersItemData[0].id!,
    productVariantId: productVariantsData[2].id!, // Größe M
    category: productVariantsData[2].category,
    name: productVariantsData[2].name,
    description: productVariantsData[2].description,
  },
  // Bestellung 2: Pullijacke, Schwarz, L
  {
    id: '40000000-0000-4000-8000-000000000003',
    orderItemId: ordersItemData[1].id!,
    productVariantId: productVariantsData[7].id!, // Farbe Schwarz
    category: productVariantsData[7].category,
    name: productVariantsData[7].name,
    description: productVariantsData[7].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000004',
    orderItemId: ordersItemData[1].id!,
    productVariantId: productVariantsData[10].id!, // Größe L
    category: productVariantsData[10].category,
    name: productVariantsData[10].name,
    description: productVariantsData[10].description,
  },
  // Bestellung 3: Tiffiletten, Schwarz, 42
  {
    id: '40000000-0000-4000-8000-000000000005',
    orderItemId: ordersItemData[2].id!,
    productVariantId: productVariantsData[14].id!, // Farbe Schwarz
    category: productVariantsData[14].category,
    name: productVariantsData[14].name,
    description: productVariantsData[14].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000006',
    orderItemId: ordersItemData[2].id!,
    productVariantId: productVariantsData[20].id!, // Größe 42
    category: productVariantsData[20].category,
    name: productVariantsData[20].name,
    description: productVariantsData[20].description,
  },
  // Bestellung 4: DinA4 Block - keine Varianten
  // Bestellung 5: Notizheft, Schwarz, Kariert
  {
    id: '40000000-0000-4000-8000-000000000007',
    orderItemId: ordersItemData[4].id!,
    productVariantId: productVariantsData[26].id!, // Farbe Schwarz
    category: productVariantsData[26].category,
    name: productVariantsData[26].name,
    description: productVariantsData[26].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000008',
    orderItemId: ordersItemData[4].id!,
    productVariantId: productVariantsData[27].id!, // Kariert
    category: productVariantsData[27].category,
    name: productVariantsData[27].name,
    description: productVariantsData[27].description,
  },
  // Bestellung 6: Kugelschreiber, Schwarz
  {
    id: '40000000-0000-4000-8000-000000000009',
    orderItemId: ordersItemData[5].id!,
    productVariantId: productVariantsData[28].id!, // Farbe Schwarz
    category: productVariantsData[28].category,
    name: productVariantsData[28].name,
    description: productVariantsData[28].description,
  },
  // Bestellung 7: Feuerzeug, Schwarz
  {
    id: '40000000-0000-4000-8000-000000000010',
    orderItemId: ordersItemData[6].id!,
    productVariantId: productVariantsData[29].id!, // Farbe Schwarz
    category: productVariantsData[29].category,
    name: productVariantsData[29].name,
    description: productVariantsData[29].description,
  },
  // Bestellung 8: T-Shirt, Schwarz, XXL
  {
    id: '40000000-0000-4000-8000-000000000011',
    orderItemId: ordersItemData[7].id!,
    productVariantId: productVariantsData[0].id!, // Farbe Schwarz
    category: productVariantsData[0].category,
    name: productVariantsData[0].name,
    description: productVariantsData[0].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000012',
    orderItemId: ordersItemData[7].id!,
    productVariantId: productVariantsData[5].id!, // Größe XXL
    category: productVariantsData[5].category,
    name: productVariantsData[5].name,
    description: productVariantsData[5].description,
  },
  // Bestellung 9: Pullijacke, Schwarz, 3XL
  {
    id: '40000000-0000-4000-8000-000000000013',
    orderItemId: ordersItemData[8].id!,
    productVariantId: productVariantsData[7].id!, // Farbe Schwarz
    category: productVariantsData[7].category,
    name: productVariantsData[7].name,
    description: productVariantsData[7].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000014',
    orderItemId: ordersItemData[8].id!,
    productVariantId: productVariantsData[13].id!, // Größe 3XL
    category: productVariantsData[13].category,
    name: productVariantsData[13].name,
    description: productVariantsData[13].description,
  },
  // Bestellung 10: Tiffiletten, Schwarz, 45
  {
    id: '40000000-0000-4000-8000-000000000015',
    orderItemId: ordersItemData[9].id!,
    productVariantId: productVariantsData[14].id!, // Farbe Schwarz
    category: productVariantsData[14].category,
    name: productVariantsData[14].name,
    description: productVariantsData[14].description,
  },
  {
    id: '40000000-0000-4000-8000-000000000016',
    orderItemId: ordersItemData[9].id!,
    productVariantId: productVariantsData[23].id!, // Größe 45
    category: productVariantsData[23].category,
    name: productVariantsData[23].name,
    description: productVariantsData[23].description,
  },
];
