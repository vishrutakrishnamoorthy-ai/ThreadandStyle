export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatarUrl?: string;
  address?: string;
  city?: string;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  defaultProfileId?: string;
  createdAt: string;
}

export interface Tailor {
  id: string;
  name: string;
  phone: string;
  specialization: string[];
  experienceYears: number;
  activeWorkload: number;
  status: 'available' | 'busy' | 'on_leave';
  rating: number;
}

export type ClothingCategory =
  | 'Saree Blouse'
  | 'Kurti'
  | 'Salwar Suit'
  | 'Lehenga'
  | 'Gown'
  | 'Churidar'
  | 'Kids Wear'
  | 'Custom Dress'
  | 'Bridal Wear';

export type ClothingTypeKey = 'blouse' | 'kurti' | 'gown' | 'lehenga' | 'salwar' | 'custom';

export interface MeasurementProfile {
  id: string;
  customerId: string;
  customerName: string;
  name: string;
  clothingType: ClothingTypeKey;
  isDefault: boolean;
  measurements: Record<string, number>;
  unit: 'inches' | 'cm';
  notes?: string;
  updatedAt: string;
}

export interface Design {
  id: string;
  name: string;
  category: ClothingCategory;
  startingPrice: number;
  description: string;
  estimatedDays: number;
  neckline: string;
  sleeve: string;
  back: string;
  fabricRecommended: string;
  tags: string[];
  popularity: number;
  silhouetteSvg: string; // Key or SVG template for bespoke visualization
}

export interface Fabric {
  id: string;
  name: string;
  type: 'Cotton' | 'Silk' | 'Linen' | 'Georgette' | 'Chiffon' | 'Velvet' | 'Brocade' | 'Organza';
  color: string;
  hex: string;
  quantityMeters: number;
  pricePerMeter: number;
  supplier: string;
  lowStockThreshold: number;
}

export type OrderStatus =
  | 'order_placed'
  | 'measurement_confirmed'
  | 'fabric_confirmed'
  | 'cutting'
  | 'stitching'
  | 'trial_ready'
  | 'alteration'
  | 'final_check'
  | 'ready_pickup'
  | 'delivered';

export const ORDER_STATUS_ORDER: OrderStatus[] = [
  'order_placed',
  'measurement_confirmed',
  'fabric_confirmed',
  'cutting',
  'stitching',
  'trial_ready',
  'alteration',
  'final_check',
  'ready_pickup',
  'delivered',
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  order_placed: 'Order Placed',
  measurement_confirmed: 'Measurement Confirmed',
  fabric_confirmed: 'Fabric Confirmed',
  cutting: 'Cutting',
  stitching: 'Stitching',
  trial_ready: 'Trial Ready',
  alteration: 'Alteration',
  final_check: 'Final Quality Check',
  ready_pickup: 'Ready for Pickup',
  delivered: 'Delivered',
};

export interface CustomSpecs {
  clothingType: ClothingTypeKey;
  neckline: string;
  sleeve: string;
  back: string;
  fabricId?: string;
  fabricName: string;
  fabricSource: 'boutique' | 'customer_provided';
  color: string;
  embroidery: string;
  border: string;
  garmentLength: string;
  specialInstructions: string;
  referenceImage?: string;
}

export interface OrderPricing {
  basePrice: number;
  fabricCost: number;
  customizationCost: number;
  embroideryCost: number;
  totalPrice: number;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
  updatedBy: string;
}

export interface TailoringOrder {
  id: string;
  orderNumber: string; // e.g. "TS-2026-00125"
  customerId: string;
  customerName: string;
  customerPhone: string;
  designId?: string;
  designName: string;
  clothingType: ClothingTypeKey;
  customSpecs: CustomSpecs;
  measurementProfileId: string;
  measurementProfileName: string;
  measurementSnapshot: Record<string, number>;
  tailorId?: string;
  tailorName?: string;
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  pricing: OrderPricing;
  advancePaid: number;
  remainingAmount: number;
  paymentStatus: 'pending' | 'advance_paid' | 'partially_paid' | 'fully_paid' | 'refunded';
  orderDate: string;
  expectedDeliveryDate: string;
  trialDate?: string;
  priority: 'normal' | 'urgent';
  internalNotes?: string;
}

export type AppointmentType = 'measurement' | 'design_consultation' | 'trial' | 'pickup';

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  measurement: 'Measurement Appointment',
  design_consultation: 'Design Consultation',
  trial: 'Trial & Fitting Appointment',
  pickup: 'Outfit Pickup',
};

export interface Appointment {
  id: string;
  appointmentNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  type: AppointmentType;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  orderId?: string;
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentType: 'advance' | 'partial' | 'final';
  paymentMethod: 'UPI / GPay' | 'Credit / Debit Card' | 'Cash at Boutique' | 'Net Banking';
  status: 'completed' | 'pending';
  transactionDate: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  recipientUserId: string;
  recipientRole: 'customer' | 'admin' | 'all';
  title: string;
  message: string;
  type: 'order' | 'appointment' | 'payment' | 'system';
  linkOrderId?: string;
  read: boolean;
  createdAt: string;
}
