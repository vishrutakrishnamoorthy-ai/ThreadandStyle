import {
  User,
  Customer,
  Tailor,
  MeasurementProfile,
  Design,
  Fabric,
  TailoringOrder,
  Appointment,
  PaymentRecord,
  NotificationItem,
  OrderStatus,
  CustomSpecs,
} from '../types';

const STORAGE_KEY = 'thread_style_boutique_db_v1';

export interface DatabaseState {
  users: User[];
  currentUser: User;
  customers: Customer[];
  tailors: Tailor[];
  measurementProfiles: MeasurementProfile[];
  designs: Design[];
  fabrics: Fabric[];
  orders: TailoringOrder[];
  appointments: Appointment[];
  payments: PaymentRecord[];
  notifications: NotificationItem[];
}

// Initial realistic demo data
const initialUsers: User[] = [
  {
    id: 'user_admin_1',
    name: 'Meera Krishnan',
    email: 'meera@threadandstyle.com',
    phone: '+91 98401 23456',
    role: 'admin',
    city: 'Bengaluru',
    address: 'Indiranagar 100ft Road, Atelier #4',
  },
  {
    id: 'user_cust_1',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98200 44556',
    role: 'customer',
    city: 'Bengaluru',
    address: '42 Lavelle Road, Apartment 3B',
  },
  {
    id: 'user_cust_2',
    name: 'Pooja Verma',
    email: 'pooja.verma@example.com',
    phone: '+91 99880 12345',
    role: 'customer',
    city: 'Bengaluru',
    address: '77 Koramangala 4th Block',
  },
];

const initialCustomers: Customer[] = [
  {
    id: 'cust_1',
    userId: 'user_cust_1',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98200 44556',
    address: '42 Lavelle Road, Apartment 3B',
    city: 'Bengaluru',
    notes: 'Prefers deep back necklines with latkan tassels. Hand embroidery lover.',
    defaultProfileId: 'meas_1',
    createdAt: '2026-01-15',
  },
  {
    id: 'cust_2',
    userId: 'user_cust_2',
    name: 'Pooja Verma',
    email: 'pooja.verma@example.com',
    phone: '+91 99880 12345',
    address: '77 Koramangala 4th Block',
    city: 'Bengaluru',
    notes: 'Wedding reception client. Require trials on Saturday mornings.',
    defaultProfileId: 'meas_3',
    createdAt: '2026-02-01',
  },
  {
    id: 'cust_3',
    userId: 'user_cust_3',
    name: 'Divya Iyer',
    email: 'divya.iyer@example.com',
    phone: '+91 94440 88990',
    address: '14 Richmond Town Road',
    city: 'Bengaluru',
    notes: 'Traditional Kanjeevaram blouse specialist requests only.',
    createdAt: '2026-02-12',
  },
  {
    id: 'cust_4',
    userId: 'user_cust_4',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@example.com',
    phone: '+91 98490 11223',
    address: '102 Sadashivanagar 8th Main',
    city: 'Bengaluru',
    notes: 'VIP bridal client. Fast turnaround expected.',
    createdAt: '2026-02-20',
  },
  {
    id: 'cust_5',
    userId: 'user_cust_5',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 97250 66778',
    address: '56 HSR Layout Sector 2',
    city: 'Bengaluru',
    notes: 'Prefers organza and georgette gowns.',
    createdAt: '2026-03-01',
  },
  {
    id: 'cust_6',
    userId: 'user_cust_6',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@example.com',
    phone: '+91 94451 22334',
    address: '89 Malleshwaram 15th Cross',
    city: 'Bengaluru',
    notes: 'Silk blouse matching temple borders.',
    createdAt: '2026-03-05',
  },
  {
    id: 'cust_7',
    userId: 'user_cust_7',
    name: 'Radhika Menon',
    email: 'radhika.m@example.com',
    phone: '+91 98470 55443',
    address: '12 Cambridge Layout, Ulsoor',
    city: 'Bengaluru',
    notes: 'Comfortable daily wear kurtis and formal work suits.',
    createdAt: '2026-03-10',
  },
  {
    id: 'cust_8',
    userId: 'user_cust_8',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@example.com',
    phone: '+91 98110 33445',
    address: '24 Whitefield Palm Meadows',
    city: 'Bengaluru',
    notes: 'Sangeet party lehenga outfit order.',
    createdAt: '2026-03-14',
  },
  {
    id: 'cust_9',
    userId: 'user_cust_9',
    name: 'Shreya Sen',
    email: 'shreya.sen@example.com',
    phone: '+91 98300 77889',
    address: '61 JP Nagar 3rd Phase',
    city: 'Bengaluru',
    notes: 'Contemporary festive fusion outfits.',
    createdAt: '2026-03-22',
  },
  {
    id: 'cust_10',
    userId: 'user_cust_10',
    name: 'Priya Mukherjee',
    email: 'priya.m@example.com',
    phone: '+91 98311 99001',
    address: '18 Benson Town Crescent',
    city: 'Bengaluru',
    notes: 'Churidar sets with matching hand-embroidered dupattas.',
    createdAt: '2026-04-01',
  },
];

const initialTailors: Tailor[] = [
  {
    id: 'tailor_1',
    name: 'Master Rameshwar Mistri',
    phone: '+91 98402 11001',
    specialization: ['Blouse stitching', 'Bridal wear', 'Zari piping'],
    experienceYears: 24,
    activeWorkload: 3,
    status: 'available',
    rating: 4.9,
  },
  {
    id: 'tailor_2',
    name: 'Ustad Mumtaz Begum',
    phone: '+91 98402 22002',
    specialization: ['Embroidery', 'Zardozi', 'Maggam work', 'Bridal wear'],
    experienceYears: 18,
    activeWorkload: 4,
    status: 'busy',
    rating: 5.0,
  },
  {
    id: 'tailor_3',
    name: 'Suresh Babu',
    phone: '+91 98402 33003',
    specialization: ['Gown tailoring', 'Salwar Suit', 'Alteration'],
    experienceYears: 14,
    activeWorkload: 2,
    status: 'available',
    rating: 4.8,
  },
  {
    id: 'tailor_4',
    name: 'Fatima Zariwala',
    phone: '+91 98402 44004',
    specialization: ['Kids wear', 'Kurti', 'Churidar', 'Alteration'],
    experienceYears: 11,
    activeWorkload: 2,
    status: 'available',
    rating: 4.9,
  },
];

const initialMeasurementProfiles: MeasurementProfile[] = [
  {
    id: 'meas_1',
    customerId: 'cust_1',
    customerName: 'Ananya Sharma',
    name: 'Personal Measurements – Festive 2026',
    clothingType: 'blouse',
    isDefault: true,
    unit: 'inches',
    measurements: {
      bust: 36,
      waist: 29,
      shoulder: 14.5,
      armhole: 16.5,
      sleeveLength: 10.5,
      blouseLength: 14,
      frontNeckDepth: 7,
      backNeckDepth: 10,
      frontCross: 13,
      backCross: 14,
    },
    notes: 'Padded cups requested. Princess cut preferred.',
    updatedAt: '2026-03-20',
  },
  {
    id: 'meas_2',
    customerId: 'cust_1',
    customerName: 'Ananya Sharma',
    name: 'Kurti & Anarkali Fit',
    clothingType: 'kurti',
    isDefault: false,
    unit: 'inches',
    measurements: {
      bust: 36.5,
      waist: 30,
      hip: 40,
      shoulder: 14.5,
      sleeveLength: 18,
      dressLength: 46,
      neckDepth: 6.5,
    },
    notes: 'A-line silhouette with side slits.',
    updatedAt: '2026-02-18',
  },
  {
    id: 'meas_3',
    customerId: 'cust_2',
    customerName: 'Pooja Verma',
    name: 'Bridal Lehenga Choli Spec',
    clothingType: 'lehenga',
    isDefault: true,
    unit: 'inches',
    measurements: {
      bust: 38,
      waist: 32,
      shoulder: 15,
      blouseLength: 15,
      lehengaWaist: 31,
      lehengaLength: 42,
      hip: 41,
    },
    notes: 'Double can-can flare required. Heavy latkan ties.',
    updatedAt: '2026-03-10',
  },
  {
    id: 'meas_4',
    customerId: 'cust_3',
    customerName: 'Divya Iyer',
    name: 'Temple Silk Blouse Spec',
    clothingType: 'blouse',
    isDefault: true,
    unit: 'inches',
    measurements: {
      bust: 34,
      waist: 28,
      shoulder: 14,
      armhole: 15.5,
      sleeveLength: 11,
      blouseLength: 13.5,
      frontNeckDepth: 6.5,
      backNeckDepth: 8.5,
    },
    notes: 'Classic 4-dart cut, elbow length sleeves with border matching.',
    updatedAt: '2026-02-28',
  },
];

