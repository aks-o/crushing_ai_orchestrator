import type { 
  Doctor, 
  Service, 
  Testimonial, 
  GalleryImage, 
  Timing, 
  HospitalInfo,
  NavLink 
} from '../types';

export const hospitalInfo: HospitalInfo = {
  name: 'Vatsalya Child & Dental Specialty Hospital',
  nameHindi: 'वात्सल्य शिशु एवं दंत रोग विशेषज्ञ चिकित्सालय',
  tagline: 'Nurturing Health, One Smile at a Time',
  address: 'Vaidyanatham Station Road, Castors Town, Deoghar, Jharkhand - 814112',
  phone: '+91 82921 14160',
  whatsapp: '918292114160',
  email: 'contact@vatsalyahospital.com',
  timings: [
    { day: 'Monday', dayHindi: 'सोमवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Tuesday', dayHindi: 'मंगलवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Wednesday', dayHindi: 'बुधवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Thursday', dayHindi: 'गुरुवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Friday', dayHindi: 'शुक्रवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Saturday', dayHindi: 'शनिवार', morning: '10:00 AM - 2:00 PM', evening: '5:00 PM - 8:00 PM', isOpen: true },
    { day: 'Sunday', dayHindi: 'रविवार', morning: 'By Appointment', evening: 'By Appointment', isOpen: false },
  ],
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'Timings', href: '#timings' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Prateek Priya',
    nameHindi: 'डॉ. प्रतीक प्रिया',
    qualifications: 'MBBS, MD (Pediatrics)',
    specialty: 'Child Specialist / Pediatrician',
    specialtyHindi: 'शिशु रोग विशेषज्ञ',
    experience: '10+ Years',
    image: '/images/doctor-1.jpg',
    registration: '49696 (BCMR)',
    formerResident: 'Patna Medical College & Hospital, Mediversal Matru Patna',
  },
  {
    id: '2',
    name: 'Dr. Smriti Shrivastav',
    nameHindi: 'डॉ. स्मृति श्रीवास्तव',
    qualifications: 'BDS, MDS',
    specialty: 'General & Pediatric Dentist',
    specialtyHindi: 'सामान्य एवं बाल दंत रोग विशेषज्ञ',
    experience: '8+ Years',
    image: '/images/doctor-2.jpg',
    registration: '8638/A',
    affiliation: 'Buddha Dental College & Hospital, Patna',
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Pediatric Consultation',
    titleHindi: 'बाल रोग परामर्श',
    description: 'Comprehensive child health checkups, growth monitoring, and treatment for all pediatric conditions including fever, infections, and developmental issues.',
    icon: 'Baby',
    category: 'pediatric',
  },
  {
    id: '2',
    title: 'General Dentistry',
    titleHindi: 'सामान्य दंत चिकित्सा',
    description: 'Complete dental care including routine checkups, cleanings, fillings, extractions, and treatment for all common dental problems.',
    icon: 'Stethoscope',
    category: 'dental',
  },
  {
    id: '3',
    title: 'Pediatric Dentistry',
    titleHindi: 'बाल दंत चिकित्सा',
    description: 'Specialized dental care for children including fluoride treatments, sealants, cavity prevention, and child-friendly dental procedures.',
    icon: 'Smile',
    category: 'dental',
  },
  {
    id: '4',
    title: 'Dental Procedures',
    titleHindi: 'दंत प्रक्रियाएं',
    description: 'Advanced dental treatments including scaling, root canal treatment, fillings, extractions, crowns, bridges, and cosmetic procedures.',
    icon: 'Syringe',
    category: 'dental',
  },
  {
    id: '5',
    title: 'Vaccination',
    titleHindi: 'टीकाकरण',
    description: 'Complete immunization services for children including all mandatory and optional vaccines as per the national immunization schedule.',
    icon: 'Shield',
    category: 'pediatric',
  },
  {
    id: '6',
    title: 'Emergency Care',
    titleHindi: 'आपातकालीन देखभाल',
    description: '24/7 emergency dental and pediatric care for urgent medical needs including accidents, severe pain, and acute illnesses.',
    icon: 'Siren',
    category: 'general',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Mother of 2 children',
    content: 'Dr. Prateek is amazing with kids. My children actually look forward to their checkups! The clinic is child-friendly and the staff is very caring.',
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '2',
    name: 'Ravi Kumar',
    role: 'Patient',
    content: 'Got my root canal treatment done by Dr. Smriti. The procedure was painless and the results are excellent. Highly recommended for dental care!',
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '3',
    name: 'Anita Devi',
    role: 'Grandmother',
    content: 'The best pediatric care in Deoghar. Doctors are experienced and very patient with children. The vaccination services are well-organized.',
    rating: 5,
    image: '/images/testimonial-3.jpg',
  },
  {
    id: '4',
    name: 'Mohammad Ali',
    role: 'Father',
    content: 'Excellent dental facilities. Got my daughter\'s braces consultation here. Very professional and hygienic environment.',
    rating: 5,
    image: '/images/testimonial-4.jpg',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/images/gallery/exterior.jpg', alt: 'Hospital Exterior', category: 'exterior' },
  { id: '2', src: '/images/gallery/reception.jpg', alt: 'Reception Area', category: 'interior' },
  { id: '3', src: '/images/gallery/waiting.jpg', alt: 'Waiting Area', category: 'interior' },
  { id: '4', src: '/images/gallery/consultation.jpg', alt: 'Consultation Room', category: 'interior' },
  { id: '5', src: '/images/gallery/dental-chair.jpg', alt: 'Dental Chair', category: 'equipment' },
  { id: '6', src: '/images/gallery/dental-clinic.jpg', alt: 'Dental Clinic', category: 'interior' },
  { id: '7', src: '/images/gallery/pediatric-room.jpg', alt: 'Pediatric Room', category: 'interior' },
  { id: '8', src: '/images/gallery/staff.jpg', alt: 'Our Team', category: 'team' },
];
