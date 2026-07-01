import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { doctors, hospitalInfo } from '../../data/hospitalData';

const AppointmentModal = () => {
  const { isAppointmentModalOpen, setAppointmentModalOpen } = useStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    phone: '',
    email: '',
    doctor: '',
    date: '',
    time: '',
    problem: '',
    isNewPatient: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'radio' ? value === 'true' : value,
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Close modal after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        patientName: '',
        patientAge: '',
        patientGender: '',
        phone: '',
        email: '',
        doctor: '',
        date: '',
        time: '',
        problem: '',
        isNewPatient: true,
      });
      setAppointmentModalOpen(false);
    }, 3000);
  };

  const closeModal = () => {
    setAppointmentModalOpen(false);
    setStep(1);
    setIsSubmitted(false);
  };

  // Generate available time slots
  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM',
  ];

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isAppointmentModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Book Appointment</h2>
                  <p className="text-white/80 text-sm">Schedule your visit with us</p>
                </div>
              </div>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-foreground-light text-center max-w-sm">
                  Your appointment request has been received. We'll contact you shortly to confirm your booking.
                </p>
              </div>
            ) : (
              <>
                {/* Progress Steps */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between max-w-xs mx-auto">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                            s === step
                              ? 'bg-primary text-white'
                              : s < step
                              ? 'bg-accent text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                        </div>
                        {s < 3 && (
                          <div
                            className={`w-12 h-0.5 mx-1 ${
                              s < step ? 'bg-accent' : 'bg-gray-100'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6 max-h-[50vh] overflow-y-auto">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground mb-4">Patient Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="patientName"
                              value={formData.patientName}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Age *
                          </label>
                          <input
                            type="number"
                            name="patientAge"
                            value={formData.patientAge}
                            onChange={handleChange}
                            required
                            min="0"
                            max="120"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            placeholder="25"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Gender *
                        </label>
                        <div className="flex gap-4">
                          {['Male', 'Female', 'Other'].map((gender) => (
                            <label key={gender} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="patientGender"
                                value={gender.toLowerCase()}
                                checked={formData.patientGender === gender.toLowerCase()}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                              />
                              <span className="text-sm text-foreground">{gender}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Patient Type
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="isNewPatient"
                              value="true"
                              checked={formData.isNewPatient === true}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            />
                            <span className="text-sm text-foreground">New Patient</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="isNewPatient"
                              value="false"
                              checked={formData.isNewPatient === false}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            />
                            <span className="text-sm text-foreground">Existing Patient</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground mb-4">Appointment Details</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Select Doctor *
                        </label>
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                        >
                          <option value="">Choose a doctor</option>
                          {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                              min={today}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Preferred Time *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white appearance-none"
                            >
                              <option value="">Select time</option>
                              {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Problem Description
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <textarea
                            name="problem"
                            value={formData.problem}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                            placeholder="Briefly describe your symptoms or reason for visit..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground mb-4">Review Your Details</h3>
                      
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Patient Name</p>
                            <p className="text-sm font-medium text-foreground">{formData.patientName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Age / Gender</p>
                            <p className="text-sm font-medium text-foreground">
                              {formData.patientAge} / {formData.patientGender}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-foreground">{formData.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-foreground">{formData.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Doctor</p>
                              <p className="text-sm font-medium text-foreground">
                                {doctors.find(d => d.id === formData.doctor)?.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Date & Time</p>
                              <p className="text-sm font-medium text-foreground">
                                {formData.date} at {formData.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-6 py-2.5 border border-gray-200 text-foreground rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
