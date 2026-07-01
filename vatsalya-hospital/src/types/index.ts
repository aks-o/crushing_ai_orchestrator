export interface Doctor {
  id: string;
  name: string;
  nameHindi: string;
  qualifications: string;
  specialty: string;
  specialtyHindi: string;
  experience: string;
  image: string;
  registration: string;
  formerResident?: string;
  affiliation?: string;
}

export interface Service {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  icon: string;
  category: 'pediatric' | 'dental' | 'general';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Timing {
  day: string;
  dayHindi: string;
  morning: string;
  evening: string;
  isOpen: boolean;
}

export interface AppointmentFormData {
  patientName: string;
  patientAge: string;
  phone: string;
  email?: string;
  doctor: string;
  date: string;
  time: string;
  problem: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HospitalInfo {
  name: string;
  nameHindi: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email?: string;
  timings: Timing[];
}
