export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  company: {
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    department: string;
    name: string;
    title: string;
  };
  bloodGroup: string;
  height: number;
  weight: number;
  hair: {
    color: string;
    type: string;
  };
  eyeColor: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  ip: string;
  macAddress: string;
  university: string;
  ein: string;
  ssn: string;
  userAgent: string;
  role: string;
  crypto: {
    coin: string;
    network: string;
    wallet: string;
  };
}

export interface UsersApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
