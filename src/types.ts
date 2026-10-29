export type InquiryCategory =
  | 'Property Inquiry'
  | 'Luxury Villa'
  | 'Modern Family Home'
  | 'Residential Development'
  | 'New Home Construction'
  | 'Custom Home Project'
  | 'General Question'
  | 'Other';

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: InquiryCategory;
  propertyOrService: string;
  message: string;
  honeypot?: string;
}

export interface InquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: string;
  propertyOrService?: string;
  message: string;
  createdAt: string;
  deliveryStatus: 'delivered' | 'pending_email_config' | 'delivery_failed';
  deliveryNote: string;
}

export interface PropertyCategoryItem {
  id: string;
  title: string;
  categoryType: InquiryCategory;
  description: string;
  accent: string;
  imageTheme: 'villa' | 'family' | 'contemporary' | 'development' | 'construction' | 'custom';
}

export interface FeaturedProjectItem {
  id: string;
  title: string;
  inquiryCategory: InquiryCategory;
  subtitle: string;
  description: string;
  architecturalStyle: string;
  imageTheme: 'modern-villa' | 'family-residence' | 'elegant-home';
}

export interface ServiceItem {
  id: string;
  title: string;
  inquiryCategory: InquiryCategory;
  description: string;
  iconName: 'building' | 'hammer' | 'pen-tool' | 'messages-square';
}