const initialDesigns: Design[] = [
  {
    id: 'des_1',
    name: 'Royal Aari Embroidered Silk Blouse',
    category: 'Saree Blouse',
    startingPrice: 3200,
    description: 'Intricately handcrafted boat neck blouse adorned with fine metallic zardosi, seed pearls, and French knots on pure raw mulberry silk.',
    estimatedDays: 7,
    neckline: 'Boat Neck',
    sleeve: 'Elbow Length (Puff/Fitted)',
    back: 'Deep V with Handcrafted Dori Latkans',
    fabricRecommended: 'Pure Raw Silk or Velvet',
    tags: ['Bridal', 'Handcrafted', 'Bestseller'],
    popularity: 98,
    silhouetteSvg: 'blouse_aari',
  },
  {
    id: 'des_2',
    name: 'Heirloom Kalidar Bridal Lehenga',
    category: 'Bridal Wear',
    startingPrice: 28500,
    description: '36-kali grand ceremonial lehenga skirt with a tailored corset choli, layered can-can netting, and a sheer embroidered scalloped dupatta.',
    estimatedDays: 18,
    neckline: 'Sweetheart',
    sleeve: 'Half Sleeve with Scalloped Hem',
    back: 'Keyhole with Sheer Tulle Inset',
    fabricRecommended: 'Banarasi Brocade & Raw Silk',
    tags: ['Bridal', 'Couture', 'Grand Kali'],
    popularity: 95,
    silhouetteSvg: 'lehenga_kalidar',
  },
  {
    id: 'des_3',
    name: 'Chanderi Silk Flared Angrakha Kurti',
    category: 'Kurti',
    startingPrice: 2800,
    description: 'Regal wrap-around Angrakha silhouette crafted in handloom Chanderi silk with antique gota patti piping and handcrafted potli buttons.',
    estimatedDays: 5,
    neckline: 'Angrakha V-Overlap',
    sleeve: 'Three-Quarter Bell',
    back: 'High Neck with Keyhole',
    fabricRecommended: 'Chanderi Silk or Linen',
    tags: ['Festive', 'Handloom', 'Office Chic'],
    popularity: 92,
    silhouetteSvg: 'kurti_angrakha',
  },
  {
    id: 'des_4',
    name: 'Ethereal Georgette Evening Gown',
    category: 'Gown',
    startingPrice: 6500,
    description: 'Flowing floor-length silhouette with delicate micro-pleating, hand-embellished crystal yoke, and an attached draped shoulder cowl.',
    estimatedDays: 9,
    neckline: 'V-Neck with Illusion Mesh',
    sleeve: 'Sleeveless with Soft Cowl',
    back: 'Low Back Cowl Drape',
    fabricRecommended: 'Pure Viscose Georgette',
    tags: ['Reception', 'Modern Cocktail', 'Fluid'],
    popularity: 88,
    silhouetteSvg: 'gown_cowl',
  },
  {
    id: 'des_5',
    name: 'Pakistani Cut Embroidered Salwar Suit',
    category: 'Salwar Suit',
    startingPrice: 3800,
    description: 'Straight-cut long tunic with intricate lace appliques, paired with relaxed organza-hem cigarette pants and an organza dupatta.',
    estimatedDays: 6,
    neckline: 'Round with Slit Placket',
    sleeve: 'Full Sleeve with Lace Scallop',
    back: 'Simple Closed Neck',
    fabricRecommended: 'Pure Organza & Modal Satin',
    tags: ['Pastels', 'Lace Border', 'Contemporary'],
    popularity: 91,
    silhouetteSvg: 'salwar_pakistani',
  },
  {
    id: 'des_6',
    name: 'Classic Silk Churidar Suit Set',
    category: 'Churidar',
    startingPrice: 3400,
    description: 'Timeless tailored silk kurta cut to perfection, paired with crisp hand-gathered 24-gather churidar trousers and zari border finish.',
    estimatedDays: 5,
    neckline: 'Mandarin Collar with Notch',
    sleeve: 'Three-Quarter Fitted',
    back: 'Standard Back',
    fabricRecommended: 'Tussar or Matka Silk',
    tags: ['Heritage', 'Minimalist', 'Graceful'],
    popularity: 86,
    silhouetteSvg: 'churidar_classic',
  },
  {
    id: 'des_7',
    name: 'Little Princess Brocade Pattu Pavadai',
    category: 'Kids Wear',
    startingPrice: 2200,
    description: 'Traditional South Indian festival skirt and blouse set crafted for little girls with soft breathable cotton lining and adjustable waistbands.',
    estimatedDays: 4,
    neckline: 'U-Neck with Contrast Piping',
    sleeve: 'Short Puff Sleeve',
    back: 'Button Placket with Soft Bow',
    fabricRecommended: 'Pure Kanchi Silk or Brocade',
    tags: ['Kids', 'Traditional', 'Cotton Lined'],
    popularity: 89,
    silhouetteSvg: 'kids_pavadai',
  },
  {
    id: 'des_8',
    name: 'Modern Draped Cocktail Saree Blouse',
    category: 'Custom Dress',
    startingPrice: 4200,
    description: 'Architectural boned bustier blouse with asymmetric pleated shoulder sash and pre-stitched structure for effortless drape.',
    estimatedDays: 8,
    neckline: 'Asymmetric One-Shoulder',
    sleeve: 'One-Shoulder Drape',
    back: 'Lace-Up Corset Back',
    fabricRecommended: 'Crepe Silk or Duchess Satin',
    tags: ['Modern Saree', 'Architectural', 'Cocktail'],
    popularity: 94,
    silhouetteSvg: 'blouse_corset',
  },
];

const initialFabrics: Fabric[] = [
  {
    id: 'fab_1',
    name: 'Raw Mulberry Silk (Katan)',
    type: 'Silk',
    color: 'Crimson Wine',
    hex: '#6B1D2F',
    quantityMeters: 48,
    pricePerMeter: 1450,
    supplier: 'Varanasi Weavers Guild',
    lowStockThreshold: 15,
  },
  {
    id: 'fab_2',
    name: 'Pure Chanderi Tissue Silk',
    type: 'Silk',
    color: 'Champagne Gold',
    hex: '#D4AF37',
    quantityMeters: 32,
    pricePerMeter: 1200,
    supplier: 'Madhya Pradesh Handlooms',
    lowStockThreshold: 10,
  },
  {
    id: 'fab_3',
    name: 'Heavy Viscose Georgette 60gm',
    type: 'Georgette',
    color: 'Dusty Rose Petal',
    hex: '#C88A8E',
    quantityMeters: 55,
    pricePerMeter: 650,
    supplier: 'Surat Textile Mills',
    lowStockThreshold: 20,
  },
  {
    id: 'fab_4',
    name: 'Royal Silk Velvet 9000',
    type: 'Velvet',
    color: 'Deep Midnight Emerald',
    hex: '#173F35',
    quantityMeters: 14, // low stock warning!
    pricePerMeter: 1850,
    supplier: 'Kashmir Velvet Artisans',
    lowStockThreshold: 15,
  },
  {
    id: 'fab_5',
    name: 'Organic Mercerized Cotton 80s',
    type: 'Cotton',
    color: 'Ivory Cream',
    hex: '#F7F3E9',
    quantityMeters: 75,
    pricePerMeter: 380,
    supplier: 'Coimbatore Cotton Mill',
    lowStockThreshold: 25,
  },
  {
    id: 'fab_6',
    name: 'Banarasi Antique Brocade',
    type: 'Brocade',
    color: 'Imperial Royal Navy',
    hex: '#1E2A38',
    quantityMeters: 8, // low stock warning!
    pricePerMeter: 2400,
    supplier: 'Varanasi Master Zari Weavers',
    lowStockThreshold: 12,
  },
];

