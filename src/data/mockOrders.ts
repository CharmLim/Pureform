import { DetailedOrder, UserProfile } from '../types';
import { PRODUCTS } from './products';

export const DEMO_USER: UserProfile = {
  id: 'usr_88921',
  name: 'Sarah Connor',
  email: 'sarah.connor@pureform.com',
  avatarInitials: 'SC',
  memberSince: 'March 2024',
  tier: 'PureForm Patron VIP',
  streakDays: 18,
  address: {
    street: '742 Evergreen Terrace, Suite 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
  },
};

export const INITIAL_MOCK_ORDERS: DetailedOrder[] = [
  {
    id: 'PF-99412',
    date: 'July 22, 2026',
    estimatedDelivery: 'July 25, 2026 (Tomorrow by 3 PM)',
    status: 'In Transit',
    trackingNumber: 'DHL-EXPRESS-984019284',
    carrier: 'DHL Express Air',
    items: [
      {
        productId: PRODUCTS[0].id,
        productName: PRODUCTS[0].name,
        imageUrl: PRODUCTS[0].imageUrl,
        quantity: 1,
        price: PRODUCTS[0].price,
        isSubscription: true,
      },
      {
        productId: PRODUCTS[1].id,
        productName: PRODUCTS[1].name,
        imageUrl: PRODUCTS[1].imageUrl,
        quantity: 1,
        price: PRODUCTS[1].price,
        isSubscription: false,
      },
    ],
    subtotal: 90.00,
    shippingCost: 0.00,
    total: 82.80, // discounted subscription rate
    shippingAddress: {
      name: 'Sarah Connor',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
    },
    trackingSteps: [
      {
        status: 'Order Confirmed',
        description: 'Payment verified and sachet production queued in clean laboratory.',
        timestamp: 'July 22, 09:15 AM',
        completed: true,
      },
      {
        status: 'Botanical Quality Inspection',
        description: 'HPLC purity verification and double-seal sachet packaging completed.',
        timestamp: 'July 22, 02:40 PM',
        completed: true,
      },
      {
        status: 'Dispatched from San Jose Facility',
        description: 'Tendered to DHL Express Hub. Package scanned into regional transit sorting line.',
        timestamp: 'July 23, 08:10 AM',
        completed: true,
      },
      {
        status: 'In Transit to Destination Facility',
        description: 'Package in flight to Oakland Regional Sorting Hub.',
        timestamp: 'July 23, 06:30 PM',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        description: 'Local courier dispatch scheduled for morning delivery run.',
        timestamp: 'July 25, Expected 08:30 AM',
        completed: false,
      },
      {
        status: 'Delivered',
        description: 'Package placed safely at doorstep or parcel collection unit.',
        timestamp: 'Pending',
        completed: false,
      },
    ],
  },
  {
    id: 'PF-89241',
    date: 'June 22, 2026',
    estimatedDelivery: 'Delivered June 24, 2026',
    status: 'Delivered',
    trackingNumber: 'FEDEX-PRIORITY-448102941',
    carrier: 'FedEx Priority Ground',
    items: [
      {
        productId: PRODUCTS[0].id,
        productName: PRODUCTS[0].name,
        imageUrl: PRODUCTS[0].imageUrl,
        quantity: 1,
        price: PRODUCTS[0].price,
        isSubscription: true,
      },
    ],
    subtotal: 48.00,
    shippingCost: 0.00,
    total: 40.80,
    shippingAddress: {
      name: 'Sarah Connor',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
    },
    trackingSteps: [
      {
        status: 'Order Confirmed',
        description: 'Order placed & payment processed.',
        timestamp: 'June 22, 10:00 AM',
        completed: true,
      },
      {
        status: 'Dispatched',
        description: 'Handed to FedEx courier.',
        timestamp: 'June 22, 04:00 PM',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        description: 'Loaded onto delivery truck.',
        timestamp: 'June 24, 08:15 AM',
        completed: true,
      },
      {
        status: 'Delivered',
        description: 'Delivered to front door. Signed by S. Connor.',
        timestamp: 'June 24, 02:22 PM',
        completed: true,
      },
    ],
  },
  {
    id: 'PF-77102',
    date: 'May 20, 2026',
    estimatedDelivery: 'Delivered May 22, 2026',
    status: 'Delivered',
    trackingNumber: 'USPS-PRIORITY-110293849',
    carrier: 'USPS Priority Mail',
    items: [
      {
        productId: PRODUCTS[0].id,
        productName: PRODUCTS[0].name,
        imageUrl: PRODUCTS[0].imageUrl,
        quantity: 1,
        price: PRODUCTS[0].price,
        isSubscription: true,
      },
      {
        productId: PRODUCTS[1].id,
        productName: PRODUCTS[1].name,
        imageUrl: PRODUCTS[1].imageUrl,
        quantity: 1,
        price: PRODUCTS[1].price,
        isSubscription: false,
      },
    ],
    subtotal: 90.00,
    shippingCost: 0.00,
    total: 76.50,
    shippingAddress: {
      name: 'Sarah Connor',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
    },
    trackingSteps: [
      {
        status: 'Delivered',
        description: 'Delivered to parcel locker.',
        timestamp: 'May 22, 11:45 AM',
        completed: true,
      },
    ],
  },
];
