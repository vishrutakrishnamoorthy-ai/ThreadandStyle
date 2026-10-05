/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { db, DatabaseState } from './services/db';
import {
  User as UserType,
  Customer,
  Design,
  CustomSpecs,
  TailoringOrder,
  OrderStatus,
  Appointment,
  PaymentRecord,
  MeasurementProfile,
} from './types';
import { Header } from './components/common/Header';
import { LandingPage } from './components/pages/LandingPage';
import { DesignCollectionPage } from './components/pages/DesignCollectionPage';
import { CustomDesignerPage } from './components/pages/CustomDesignerPage';
import { MeasurementsPage } from './components/pages/MeasurementsPage';
import { CustomerDashboardPage } from './components/pages/CustomerDashboardPage';
import { AppointmentsPage } from './components/pages/AppointmentsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminOrdersManager } from './components/admin/AdminOrdersManager';
import { FabricInventoryManager } from './components/admin/FabricInventoryManager';
import { TailorManager } from './components/admin/TailorManager';
import { CustomerManager } from './components/admin/CustomerManager';
import { OrderCreationModal } from './components/orders/OrderCreationModal';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { ToastContainer, ToastMessage } from './components/common/Toast';

export default function App() {
  // Database reactive state
  const [dbState, setDbState] = useState<DatabaseState>(() => db.getState());
  const [currentUser, setCurrentUser] = useState<UserType>(() => db.getCurrentUser());

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalCustomSpecs, setOrderModalCustomSpecs] = useState<CustomSpecs | null>(null);
  const [orderModalPrice, setOrderModalPrice] = useState<number>(3200);
  const [orderModalDesignName, setOrderModalDesignName] = useState<string>('Bespoke Creation');

  // Notifications drawer state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [inspectedOrderId, setInspectedOrderId] = useState<string | null>(null);

  // Active customer helper
  const currentCustomer = dbState.customers.find((c) => c.userId === currentUser.id) || dbState.customers[0];

  // Toast notification system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshState = () => {
    setDbState(db.getState());
    setCurrentUser(db.getCurrentUser());
  };

  // Role switching
  const handleRoleSwitch = (role: 'customer' | 'admin', customerId?: string) => {
    const updated = db.switchRole(role, customerId);
    setCurrentUser(updated);
    refreshState();
    addToast('info', 'Role Switched', `Active as ${updated.name} (${updated.role.toUpperCase()})`);
  };

  // Handling Customizer hand-off to Order Creation Flow
  const handleProceedToOrderFromDesigner = (
    customSpecs: CustomSpecs,
    estimatedPrice: number,
    designName: string
  ) => {
    setOrderModalCustomSpecs(customSpecs);
    setOrderModalPrice(estimatedPrice);
    setOrderModalDesignName(designName);
    setIsOrderModalOpen(true);
  };

  // Selecting a design from catalog to customize
  const handleCustomizeDesignFromCatalog = (design: Design) => {
    const specs: CustomSpecs = {
      clothingType: design.category.toLowerCase().includes('blouse')
        ? 'blouse'
        : design.category.toLowerCase().includes('kurti')
        ? 'kurti'
        : design.category.toLowerCase().includes('lehenga') || design.category.toLowerCase().includes('bridal')
        ? 'lehenga'
        : design.category.toLowerCase().includes('gown')
        ? 'gown'
        : 'salwar',
      neckline: design.neckline,
      sleeve: design.sleeve,
      back: design.back,
      fabricName: design.fabricRecommended,
      fabricSource: 'boutique',
      color: 'Boutique Signature Shade',
      embroidery: 'Handcrafted Zari & Thread Work',
      border: 'Fine Piping Border',
      garmentLength: 'Custom Length',
      specialInstructions: `Tailored according to "${design.name}" master silhouette.`,
    };
    setOrderModalCustomSpecs(specs);
    setOrderModalPrice(design.startingPrice);
    setOrderModalDesignName(design.name);
    setActiveTab('designer');
  };

  // Create Order Confirmation
  const handleOrderCreated = (orderData: any) => {
    try {
      const order = db.createOrder(orderData);
      refreshState();
      addToast(
        'success',
        'Order Placed Successfully!',
        `Order #${order.orderNumber} for "${order.designName}" is logged into the atelier queue.`
      );
      if (currentUser.role === 'customer') {
        setActiveTab('customer_dashboard');
      } else {
        setActiveTab('admin_orders');
      }
    } catch (e: any) {
      addToast('error', 'Order Error', e.message || 'Failed to place order.');
    }
  };

  // Measurement Profile handlers
  const handleSaveMeasurementProfile = (profileData: any) => {
    const saved = db.saveMeasurementProfile(profileData);
    refreshState();
    addToast('success', 'Profile Saved', `Measurement profile "${saved.name}" updated successfully.`);
  };

  const handleDeleteMeasurementProfile = (id: string) => {
    if (confirm('Are you sure you want to remove this measurement profile?')) {
      db.deleteMeasurementProfile(id);
      refreshState();
      addToast('info', 'Profile Deleted', 'Measurement profile has been removed.');
    }
  };

  // Admin order status update
  const handleAdminUpdateOrderStatus = (orderId: string, status: OrderStatus, note: string) => {
    try {
      const updated = db.updateOrderStatus(orderId, status, note, currentUser.name);
      refreshState();
      addToast(
        'success',
        'Status Advanced',
        `Order ${updated.orderNumber} is now marked as "${status.replace(/_/g, ' ').toUpperCase()}".`
      );
    } catch (e: any) {
      addToast('error', 'Update Failed', e.message);
    }
  };

  // Admin assign tailor
  const handleAdminAssignTailor = (orderId: string, tailorId: string) => {
    try {
      const updated = db.assignTailor(orderId, tailorId);
      refreshState();
      addToast(
        'success',
        'Craftsman Assigned',
        `Order ${updated.orderNumber} assigned to ${updated.tailorName}.`
      );
    } catch (e: any) {
      addToast('error', 'Assignment Failed', e.message);
    }
  };

  // Record payment
  const handleRecordPayment = (orderId: string, amount: number, method: PaymentRecord['paymentMethod']) => {
    try {
      const pay = db.recordOrderPayment(orderId, amount, method);
      refreshState();
      addToast(
        'success',
        'Payment Recorded',
        `₹${amount.toLocaleString('en-IN')} received for Order ${pay.orderNumber}. Receipt #${pay.receiptNumber}.`
      );
    } catch (e: any) {
      addToast('error', 'Payment Failed', e.message);
    }
  };

  // Appointments
  const handleBookAppointment = (data: any) => {
    try {
      const apt = db.bookAppointment(data);
      refreshState();
      addToast(
        'success',
        'Appointment Confirmed',
        `Reserved for ${apt.date} at ${apt.timeSlot} (${apt.type.replace('_', ' ')}).`
      );
    } catch (e: any) {
      addToast('error', 'Booking Conflict', e.message);
    }
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment['status']) => {
    db.updateAppointmentStatus(id, status);
    refreshState();
    addToast('info', 'Appointment Updated', `Marked as ${status}.`);
  };

  // Fabric CRUD
  const handleAddFabric = (fab: any) => {
    const newFab = db.addFabric(fab);
    refreshState();
    addToast('success', 'Fabric Added', `${newFab.name} registered in inventory.`);
  };

  const handleUpdateFabric = (id: string, updates: any) => {
    db.updateFabric(id, updates);
    refreshState();
    addToast('info', 'Fabric Updated', 'Stock & pricing updated.');
  };

  const handleDeleteFabric = (id: string) => {
    if (confirm('Delete this fabric from inventory?')) {
      db.deleteFabric(id);
      refreshState();
      addToast('info', 'Fabric Removed', 'Fabric deleted from inventory.');
    }
  };

  // Tailor CRUD
  const handleAddTailor = (tailorData: any) => {
    const t = db.addTailor(tailorData);
    refreshState();
    addToast('success', 'Craftsman Registered', `${t.name} added to atelier roster.`);
  };

  const handleUpdateTailor = (id: string, updates: any) => {
    db.updateTailor(id, updates);
    refreshState();
    addToast('info', 'Tailor Updated', 'Craftsman profile updated.');
  };

  // Notifications
  const currentNotifications = db.getNotifications(
    currentUser.role === 'customer' ? currentUser.id : undefined,
    currentUser.role
  );
  const unreadNotificationsCount = currentNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1716] flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Header
        currentUser={currentUser}
        onRoleSwitch={handleRoleSwitch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadNotificationsCount}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onExploreCollections={() => setActiveTab('designs')}
            onStartCustomizer={() => setActiveTab('designer')}
            onBookAppointment={() => setActiveTab('appointments')}
            featuredDesigns={dbState.designs}
            onSelectDesign={(design) => {
              handleCustomizeDesignFromCatalog(design);
            }}
          />
        )}

        {activeTab === 'designs' && (
          <DesignCollectionPage
            designs={dbState.designs}
            onCustomize={handleCustomizeDesignFromCatalog}
          />
        )}

        {activeTab === 'designer' && (
          <CustomDesignerPage
            fabrics={dbState.fabrics}
            onProceedToOrder={handleProceedToOrderFromDesigner}
          />
        )}

        {activeTab === 'measurements' && (
          <MeasurementsPage
            profiles={db.getMeasurementProfiles(currentCustomer?.id)}
            onSaveProfile={handleSaveMeasurementProfile}
            onDeleteProfile={handleDeleteMeasurementProfile}
            customerId={currentCustomer?.id || 'cust_1'}
            customerName={currentCustomer?.name || currentUser.name}
          />
        )}

        {activeTab === 'customer_dashboard' && (
          <CustomerDashboardPage
            currentUser={currentUser}
            customer={currentCustomer}
            orders={db.getOrders(currentCustomer?.id)}
            appointments={db.getAppointments(currentCustomer?.id)}
            measurementProfiles={db.getMeasurementProfiles(currentCustomer?.id)}
            recentDesigns={dbState.designs}
            onStartNewOrder={() => {
              setOrderModalCustomSpecs(null);
              setIsOrderModalOpen(true);
            }}
            onBookAppointment={() => setActiveTab('appointments')}
            onNavigateToMeasurements={() => setActiveTab('measurements')}
            onPayBalance={(orderId, amount) => handleRecordPayment(orderId, amount, 'UPI / GPay')}
            selectedOrderId={inspectedOrderId}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsPage
            currentUser={currentUser}
            appointments={dbState.appointments}
            onBookAppointment={handleBookAppointment}
            onUpdateStatus={handleUpdateAppointmentStatus}
          />
        )}

        {/* Admin Views */}
        {activeTab === 'admin_dashboard' && (
          <AdminDashboard
            orders={dbState.orders}
            customers={dbState.customers}
            fabrics={dbState.fabrics}
            appointments={dbState.appointments}
            payments={dbState.payments}
            tailors={dbState.tailors}
            designs={dbState.designs}
            onSelectOrder={(order) => {
              setActiveTab('admin_orders');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'admin_orders' && (
          <AdminOrdersManager
            orders={dbState.orders}
            tailors={dbState.tailors}
            onUpdateStatus={handleAdminUpdateOrderStatus}
            onAssignTailor={handleAdminAssignTailor}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {activeTab === 'admin_fabrics' && (
          <FabricInventoryManager
            fabrics={dbState.fabrics}
            onAddFabric={handleAddFabric}
            onUpdateFabric={handleUpdateFabric}
            onDeleteFabric={handleDeleteFabric}
          />
        )}

        {activeTab === 'admin_tailors' && (
          <TailorManager
            tailors={dbState.tailors}
            orders={dbState.orders}
            onAddTailor={handleAddTailor}
            onUpdateTailor={handleUpdateTailor}
            onAssignOrderToTailor={handleAdminAssignTailor}
          />
        )}

        {activeTab === 'admin_customers' && (
          <CustomerManager
            customers={dbState.customers}
            orders={dbState.orders}
            measurementProfiles={dbState.measurementProfiles}
            onSelectOrder={(order) => {
              setActiveTab('admin_orders');
            }}
          />
        )}
      </main>

      {/* 8-Step Order Creation Modal */}
      <OrderCreationModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        customerId={currentCustomer?.id || 'cust_1'}
        customerName={currentCustomer?.name || currentUser.name}
        customerPhone={currentCustomer?.phone || currentUser.phone}
        designs={dbState.designs}
        fabrics={dbState.fabrics}
        measurementProfiles={db.getMeasurementProfiles(currentCustomer?.id)}
        initialCustomSpecs={orderModalCustomSpecs}
        initialEstimatedPrice={orderModalPrice}
        initialDesignName={orderModalDesignName}
        onOrderCreated={handleOrderCreated}
        onCreateMeasurementProfile={() => {
          setIsOrderModalOpen(false);
          setActiveTab('measurements');
        }}
      />

      {/* In-app Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={currentNotifications}
        onMarkAsRead={(id) => {
          db.markNotificationAsRead(id);
          refreshState();
        }}
        onMarkAllAsRead={() => {
          db.markAllNotificationsAsRead(
            currentUser.role === 'customer' ? currentUser.id : undefined,
            currentUser.role
          );
          refreshState();
        }}
        onSelectOrder={(orderId) => {
          setInspectedOrderId(orderId);
          if (currentUser.role === 'customer') {
            setActiveTab('customer_dashboard');
          } else {
            setActiveTab('admin_orders');
          }
        }}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