const initialOrders: TailoringOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'TS-2026-00101',
    customerId: 'cust_1',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 98200 44556',
    designId: 'des_1',
    designName: 'Royal Aari Embroidered Silk Blouse',
    clothingType: 'blouse',
    customSpecs: {
      clothingType: 'blouse',
      neckline: 'Boat Neck',
      sleeve: 'Elbow Length',
      back: 'Deep V with Handcrafted Dori Latkans',
      fabricId: 'fab_1',
      fabricName: 'Raw Mulberry Silk (Crimson Wine)',
      fabricSource: 'boutique',
      color: 'Crimson Wine & Antique Gold',
      embroidery: 'Heavy Aari & Zardozi on sleeve borders and neckline',
      border: 'Fine antique zari cord piping',
      garmentLength: '14.5 inches',
      specialInstructions: 'Padded cups included, soft cotton lining for comfort.',
    },
    measurementProfileId: 'meas_1',
    measurementProfileName: 'Personal Measurements – Festive 2026',
    measurementSnapshot: {
      bust: 36,
      waist: 29,
      shoulder: 14.5,
      armhole: 16.5,
      sleeveLength: 10.5,
      blouseLength: 14,
    },
    tailorId: 'tailor_1',
    tailorName: 'Master Rameshwar Mistri',
    status: 'stitching',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-28 11:30', note: 'Order submitted by Ananya Sharma.', updatedBy: 'Ananya Sharma' },
      { status: 'measurement_confirmed', timestamp: '2026-03-29 10:15', note: 'Measurements verified with client.', updatedBy: 'Meera Krishnan' },
      { status: 'fabric_confirmed', timestamp: '2026-03-29 14:00', note: 'Mulberry silk allocated from inventory.', updatedBy: 'Meera Krishnan' },
      { status: 'cutting', timestamp: '2026-03-30 09:30', note: 'Fabric cut according to master pattern.', updatedBy: 'Master Rameshwar Mistri' },
      { status: 'stitching', timestamp: '2026-04-01 15:45', note: 'Main seams assembled, hand embroidery in progress.', updatedBy: 'Master Rameshwar Mistri' },
    ],
    pricing: {
      basePrice: 3200,
      fabricCost: 1450,
      customizationCost: 500,
      embroideryCost: 1200,
      totalPrice: 6350,
    },
    advancePaid: 3500,
    remainingAmount: 2850,
    paymentStatus: 'advance_paid',
    orderDate: '2026-03-28',
    expectedDeliveryDate: '2026-04-08',
    trialDate: '2026-04-05',
    priority: 'normal',
    internalNotes: 'Client has wedding on April 12th.',
  },
  {
    id: 'ord_2',
    orderNumber: 'TS-2026-00102',
    customerId: 'cust_2',
    customerName: 'Pooja Verma',
    customerPhone: '+91 99880 12345',
    designId: 'des_2',
    designName: 'Heirloom Kalidar Bridal Lehenga',
    clothingType: 'lehenga',
    customSpecs: {
      clothingType: 'lehenga',
      neckline: 'Sweetheart',
      sleeve: 'Half Sleeve',
      back: 'Keyhole with Latkans',
      fabricId: 'fab_6',
      fabricName: 'Banarasi Antique Brocade (Imperial Navy)',
      fabricSource: 'boutique',
      color: 'Imperial Navy with Rose Gold Zari',
      embroidery: 'Hand zardozi pearl work across all 36 kalis',
      border: '4-inch handwoven border with velvet backing',
      garmentLength: '42 inches',
      specialInstructions: 'Triple layer can-can crinoline for royal ballroom flare.',
    },
    measurementProfileId: 'meas_3',
    measurementProfileName: 'Bridal Lehenga Choli Spec',
    measurementSnapshot: {
      bust: 38,
      waist: 32,
      lehengaWaist: 31,
      lehengaLength: 42,
    },
    tailorId: 'tailor_2',
    tailorName: 'Ustad Mumtaz Begum',
    status: 'trial_ready',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-15 14:00', note: 'Bridal order created.', updatedBy: 'Meera Krishnan' },
      { status: 'measurement_confirmed', timestamp: '2026-03-16 11:00', note: 'In-atelier physical trial measurement.', updatedBy: 'Meera Krishnan' },
      { status: 'fabric_confirmed', timestamp: '2026-03-17 16:30', note: 'Banarasi brocade inspected and steamed.', updatedBy: 'Meera Krishnan' },
      { status: 'cutting', timestamp: '2026-03-20 10:00', note: 'All 36 panels drafted and cut.', updatedBy: 'Ustad Mumtaz Begum' },
      { status: 'stitching', timestamp: '2026-03-24 14:00', note: 'Assembled with can-can skirting.', updatedBy: 'Ustad Mumtaz Begum' },
      { status: 'trial_ready', timestamp: '2026-04-02 12:00', note: 'Ready for first bridal fitting trial.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 28500,
      fabricCost: 12000,
      customizationCost: 2500,
      embroideryCost: 8000,
      totalPrice: 51000,
    },
    advancePaid: 35000,
    remainingAmount: 16000,
    paymentStatus: 'partially_paid',
    orderDate: '2026-03-15',
    expectedDeliveryDate: '2026-04-14',
    trialDate: '2026-04-06',
    priority: 'urgent',
    internalNotes: 'VIP bride. Trial scheduled for tomorrow 11:30 AM.',
  },
  {
    id: 'ord_3',
    orderNumber: 'TS-2026-00103',
    customerId: 'cust_3',
    customerName: 'Divya Iyer',
    customerPhone: '+91 94440 88990',
    designId: 'des_1',
    designName: 'Temple Silk Blouse',
    clothingType: 'blouse',
    customSpecs: {
      clothingType: 'blouse',
      neckline: 'Round Neck',
      sleeve: 'Elbow Length',
      back: 'Square Back',
      fabricSource: 'customer_provided',
      fabricName: 'Customer Pure Kanjeevaram Silk Border',
      color: 'Emerald Green & Gold',
      embroidery: 'Kasavu zari cord detailing',
      border: 'Intact original saree pallu border',
      garmentLength: '13.5 inches',
      specialInstructions: 'Hand-tack temple motifs along back neckline.',
    },
    measurementProfileId: 'meas_4',
    measurementProfileName: 'Temple Silk Blouse Spec',
    measurementSnapshot: {
      bust: 34,
      waist: 28,
      blouseLength: 13.5,
    },
    tailorId: 'tailor_1',
    tailorName: 'Master Rameshwar Mistri',
    status: 'ready_pickup',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-22 10:00', note: 'Order placed with customer fabric.', updatedBy: 'Divya Iyer' },
      { status: 'cutting', timestamp: '2026-03-24 11:00', note: 'Carefully matched saree borders.', updatedBy: 'Master Rameshwar Mistri' },
      { status: 'stitching', timestamp: '2026-03-27 15:00', note: 'Stitched with pure cotton lining.', updatedBy: 'Master Rameshwar Mistri' },
      { status: 'final_check', timestamp: '2026-04-02 17:00', note: 'Quality check passed with zero tolerance.', updatedBy: 'Meera Krishnan' },
      { status: 'ready_pickup', timestamp: '2026-04-03 10:30', note: 'Packed in signature garment case.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 2800,
      fabricCost: 0,
      customizationCost: 400,
      embroideryCost: 900,
      totalPrice: 4100,
    },
    advancePaid: 4100,
    remainingAmount: 0,
    paymentStatus: 'fully_paid',
    orderDate: '2026-03-22',
    expectedDeliveryDate: '2026-04-05',
    priority: 'normal',
  },
  {
    id: 'ord_4',
    orderNumber: 'TS-2026-00104',
    customerId: 'cust_4',
    customerName: 'Kavita Reddy',
    customerPhone: '+91 98490 11223',
    designId: 'des_4',
    designName: 'Ethereal Georgette Evening Gown',
    clothingType: 'gown',
    customSpecs: {
      clothingType: 'gown',
      neckline: 'V-neck',
      sleeve: 'Sleeveless',
      back: 'Low Back Cowl',
      fabricId: 'fab_3',
      fabricName: 'Heavy Viscose Georgette (Dusty Rose)',
      fabricSource: 'boutique',
      color: 'Dusty Rose Petal',
      embroidery: 'Swarovski crystal scattering on corset yoke',
      border: 'Micro-rolled hem with horsehair braid',
      garmentLength: '58 inches',
      specialInstructions: 'Padded corset boning with inner waist stay belt.',
    },
    measurementProfileId: 'meas_1',
    measurementProfileName: 'Personal Measurements',
    measurementSnapshot: { bust: 35, waist: 27, hip: 38 },
    tailorId: 'tailor_3',
    tailorName: 'Suresh Babu',
    status: 'cutting',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-04-01 16:20', note: 'Express gown consultation.', updatedBy: 'Meera Krishnan' },
      { status: 'measurement_confirmed', timestamp: '2026-04-02 11:00', note: 'Confirmed measurements.', updatedBy: 'Meera Krishnan' },
      { status: 'fabric_confirmed', timestamp: '2026-04-02 14:00', note: 'Rose georgette allocated.', updatedBy: 'Meera Krishnan' },
      { status: 'cutting', timestamp: '2026-04-03 16:00', note: 'Corset boning drafted.', updatedBy: 'Suresh Babu' },
    ],
    pricing: {
      basePrice: 6500,
      fabricCost: 3250,
      customizationCost: 1200,
      embroideryCost: 2800,
      totalPrice: 13750,
    },
    advancePaid: 8000,
    remainingAmount: 5750,
    paymentStatus: 'partially_paid',
    orderDate: '2026-04-01',
    expectedDeliveryDate: '2026-04-12',
    trialDate: '2026-04-09',
    priority: 'urgent',
  },
  {
    id: 'ord_5',
    orderNumber: 'TS-2026-00105',
    customerId: 'cust_5',
    customerName: 'Sneha Patel',
    customerPhone: '+91 97250 66778',
    designId: 'des_3',
    designName: 'Chanderi Silk Flared Angrakha Kurti',
    clothingType: 'kurti',
    customSpecs: {
      clothingType: 'kurti',
      neckline: 'Angrakha V-Overlap',
      sleeve: 'Three-Quarter',
      back: 'High Neck',
      fabricId: 'fab_2',
      fabricName: 'Pure Chanderi Tissue Silk (Champagne Gold)',
      fabricSource: 'boutique',
      color: 'Champagne Gold & Coral',
      embroidery: 'Gota patti neckline and cuff work',
      border: 'Scalloped coral organza border',
      garmentLength: '45 inches',
      specialInstructions: 'Handcrafted cloth button closures along front wrap.',
    },
    measurementProfileId: 'meas_2',
    measurementProfileName: 'Kurti & Anarkali Fit',
    measurementSnapshot: { bust: 36.5, waist: 30, hip: 40 },
    tailorId: 'tailor_4',
    tailorName: 'Fatima Zariwala',
    status: 'delivered',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-10 11:00', note: 'Order placed.', updatedBy: 'Sneha Patel' },
      { status: 'cutting', timestamp: '2026-03-12 10:00', note: 'Cut.', updatedBy: 'Fatima Zariwala' },
      { status: 'stitching', timestamp: '2026-03-15 15:00', note: 'Stitched.', updatedBy: 'Fatima Zariwala' },
      { status: 'ready_pickup', timestamp: '2026-03-20 12:00', note: 'Ready.', updatedBy: 'Meera Krishnan' },
      { status: 'delivered', timestamp: '2026-03-22 17:30', note: 'Handed over to customer with garment cover.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 2800,
      fabricCost: 3600,
      customizationCost: 600,
      embroideryCost: 1500,
      totalPrice: 8500,
    },
    advancePaid: 8500,
    remainingAmount: 0,
    paymentStatus: 'fully_paid',
    orderDate: '2026-03-10',
    expectedDeliveryDate: '2026-03-22',
    priority: 'normal',
  },
  {
    id: 'ord_6',
    orderNumber: 'TS-2026-00106',
    customerId: 'cust_6',
    customerName: 'Meenakshi Sundaram',
    customerPhone: '+91 94451 22334',
    designId: 'des_1',
    designName: 'Heritage Silk Blouse',
    clothingType: 'blouse',
    customSpecs: {
      clothingType: 'blouse',
      neckline: 'Sweetheart',
      sleeve: 'Short',
      back: 'Keyhole',
      fabricId: 'fab_1',
      fabricName: 'Raw Mulberry Silk',
      fabricSource: 'boutique',
      color: 'Crimson Wine',
      embroidery: 'Subtle zari chain stitch along neck',
      border: 'Gold tissue piping',
      garmentLength: '14 inches',
      specialInstructions: 'Inner hooks with zipper backup.',
    },
    measurementProfileId: 'meas_1',
    measurementProfileName: 'Blouse Spec',
    measurementSnapshot: { bust: 37, waist: 31 },
    tailorId: 'tailor_1',
    tailorName: 'Master Rameshwar Mistri',
    status: 'alteration',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-25 10:00', note: 'Order placed.', updatedBy: 'Meera Krishnan' },
      { status: 'trial_ready', timestamp: '2026-04-01 11:00', note: 'Trial held.', updatedBy: 'Meera Krishnan' },
      { status: 'alteration', timestamp: '2026-04-02 15:30', note: 'Armhole adjusted 0.5 inches smaller.', updatedBy: 'Master Rameshwar Mistri' },
    ],
    pricing: {
      basePrice: 3200,
      fabricCost: 1450,
      customizationCost: 350,
      embroideryCost: 600,
      totalPrice: 5600,
    },
    advancePaid: 3000,
    remainingAmount: 2600,
    paymentStatus: 'advance_paid',
    orderDate: '2026-03-25',
    expectedDeliveryDate: '2026-04-07',
    priority: 'normal',
  },
  {
    id: 'ord_7',
    orderNumber: 'TS-2026-00107',
    customerId: 'cust_7',
    customerName: 'Radhika Menon',
    customerPhone: '+91 98470 55443',
    designId: 'des_5',
    designName: 'Pakistani Cut Embroidered Salwar Suit',
    clothingType: 'salwar',
    customSpecs: {
      clothingType: 'salwar',
      neckline: 'V-neck',
      sleeve: 'Full',
      back: 'Simple',
      fabricId: 'fab_5',
      fabricName: 'Organic Mercerized Cotton (Ivory Cream)',
      fabricSource: 'boutique',
      color: 'Ivory Cream',
      embroidery: 'Chikankari-style white on white thread work',
      border: 'Crochet lace edge',
      garmentLength: '47 inches',
      specialInstructions: 'Straight cigarette trousers with side pockets.',
    },
    measurementProfileId: 'meas_2',
    measurementProfileName: 'Salwar Spec',
    measurementSnapshot: { bust: 38, waist: 32, hip: 42 },
    tailorId: 'tailor_4',
    tailorName: 'Fatima Zariwala',
    status: 'order_placed',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-04-04 10:15', note: 'Online custom order created by client.', updatedBy: 'Radhika Menon' },
    ],
    pricing: {
      basePrice: 3800,
      fabricCost: 1900,
      customizationCost: 500,
      embroideryCost: 1400,
      totalPrice: 7600,
    },
    advancePaid: 4000,
    remainingAmount: 3600,
    paymentStatus: 'advance_paid',
    orderDate: '2026-04-04',
    expectedDeliveryDate: '2026-04-16',
    priority: 'normal',
  },
  {
    id: 'ord_8',
    orderNumber: 'TS-2026-00108',
    customerId: 'cust_8',
    customerName: 'Neha Kapoor',
    customerPhone: '+91 98110 33445',
    designId: 'des_2',
    designName: 'Bridal Sangeet Lehenga',
    clothingType: 'lehenga',
    customSpecs: {
      clothingType: 'lehenga',
      neckline: 'Sweetheart',
      sleeve: 'Sleeveless',
      back: 'Bow tie',
      fabricId: 'fab_4',
      fabricName: 'Royal Silk Velvet (Midnight Emerald)',
      fabricSource: 'boutique',
      color: 'Midnight Emerald',
      embroidery: 'Mirror work and sequin spray',
      border: 'Heavy antique golden border',
      garmentLength: '41 inches',
      specialInstructions: 'High-waist skirt with comfort side-elastic inserts.',
    },
    measurementProfileId: 'meas_3',
    measurementProfileName: 'Bridal Spec',
    measurementSnapshot: { bust: 36, waist: 29, hip: 39 },
    tailorId: 'tailor_2',
    tailorName: 'Ustad Mumtaz Begum',
    status: 'fabric_confirmed',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-04-02 11:00', note: 'Consultation completed.', updatedBy: 'Meera Krishnan' },
      { status: 'measurement_confirmed', timestamp: '2026-04-03 14:00', note: 'Fit parameters recorded.', updatedBy: 'Meera Krishnan' },
      { status: 'fabric_confirmed', timestamp: '2026-04-04 12:30', note: 'Velvet lot earmarked for embroidery.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 28500,
      fabricCost: 9250,
      customizationCost: 2000,
      embroideryCost: 6500,
      totalPrice: 46250,
    },
    advancePaid: 25000,
    remainingAmount: 21250,
    paymentStatus: 'advance_paid',
    orderDate: '2026-04-02',
    expectedDeliveryDate: '2026-04-20',
    trialDate: '2026-04-14',
    priority: 'urgent',
  },
  {
    id: 'ord_9',
    orderNumber: 'TS-2026-00109',
    customerId: 'cust_9',
    customerName: 'Shreya Sen',
    customerPhone: '+91 98300 77889',
    designId: 'des_8',
    designName: 'Modern Draped Cocktail Saree Blouse',
    clothingType: 'custom',
    customSpecs: {
      clothingType: 'custom',
      neckline: 'One-Shoulder',
      sleeve: 'Sleeveless',
      back: 'Lace-Up Corset',
      fabricId: 'fab_1',
      fabricName: 'Raw Mulberry Silk',
      fabricSource: 'boutique',
      color: 'Crimson Wine',
      embroidery: 'Hand-sewn bugle bead stripes',
      border: 'Minimal satin bind',
      garmentLength: '15 inches',
      specialInstructions: 'Internal structural boning on 6 channels.',
    },
    measurementProfileId: 'meas_1',
    measurementProfileName: 'Personal Spec',
    measurementSnapshot: { bust: 35, waist: 28 },
    tailorId: 'tailor_3',
    tailorName: 'Suresh Babu',
    status: 'measurement_confirmed',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-04-03 18:00', note: 'Order initiated online.', updatedBy: 'Shreya Sen' },
      { status: 'measurement_confirmed', timestamp: '2026-04-04 11:30', note: 'Customer profile validated.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 4200,
      fabricCost: 1450,
      customizationCost: 800,
      embroideryCost: 1200,
      totalPrice: 7650,
    },
    advancePaid: 4000,
    remainingAmount: 3650,
    paymentStatus: 'advance_paid',
    orderDate: '2026-04-03',
    expectedDeliveryDate: '2026-04-15',
    priority: 'normal',
  },
  {
    id: 'ord_10',
    orderNumber: 'TS-2026-00110',
    customerId: 'cust_10',
    customerName: 'Priya Mukherjee',
    customerPhone: '+91 98311 99001',
    designId: 'des_6',
    designName: 'Classic Silk Churidar Suit Set',
    clothingType: 'salwar',
    customSpecs: {
      clothingType: 'salwar',
      neckline: 'Round',
      sleeve: 'Three-Quarter',
      back: 'Simple',
      fabricId: 'fab_2',
      fabricName: 'Pure Chanderi Tissue Silk',
      fabricSource: 'boutique',
      color: 'Champagne Gold',
      embroidery: 'Zari buta bootis across body',
      border: 'Zari woven border',
      garmentLength: '46 inches',
      specialInstructions: 'Generous 3-inch margin left on side seams.',
    },
    measurementProfileId: 'meas_2',
    measurementProfileName: 'Churidar Measurements',
    measurementSnapshot: { bust: 38, waist: 32, hip: 41 },
    tailorId: 'tailor_4',
    tailorName: 'Fatima Zariwala',
    status: 'final_check',
    statusHistory: [
      { status: 'order_placed', timestamp: '2026-03-26 14:00', note: 'Order registered.', updatedBy: 'Meera Krishnan' },
      { status: 'cutting', timestamp: '2026-03-28 10:00', note: 'Pattern cut.', updatedBy: 'Fatima Zariwala' },
      { status: 'stitching', timestamp: '2026-03-31 16:00', note: 'Stitching finished.', updatedBy: 'Fatima Zariwala' },
      { status: 'final_check', timestamp: '2026-04-04 15:00', note: 'Ironed, buttons verified, awaiting pickup bag.', updatedBy: 'Meera Krishnan' },
    ],
    pricing: {
      basePrice: 3400,
      fabricCost: 3600,
      customizationCost: 500,
      embroideryCost: 1100,
      totalPrice: 8600,
    },
    advancePaid: 8600,
    remainingAmount: 0,
    paymentStatus: 'fully_paid',
    orderDate: '2026-03-26',
    expectedDeliveryDate: '2026-04-06',
    priority: 'normal',
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 'apt_1',
    appointmentNumber: 'APT-2026-041',
    customerId: 'cust_2',
    customerName: 'Pooja Verma',
    customerPhone: '+91 99880 12345',
    customerEmail: 'pooja.verma@example.com',
    type: 'trial',
    date: '2026-04-06',
    timeSlot: '11:00 AM - 12:00 PM',
    status: 'scheduled',
    notes: 'Trial fitting for Heirloom Kalidar Bridal Lehenga with shoes & can-can.',
    orderId: 'ord_2',
  },
  {
    id: 'apt_2',
    appointmentNumber: 'APT-2026-042',
    customerId: 'cust_1',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 98200 44556',
    customerEmail: 'ananya.sharma@example.com',
    type: 'trial',
    date: '2026-04-05',
    timeSlot: '03:00 PM - 04:00 PM',
    status: 'scheduled',
    notes: 'Aari silk blouse trial fitting and neck depth confirmation.',
    orderId: 'ord_1',
  },
  {
    id: 'apt_3',
    appointmentNumber: 'APT-2026-043',
    customerId: 'cust_4',
    customerName: 'Kavita Reddy',
    customerPhone: '+91 98490 11223',
    customerEmail: 'kavita.reddy@example.com',
    type: 'design_consultation',
    date: '2026-04-05',
    timeSlot: '04:30 PM - 05:30 PM',
    status: 'scheduled',
    notes: 'Discussion for cocktail evening gown fabric drape selection.',
    orderId: 'ord_4',
  },
  {
    id: 'apt_4',
    appointmentNumber: 'APT-2026-044',
    customerId: 'cust_3',
    customerName: 'Divya Iyer',
    customerPhone: '+91 94440 88990',
    customerEmail: 'divya.iyer@example.com',
    type: 'pickup',
    date: '2026-04-05',
    timeSlot: '02:00 PM - 02:45 PM',
    status: 'scheduled',
    notes: 'Final pickup of Temple Silk Blouse.',
    orderId: 'ord_3',
  },
  {
    id: 'apt_5',
    appointmentNumber: 'APT-2026-045',
    customerId: 'cust_9',
    customerName: 'Shreya Sen',
    customerPhone: '+91 98300 77889',
    customerEmail: 'shreya.sen@example.com',
    type: 'measurement',
    date: '2026-04-07',
    timeSlot: '10:00 AM - 11:00 AM',
    status: 'scheduled',
    notes: 'Fresh comprehensive bespoke measurements for modern draped corset.',
    orderId: 'ord_9',
  },
];

