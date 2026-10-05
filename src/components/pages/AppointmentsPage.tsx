import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Plus,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import {
  Appointment,
  AppointmentType,
  APPOINTMENT_TYPE_LABELS,
  User as UserType,
} from '../../types';
import { db } from '../../services/db';

interface AppointmentsPageProps {
  currentUser: UserType;
  appointments: Appointment[];
  onBookAppointment: (data: Omit<Appointment, 'id' | 'appointmentNumber' | 'status'>) => void;
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  currentUser,
  appointments,
  onBookAppointment,
  onUpdateStatus,
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Booking Form State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(minDate);
  const [timeSlot, setTimeSlot] = useState<string>('11:30 AM - 12:30 PM');
  const [type, setType] = useState<AppointmentType>('measurement');
  const [notes, setNotes] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>(currentUser.name);
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser.phone);
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser.email);

  const availableSlots = db.getAvailableTimeSlots(date);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    try {
      const cust = db.getCustomerByUserId(currentUser.id) || db.getCustomers()[0];
      onBookAppointment({
        customerId: cust ? cust.id : 'cust_guest',
        customerName,
        customerPhone,
        customerEmail,
        type,
        date,
        timeSlot,
        notes,
      });
      setShowBookingModal(false);
      setNotes('');
    } catch (err: any) {
      setBookingError(err.message || 'Unable to book slot. It might be already taken.');
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (currentUser.role === 'customer') {
      const cust = db.getCustomerByUserId(currentUser.id);
      if (cust && apt.customerId !== cust.id && apt.customerPhone !== currentUser.phone) {
        return false;
      }
    }
    if (filterType !== 'all' && apt.type !== filterType) return false;
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Atelier Reservations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
            Appointments & Consultations
          </h1>
          <p className="text-sm text-[#554C41] mt-2 max-w-2xl">
            Book private time with our master tailors for comprehensive body measurement, bridal design consultations, fitting trials, or completed garment pickups.
          </p>
        </div>

        <button
          onClick={() => {
            setBookingError(null);
            setShowBookingModal(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book Atelier Appointment</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-3 bg-white rounded-2xl border border-[#DFD6C7]">
        <div className="flex items-center gap-2 text-xs text-[#7C7164]">
          <span className="font-medium">Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
          >
            <option value="all">All Consultation Types</option>
            <option value="measurement">Measurement Appointment</option>
            <option value="design_consultation">Design Consultation</option>
            <option value="trial">Trial & Fitting</option>
            <option value="pickup">Outfit Pickup</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#7C7164]">
          <span className="font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled / Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <span className="text-xs text-[#7C7164] ml-auto">
          Showing {filteredAppointments.length} appointments
        </span>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-20 bg-white/70 rounded-2xl border border-[#E5DDD0]">
          <CalendarIcon className="w-12 h-12 mx-auto text-[#B7AA99] mb-3" />
          <p className="font-serif text-lg text-[#1A1716]">No Appointments Found</p>
          <p className="text-xs text-[#706659] mt-1">Reserve a slot to meet our master tailors.</p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-[#6B1D2F] text-white text-xs font-medium"
          >
            Book Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DFD6C7] flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#6B1D2F] block">
                      {apt.appointmentNumber}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#1A1716] mt-0.5">
                      {APPOINTMENT_TYPE_LABELS[apt.type] || apt.type}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                      apt.status === 'scheduled'
                        ? 'bg-[#EFF8F2] text-[#2E6B4A] border border-[#CDE5D5]'
                        : apt.status === 'completed'
                        ? 'bg-[#F0EFEB] text-[#6E6457] border border-[#DCD6CA]'
                        : 'bg-[#FBEBEB] text-[#8B2626] border border-[#E9C3C3]'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#52493F]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#6B1D2F]" />
                    <span className="font-semibold text-[#1A1716]">{apt.date}</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5 text-[#6B1D2F]" />
                    <span>{apt.timeSlot}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#7C7164]" />
                    <span>{apt.customerName}</span>
                    <span className="text-[#8C8275]">({apt.customerPhone})</span>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-[#6B6154] italic bg-[#F3ECE1] p-2 rounded-lg mt-2 border border-[#E5DACB]">
                      “{apt.notes}”
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#EAE3D7] flex items-center justify-between">
                <span className="text-[11px] text-[#7C7164]">
                  Indiranagar Atelier #4
                </span>

                {apt.status === 'scheduled' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(apt.id, 'completed')}
                      className="px-2.5 py-1 rounded-lg bg-[#2E6B4A] text-white text-[11px] font-semibold hover:bg-[#235339]"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => onUpdateStatus(apt.id, 'cancelled')}
                      className="px-2.5 py-1 rounded-lg border border-[#DDD3C4] text-[#8A3030] text-[11px] hover:bg-[#FBEBEB]"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-lg w-full shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#6B1D2F]" />
                <h3 className="font-serif font-bold text-xl text-[#1A1716]">Book Atelier Appointment</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-1 rounded-lg text-[#7C7164] hover:text-[#1A1716] hover:bg-[#EFE9DF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingError && (
              <div className="my-4 p-3 rounded-xl bg-[#FBEBEB] border border-[#E9C3C3] text-xs text-[#8B2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Consultation Purpose
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AppointmentType)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium text-[#1A1716]"
                >
                  <option value="measurement">Measurement Appointment (Body Fitting)</option>
                  <option value="design_consultation">Bridal & Design Consultation</option>
                  <option value="trial">Trial & Alteration Fitting</option>
                  <option value="pickup">Completed Outfit Pickup</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                    Available Time Slot
                  </label>
                  {availableSlots.length === 0 ? (
                    <p className="text-xs text-[#8A3030] py-2">All slots booked for this date</p>
                  ) : (
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs font-medium"
                    >
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A1716] block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A1716] block mb-1">
                  Specific Requests / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Bringing heavy silk saree for blouse measurement, bringing wedding heels..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD3C4] text-xs"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#D5CABE] text-xs text-[#4A4237]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={availableSlots.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] disabled:opacity-50"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
