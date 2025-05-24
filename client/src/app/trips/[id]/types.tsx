// Core interfaces matching your backend models

export interface TripImage {
  id?: number;
  url: string;
  caption?: string;
  isMain?: boolean;
  tripId?: number;
}

export interface UserProfile {
  id?: number;
  name: string;
  contactNumber1: string;
  contactNumber2?: string;
  email: string;
  areaOfWork: string;
  image?: string;
  userId: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Usually not sent to frontend
  role: "Agency" | "SimpleUser" | "Admin";
  profile?: UserProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface TripComment {
  id: number;
  description: string;
  rating: number;
  userId: number;
  tripId: number;
  User?: User;
  createdAt: string;
  updatedAt: string;
}

export interface TripInclusion {
  id: number;
  text: string;
  tripId: number;
}

export interface TripExclusion {
  id: number;
  text: string;
  tripId: number;
}

export interface TripCondition {
  id: number;
  text: string;
  tripId: number;
}

export interface TripPricing {
  id: number;
  label: string;
  price: number;
  tripId: number;
}

export interface TripReview {
  id: number;
  name: string;
  country?: string;
  date: string;
  comment: string;
  rating: number;
  tripId: number;
}

export interface TripDay {
  id: number;
  dayTitle: string;
  activities: string;
  dayOrder: number;
  tripId: number;
}

export interface Accommodation {
  id: number;
  name: string;
  stars?: number;
  nights: number;
  hasPool: boolean;
  includesBreakfast: boolean;
  description?: string;
  tripId: number;
}

export interface PickupPoint {
  id?: number;
  location: string;
  time: string;
  tripId: number;
}

export interface Wishlist {
  userId: number;
  tripId: number;
  createdAt: string;
}

// Main Trip interface with all relationships
export interface Trip {
  id: number;
  title: string;
  description: string;
  durationHours?: number;
  language?: string;
  meetingPoint?: string;
  cancellationPolicy?: string;
  rating: number;
  image: string; // main image
  thumbnail: string;
  price: number;
  date: string;
  views: number;
  userId: number;
  createdAt: string;
  updatedAt: string;

  // Relationships
  User?: User;
  images?: TripImage[];
  comments?: TripComment[];
  inclusions?: TripInclusion[];
  exclusions?: TripExclusion[];
  conditions?: TripCondition[];
  pricing?: TripPricing[];
  reviews?: TripReview[];
  days?: TripDay[];
  accommodations?: Accommodation[];
  pickupPoints?: PickupPoint[];
  wishlistedBy?: User[];
}

// Additional utility types for API responses
export interface TripListResponse {
  data: Trip[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface TripDetailResponse {
  data: Trip;
}

// For trip creation/update forms
export interface CreateTripData {
  title: string;
  description: string;
  durationHours?: number;
  language?: string;
  meetingPoint?: string;
  cancellationPolicy?: string;
  rating: number;
  image: string;
  thumbnail: string;
  price: number;
  date: string;
  userId: number;
}

export interface UpdateTripData extends Partial<CreateTripData> {
  id: number;
}

// For frontend components that might need partial data
export interface TripCardData {
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  thumbnail: string;
  price: number;
  date: string;
  views: number;
  User?: Pick<User, "id" | "username" | "profile">;
}

// Search and filter types
export interface TripFilters {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  language?: string;
  dateFrom?: string;
  dateTo?: string;
  userId?: number;
  search?: string;
}

export interface TripSearchParams extends TripFilters {
  page?: number;
  limit?: number;
  sortBy?: "price" | "rating" | "date" | "views";
  sortOrder?: "asc" | "desc";
}