const initialPayments: PaymentRecord[] = [
  {
    id: 'pay_1',
    receiptNumber: 'RCP-2026-901',
    orderId: 'ord_1',
    orderNumber: 'TS-2026-00101',
    customerId: 'cust_1',
    customerName: 'Ananya Sharma',
    amount: 3500,
    paymentType: 'advance',
    paymentMethod: 'UPI / GPay',
    status: 'completed',
    transactionDate: '2026-03-28 11:45',
    notes: 'Advance booking payment confirmed.',
  },
  {
    id: 'pay_2',
    receiptNumber: 'RCP-2026-902',
    orderId: 'ord_2',
    orderNumber: 'TS-2026-00102',
    customerId: 'cust_2',
    customerName: 'Pooja Verma',
    amount: 35000,
    paymentType: 'advance',
    paymentMethod: 'Credit / Debit Card',
    status: 'completed',
    transactionDate: '2026-03-15 14:30',
    notes: '70% bridal token deposit received.',
  },
  {
    id: 'pay_3',
    receiptNumber: 'RCP-2026-903',
    orderId: 'ord_3',
    orderNumber: 'TS-2026-00103',
    customerId: 'cust_3',
    customerName: 'Divya Iyer',
    amount: 4100,
    paymentType: 'final',
    paymentMethod: 'UPI / GPay',
    status: 'completed',
    transactionDate: '2026-03-22 10:15',
    notes: '100% upfront settlement with discount coupon.',
  },
  {
    id: 'pay_4',
    receiptNumber: 'RCP-2026-904',
    orderId: 'ord_4',
    orderNumber: 'TS-2026-00104',
    customerId: 'cust_4',
    customerName: 'Kavita Reddy',
    amount: 8000,
    paymentType: 'advance',
    paymentMethod: 'Net Banking',
    status: 'completed',
    transactionDate: '2026-04-01 16:30',
    notes: 'Advance transfer for rush order.',
  },
  {
    id: 'pay_5',
    receiptNumber: 'RCP-2026-905',
    orderId: 'ord_5',
    orderNumber: 'TS-2026-00105',
    customerId: 'cust_5',
    customerName: 'Sneha Patel',
    amount: 8500,
    paymentType: 'final',
    paymentMethod: 'UPI / GPay',
    status: 'completed',
    transactionDate: '2026-03-22 17:35',
    notes: 'Settled upon delivery.',
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    recipientUserId: 'user_cust_1',
    recipientRole: 'customer',
    title: 'Trial Fitting Scheduled',
    message: 'Your Aari Silk Blouse (TS-2026-00101) is ready for trial fitting on April 5th at 3:00 PM.',
    type: 'order',
    linkOrderId: 'ord_1',
    read: false,
    createdAt: '2026-04-03 14:00',
  },
  {
    id: 'notif_2',
    recipientUserId: 'user_cust_1',
    recipientRole: 'customer',
    title: 'Advance Payment Received',
    message: '₹3,500 advance recorded for Order TS-2026-00101. Receipt #RCP-2026-901 generated.',
    type: 'payment',
    linkOrderId: 'ord_1',
    read: true,
    createdAt: '2026-03-28 11:50',
  },
  {
    id: 'notif_3',
    recipientUserId: 'user_admin_1',
    recipientRole: 'admin',
    title: 'Fabric Low Stock Alert',
    message: 'Banarasi Antique Brocade (8m) and Royal Silk Velvet (14m) have dipped below reorder thresholds.',
    type: 'system',
    read: false,
    createdAt: '2026-04-04 09:00',
  },
  {
    id: 'notif_4',
    recipientUserId: 'user_admin_1',
    recipientRole: 'admin',
    title: 'New Online Order Placed',
    message: 'Customer Radhika Menon placed customized order TS-2026-00107 for Pakistani Cut Salwar Suit.',
    type: 'order',
    linkOrderId: 'ord_7',
    read: false,
    createdAt: '2026-04-04 10:15',
  },
  {
    id: 'notif_5',
    recipientUserId: 'user_cust_2',
    recipientRole: 'customer',
    title: 'Bridal Trial Tomorrow',
    message: 'Your bridal trial for Order TS-2026-00102 is confirmed for tomorrow, April 6th at 11:00 AM.',
    type: 'appointment',
    linkOrderId: 'ord_2',
    read: false,
    createdAt: '2026-04-04 11:00',
  },
];

