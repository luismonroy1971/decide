
export interface Project {
  id: string;
  name: string;
  location: string;
  price: string;
  description: string;
  longDescription: string;
  benefits: string[];
  gallery: string[];
  mainImage: string;
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  content: string;
}

export interface Payment {
  id: string;
  concept: string;
  dueDate: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Próximo';
}

export interface Document {
  id: string;
  name: string;
  url: string;
}

export interface User {
  email: string;
  role: 'admin' | 'client';
  profile: {
    name: string;
    dni?: string;
    phone?: string;
    project?: string;
    unit?: string;
  };
  payments?: Payment[];
  documents?: Document[];
}

export type View = 'home' | 'projectDetail' | 'blogDetail' | 'complaintsBook' | 'termsAndConditions' | 'privacyPolicy' | 'forgotPassword' | 'intranet';

export interface LegalContent {
    complaintsBook: { title: string; content: string; };
    termsAndConditions: { title: string; content: string; };
    privacyPolicy: { title: string; content: string; };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  project: string;
  registrationDate: string;
  status: 'Activo' | 'Inactivo';
}

export interface AdminNotification {
  id: string;
  type: 'Nuevo Mensaje' | 'Pago Recibido' | 'Nuevo Usuario';
  content: string;
  date: string;
  isRead: boolean;
}
