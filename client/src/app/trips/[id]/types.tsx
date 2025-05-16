export interface TripImage {
  url: string;
}

export interface UserProfile {
  contactNumber1?: string;
  areaOfWork?: string;
  contactNumber2?: string;
  name?: string;
  image?: string;
}

export interface User {
  username?: string;
  email?: string;
  profile?: UserProfile;
}

export interface TripComment {
  id: number;
  description: string;
  rating: number;
  createdAt: string;
  User?: User;
}

export interface Trip {
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  images: TripImage[];
  price: number;
  date: string;
  views: number;
  User?: User;
  comments: TripComment[];
}