class DatabaseService {
  private state: DatabaseState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): DatabaseState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.orders && parsed.customers && parsed.designs) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load DB from localStorage, initializing fresh data', e);
    }

    const fresh: DatabaseState = {
      users: initialUsers,
      currentUser: initialUsers[1], // default to Ananya Sharma (Customer)
      customers: initialCustomers,
      tailors: initialTailors,
      measurementProfiles: initialMeasurementProfiles,
      designs: initialDesigns,
      fabrics: initialFabrics,
      orders: initialOrders,
      appointments: initialAppointments,
      payments: initialPayments,
      notifications: initialNotifications,
    };
    this.persist(fresh);
    return fresh;
  }

  private persist(state = this.state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist database state', e);
    }
  }

  public resetDatabase(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
  }

  public getState(): DatabaseState {
    return { ...this.state };
  }

  // --- Auth & User ---
  public getCurrentUser(): User {
    return this.state.currentUser;
  }

  public setCurrentUser(user: User): void {
    this.state.currentUser = user;
    this.persist();
  }

  public switchRole(role: 'customer' | 'admin', customerId?: string): User {
    if (role === 'admin') {
      const adminUser = this.state.users.find((u) => u.role === 'admin') || initialUsers[0];
      this.state.currentUser = adminUser;
    } else {
      let targetCust = this.state.customers[0];
      if (customerId) {
        const found = this.state.customers.find((c) => c.id === customerId);
        if (found) targetCust = found;
      }
      let custUser = this.state.users.find((u) => u.id === targetCust.userId);
      if (!custUser) {
        custUser = {
          id: targetCust.userId,
          name: targetCust.name,
          email: targetCust.email,
          phone: targetCust.phone,
          role: 'customer',
          city: targetCust.city,
          address: targetCust.address,
        };
        this.state.users.push(custUser);
      }
      this.state.currentUser = custUser;
    }
    this.persist();
    return this.state.currentUser;
  }

  public registerCustomer(name: string, email: string, phone: string, address: string, city = 'Bengaluru'): Customer {
    const userId = 'user_cust_' + Date.now();
    const custId = 'cust_' + (this.state.customers.length + 1);

    const newUser: User = {
      id: userId,
      name,
      email,
      phone,
      role: 'customer',
      city,
      address,
    };

    const newCustomer: Customer = {
      id: custId,
      userId,
      name,
      email,
      phone,
      address,
      city,
      createdAt: new Date().toISOString().split('T')[0],
    };

    this.state.users.push(newUser);
    this.state.customers.push(newCustomer);
    this.state.currentUser = newUser;
    this.persist();
    return newCustomer;
  }

  // --- Customers ---
  public getCustomers(): Customer[] {
    return [...this.state.customers];
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.state.customers.find((c) => c.id === id);
  }

  public getCustomerByUserId(userId: string): Customer | undefined {
    return this.state.customers.find((c) => c.userId === userId);
  }

  public updateCustomer(id: string, updates: Partial<Customer>): Customer {
    const idx = this.state.customers.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Customer not found');
    this.state.customers[idx] = { ...this.state.customers[idx], ...updates };
    this.persist();
    return this.state.customers[idx];
  }

  // --- Measurements ---
  public getMeasurementProfiles(customerId?: string): MeasurementProfile[] {
    if (!customerId) return [...this.state.measurementProfiles];
    return this.state.measurementProfiles.filter((m) => m.customerId === customerId);
  }

  public getMeasurementProfileById(id: string): MeasurementProfile | undefined {
    return this.state.measurementProfiles.find((m) => m.id === id);
  }

  public saveMeasurementProfile(profile: Omit<MeasurementProfile, 'id' | 'updatedAt'> & { id?: string }): MeasurementProfile {
    const now = new Date().toISOString().split('T')[0];
    if (profile.id) {
      const idx = this.state.measurementProfiles.findIndex((m) => m.id === profile.id);
      if (idx !== -1) {
        if (profile.isDefault) {
          this.clearOtherDefaults(profile.customerId);
        }
        this.state.measurementProfiles[idx] = {
          ...this.state.measurementProfiles[idx],
          ...profile,
          updatedAt: now,
        };
        this.persist();
        return this.state.measurementProfiles[idx];
      }
    }

    if (profile.isDefault) {
      this.clearOtherDefaults(profile.customerId);
    }

    const newProfile: MeasurementProfile = {
      ...profile,
      id: 'meas_' + Date.now(),
      updatedAt: now,
    };
    this.state.measurementProfiles.unshift(newProfile);
    this.persist();
    return newProfile;
  }

  private clearOtherDefaults(customerId: string) {
    this.state.measurementProfiles.forEach((m) => {
      if (m.customerId === customerId) m.isDefault = false;
    });
  }

  public deleteMeasurementProfile(id: string): boolean {
    const initialLen = this.state.measurementProfiles.length;
    this.state.measurementProfiles = this.state.measurementProfiles.filter((m) => m.id !== id);
    if (this.state.measurementProfiles.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Designs ---
  public getDesigns(): Design[] {
    return [...this.state.designs];
  }

  public getDesignById(id: string): Design | undefined {
    return this.state.designs.find((d) => d.id === id);
  }

  public addDesign(design: Omit<Design, 'id'>): Design {
    const newDesign: Design = {
      ...design,
      id: 'des_' + (this.state.designs.length + 1),
    };
    this.state.designs.unshift(newDesign);
    this.persist();
    return newDesign;
  }

  public updateDesign(id: string, updates: Partial<Design>): Design {
    const idx = this.state.designs.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error('Design not found');
    this.state.designs[idx] = { ...this.state.designs[idx], ...updates };
    this.persist();
    return this.state.designs[idx];
  }

  // --- Fabrics ---
  public getFabrics(): Fabric[] {
    return [...this.state.fabrics];
  }

  public getFabricById(id: string): Fabric | undefined {
    return this.state.fabrics.find((f) => f.id === id);
  }

  public addFabric(fabric: Omit<Fabric, 'id'>): Fabric {
    const newFab: Fabric = {
      ...fabric,
      id: 'fab_' + (this.state.fabrics.length + 1),
    };
    this.state.fabrics.push(newFab);
    this.persist();
    return newFab;
  }

  public updateFabric(id: string, updates: Partial<Fabric>): Fabric {
    const idx = this.state.fabrics.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Fabric not found');
    this.state.fabrics[idx] = { ...this.state.fabrics[idx], ...updates };
    this.persist();
    return this.state.fabrics[idx];
  }

  public deductFabricStock(id: string, meters: number): void {
    const fab = this.getFabricById(id);
    if (fab) {
      fab.quantityMeters = Math.max(0, fab.quantityMeters - meters);
      if (fab.quantityMeters <= fab.lowStockThreshold) {
        this.addNotification({
          recipientUserId: 'user_admin_1',
          recipientRole: 'admin',
          title: `Low Stock: ${fab.name}`,
          message: `${fab.name} stock has fallen to ${fab.quantityMeters}m (Threshold: ${fab.lowStockThreshold}m).`,
          type: 'system',
        });
      }
      this.persist();
    }
  }

  public deleteFabric(id: string): void {
    this.state.fabrics = this.state.fabrics.filter((f) => f.id !== id);
    this.persist();
  }

  // --- Tailors ---
  public getTailors(): Tailor[] {
    return [...this.state.tailors];
  }

  public getTailorById(id: string): Tailor | undefined {
    return this.state.tailors.find((t) => t.id === id);
  }

  public addTailor(tailor: Omit<Tailor, 'id' | 'activeWorkload'>): Tailor {
    const newTailor: Tailor = {
      ...tailor,
      id: 'tailor_' + (this.state.tailors.length + 1),
      activeWorkload: 0,
    };
    this.state.tailors.push(newTailor);
    this.persist();
    return newTailor;
  }

  public updateTailor(id: string, updates: Partial<Tailor>): Tailor {
    const idx = this.state.tailors.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Tailor not found');
    this.state.tailors[idx] = { ...this.state.tailors[idx], ...updates };
    this.persist();
    return this.state.tailors[idx];
  }

  // --- Orders ---
  public getOrders(customerId?: string): TailoringOrder[] {
    if (!customerId) return [...this.state.orders];
    return this.state.orders.filter((o) => o.customerId === customerId);
  }

  public getOrderById(id: string): TailoringOrder | undefined {
    return this.state.orders.find((o) => o.id === id);
  }

  public getOrderByNumber(orderNumber: string): TailoringOrder | undefined {
    return this.state.orders.find((o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase().trim());
  }

  public createOrder(data: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    designId?: string;
    designName: string;
    clothingType: TailoringOrder['clothingType'];
    customSpecs: CustomSpecs;
    measurementProfileId: string;
    measurementProfileName: string;
    measurementSnapshot: Record<string, number>;
    expectedDeliveryDate: string;
    pricing: TailoringOrder['pricing'];
    advancePaid: number;
    paymentMethod: PaymentRecord['paymentMethod'];
    priority?: 'normal' | 'urgent';
    notes?: string;
  }): TailoringOrder {
    const count = this.state.orders.length + 1;
    const orderNumber = `TS-2026-${String(count + 100).padStart(5, '0')}`;
    const id = 'ord_' + Date.now();
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const remaining = Math.max(0, data.pricing.totalPrice - data.advancePaid);
    const paymentStatus: TailoringOrder['paymentStatus'] =
      data.advancePaid >= data.pricing.totalPrice
        ? 'fully_paid'
        : data.advancePaid > 0
        ? 'advance_paid'
        : 'pending';

    const newOrder: TailoringOrder = {
      id,
      orderNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      designId: data.designId,
      designName: data.designName,
      clothingType: data.clothingType,
      customSpecs: data.customSpecs,
      measurementProfileId: data.measurementProfileId,
      measurementProfileName: data.measurementProfileName,
      measurementSnapshot: data.measurementSnapshot,
      status: 'order_placed',
      statusHistory: [
        {
          status: 'order_placed',
          timestamp: `${today} ${nowTime}`,
          note: 'Order placed by customer and logged into tailoring queue.',
          updatedBy: data.customerName,
        },
      ],
      pricing: data.pricing,
      advancePaid: data.advancePaid,
      remainingAmount: remaining,
      paymentStatus,
      orderDate: today,
      expectedDeliveryDate: data.expectedDeliveryDate,
      priority: data.priority || 'normal',
      internalNotes: data.notes,
    };

    // Auto-deduct fabric if boutique fabric was selected
    if (data.customSpecs.fabricId && data.customSpecs.fabricSource === 'boutique') {
      const meterEstimates: Record<string, number> = {
        blouse: 1.0,
        kurti: 2.5,
        salwar: 4.5,
        gown: 4.0,
        lehenga: 5.5,
        custom: 3.0,
      };
      const estMeters = meterEstimates[data.clothingType] || 2.0;
      this.deductFabricStock(data.customSpecs.fabricId, estMeters);
    }

    this.state.orders.unshift(newOrder);

    // Record advance payment if > 0
    if (data.advancePaid > 0) {
      const receiptNumber = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPay: PaymentRecord = {
        id: 'pay_' + Date.now(),
        receiptNumber,
        orderId: id,
        orderNumber,
        customerId: data.customerId,
        customerName: data.customerName,
        amount: data.advancePaid,
        paymentType: data.advancePaid >= data.pricing.totalPrice ? 'final' : 'advance',
        paymentMethod: data.paymentMethod,
        status: 'completed',
        transactionDate: `${today} ${nowTime}`,
        notes: `Advance for ${orderNumber} (${data.designName})`,
      };
      this.state.payments.unshift(newPay);
    }

    // Add notifications
    this.addNotification({
      recipientUserId: 'user_admin_1',
      recipientRole: 'admin',
      title: 'New Order Received',
      message: `${data.customerName} submitted order ${orderNumber} (${data.designName} - ₹${data.pricing.totalPrice.toLocaleString('en-IN')}).`,
      type: 'order',
      linkOrderId: id,
    });

    const cust = this.getCustomerById(data.customerId);
    if (cust) {
      this.addNotification({
        recipientUserId: cust.userId,
        recipientRole: 'customer',
        title: 'Order Confirmed',
        message: `Your order ${orderNumber} for "${data.designName}" is confirmed! Track progress anytime in your dashboard.`,
        type: 'order',
        linkOrderId: id,
      });
    }

    this.persist();
    return newOrder;
  }

  public updateOrderStatus(orderId: string, newStatus: OrderStatus, note: string, updatedBy: string): TailoringOrder {
    const idx = this.state.orders.findIndex((o) => o.id === orderId);
    if (idx === -1) throw new Error('Order not found');

    const order = this.state.orders[idx];
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    order.status = newStatus;
    order.statusHistory.push({
      status: newStatus,
      timestamp: `${today} ${nowTime}`,
      note: note || `Order status updated to ${newStatus.replace('_', ' ')}`,
      updatedBy,
    });

    // Notify customer
    const cust = this.getCustomerById(order.customerId);
    if (cust) {
      let title = `Order Update: ${order.orderNumber}`;
      let message = `Your outfit has progressed to: ${newStatus.replace(/_/g, ' ').toUpperCase()}`;
      if (newStatus === 'trial_ready') {
        title = `Trial Ready: ${order.orderNumber}`;
        message = `Your ${order.designName} is ready for trial! Please book a trial appointment or visit the atelier.`;
      } else if (newStatus === 'ready_pickup') {
        title = `Ready for Pickup: ${order.orderNumber}`;
        message = `Your bespoke creation is ready for pickup at Thread & Style Atelier.`;
      } else if (newStatus === 'delivered') {
        title = `Order Delivered: ${order.orderNumber}`;
        message = `Thank you for choosing Thread & Style. We hope you cherish wearing your bespoke outfit!`;
      }

      this.addNotification({
        recipientUserId: cust.userId,
        recipientRole: 'customer',
        title,
        message,
        type: 'order',
        linkOrderId: order.id,
      });
    }

    this.persist();
    return order;
  }

  public assignTailor(orderId: string, tailorId: string): TailoringOrder {
    const order = this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    const tailor = this.getTailorById(tailorId);
    if (!tailor) throw new Error('Tailor not found');

    // Decrement previous tailor workload if existed
    if (order.tailorId && order.tailorId !== tailorId) {
      const prev = this.getTailorById(order.tailorId);
      if (prev && prev.activeWorkload > 0) {
        prev.activeWorkload--;
      }
    }

    order.tailorId = tailor.id;
    order.tailorName = tailor.name;
    tailor.activeWorkload++;

    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    order.statusHistory.push({
      status: order.status,
      timestamp: `${today} ${nowTime}`,
      note: `Assigned to master craftsman ${tailor.name}.`,
      updatedBy: 'Meera Krishnan (Admin)',
    });

    this.persist();
    return order;
  }

  public recordOrderPayment(orderId: string, amount: number, method: PaymentRecord['paymentMethod'], notes?: string): PaymentRecord {
    const order = this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const receiptNumber = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    order.advancePaid += amount;
    order.remainingAmount = Math.max(0, order.pricing.totalPrice - order.advancePaid);

    if (order.remainingAmount === 0) {
      order.paymentStatus = 'fully_paid';
    } else if (order.advancePaid > 0) {
      order.paymentStatus = 'partially_paid';
    }

    const pay: PaymentRecord = {
      id: 'pay_' + Date.now(),
      receiptNumber,
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      customerName: order.customerName,
      amount,
      paymentType: order.remainingAmount === 0 ? 'final' : 'partial',
      paymentMethod: method,
      status: 'completed',
      transactionDate: `${today} ${nowTime}`,
      notes: notes || `Payment for ${order.orderNumber}`,
    };

    this.state.payments.unshift(pay);

    // Notifications
    const cust = this.getCustomerById(order.customerId);
    if (cust) {
      this.addNotification({
        recipientUserId: cust.userId,
        recipientRole: 'customer',
        title: 'Payment Received',
        message: `₹${amount.toLocaleString('en-IN')} received for ${order.orderNumber}. Balance: ₹${order.remainingAmount.toLocaleString('en-IN')}.`,
        type: 'payment',
        linkOrderId: order.id,
      });
    }

    this.persist();
    return pay;
  }

  // --- Appointments ---
  public getAppointments(customerId?: string): Appointment[] {
    if (!customerId) return [...this.state.appointments];
    return this.state.appointments.filter((a) => a.customerId === customerId);
  }

  public bookAppointment(data: Omit<Appointment, 'id' | 'appointmentNumber' | 'status'>): Appointment {
    // Check double-booking
    const exists = this.state.appointments.find(
      (a) => a.date === data.date && a.timeSlot === data.timeSlot && a.status === 'scheduled'
    );
    if (exists) {
      throw new Error(`The slot "${data.timeSlot}" on ${data.date} is already reserved. Please select another time slot.`);
    }

    const aptNumber = `APT-2026-${String(this.state.appointments.length + 50).padStart(3, '0')}`;
    const newApt: Appointment = {
      ...data,
      id: 'apt_' + Date.now(),
      appointmentNumber: aptNumber,
      status: 'scheduled',
    };

    this.state.appointments.unshift(newApt);

    // Notifications
    this.addNotification({
      recipientUserId: 'user_admin_1',
      recipientRole: 'admin',
      title: 'New Appointment Booked',
      message: `${data.customerName} booked ${data.type.replace('_', ' ')} for ${data.date} at ${data.timeSlot}.`,
      type: 'appointment',
    });

    const cust = this.getCustomerById(data.customerId);
    if (cust) {
      this.addNotification({
        recipientUserId: cust.userId,
        recipientRole: 'customer',
        title: 'Appointment Confirmed',
        message: `Your ${data.type.replace('_', ' ')} is reserved for ${data.date} at ${data.timeSlot}. We look forward to welcoming you!`,
        type: 'appointment',
      });
    }

    this.persist();
    return newApt;
  }

  public updateAppointmentStatus(id: string, status: Appointment['status']): Appointment {
    const idx = this.state.appointments.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Appointment not found');
    this.state.appointments[idx].status = status;
    this.persist();
    return this.state.appointments[idx];
  }

  public getAvailableTimeSlots(date: string): string[] {
    const allSlots = [
      '10:00 AM - 11:00 AM',
      '11:30 AM - 12:30 PM',
      '02:00 PM - 03:00 PM',
      '03:30 PM - 04:30 PM',
      '05:00 PM - 06:00 PM',
      '06:30 PM - 07:30 PM',
    ];
    const booked = this.state.appointments
      .filter((a) => a.date === date && a.status === 'scheduled')
      .map((a) => a.timeSlot);
    return allSlots.filter((slot) => !booked.includes(slot));
  }

  // --- Payments ---
  public getPayments(customerId?: string): PaymentRecord[] {
    if (!customerId) return [...this.state.payments];
    return this.state.payments.filter((p) => p.customerId === customerId);
  }

  // --- Notifications ---
  public getNotifications(userId?: string, role?: 'customer' | 'admin'): NotificationItem[] {
    return this.state.notifications.filter((n) => {
      if (role && n.recipientRole !== role && n.recipientRole !== 'all') return false;
      if (userId && n.recipientUserId !== userId && n.recipientRole !== 'admin') return false;
      return true;
    });
  }

  public markNotificationAsRead(id: string): void {
    const n = this.state.notifications.find((item) => item.id === id);
    if (n) {
      n.read = true;
      this.persist();
    }
  }

  public markAllNotificationsAsRead(userId?: string, role?: 'customer' | 'admin'): void {
    this.state.notifications.forEach((n) => {
      if (!role || n.recipientRole === role || n.recipientRole === 'all') {
        if (!userId || n.recipientUserId === userId) {
          n.read = true;
        }
      }
    });
    this.persist();
  }

  public addNotification(data: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>): NotificationItem {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const item: NotificationItem = {
      ...data,
      id: 'notif_' + Date.now() + Math.random().toString(36).substring(2, 6),
      read: false,
      createdAt: `${today} ${nowTime}`,
    };
    this.state.notifications.unshift(item);
    this.persist();
    return item;
  }
}

export const db = new DatabaseService();
