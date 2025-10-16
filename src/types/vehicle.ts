export interface Vehicle {
  id: number;
  vehicle_id: string;
  car_brand: string;
  car_model: string;
  year: string;
  current_price: string | number;
  original_price: string | number | null;
  description: string;
  fuel_type: string;
  transmission: string;
  contact_info: string;
  contact_name: string;
  phone_number: string;
  main_image: string;
  images: Array<{
    id: number;
    image_url: string;
    image_order: number;
  }>;
  created_at: string;
}