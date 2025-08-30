export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  aircraft: string;
  availableSeats: number;
}

export interface Seat {
  id: string;
  row: number;
  column: string;
  type: 'economy' | 'business' | 'first';
  isAvailable: boolean;
  price?: number;
}

export const mockFlights: Flight[] = [
  {
    id: 'FL001',
    airline: 'SkyWings Airlines',
    flightNumber: 'SW 501',
    departure: {
      airport: 'John F. Kennedy International',
      city: 'New York',
      code: 'JFK',
      time: '08:30',
      date: '2024-09-15'
    },
    arrival: {
      airport: 'Los Angeles International',
      city: 'Los Angeles',
      code: 'LAX',
      time: '11:45',
      date: '2024-09-15'
    },
    duration: '6h 15m',
    price: 299,
    aircraft: 'Boeing 737-800',
    availableSeats: 45
  },
  {
    id: 'FL002',
    airline: 'AeroJet',
    flightNumber: 'AJ 203',
    departure: {
      airport: 'John F. Kennedy International',
      city: 'New York',
      code: 'JFK',
      time: '14:20',
      date: '2024-09-15'
    },
    arrival: {
      airport: 'Los Angeles International',
      city: 'Los Angeles',
      code: 'LAX',
      time: '17:35',
      date: '2024-09-15'
    },
    duration: '6h 15m',
    price: 350,
    aircraft: 'Airbus A320',
    availableSeats: 23
  },
  {
    id: 'FL003',
    airline: 'CloudLine Airways',
    flightNumber: 'CL 105',
    departure: {
      airport: 'Los Angeles International',
      city: 'Los Angeles',
      code: 'LAX',
      time: '09:15',
      date: '2024-09-16'
    },
    arrival: {
      airport: 'John F. Kennedy International',
      city: 'New York',
      code: 'JFK',
      time: '17:30',
      date: '2024-09-16'
    },
    duration: '5h 15m',
    price: 275,
    aircraft: 'Boeing 787',
    availableSeats: 67
  }
];

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  
  // First class (rows 1-3)
  for (let row = 1; row <= 3; row++) {
    ['A', 'B', 'C', 'D'].forEach(column => {
      seats.push({
        id: `${row}${column}`,
        row,
        column,
        type: 'first',
        isAvailable: Math.random() > 0.3,
        price: 150
      });
    });
  }
  
  // Business class (rows 4-8)
  for (let row = 4; row <= 8; row++) {
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(column => {
      seats.push({
        id: `${row}${column}`,
        row,
        column,
        type: 'business',
        isAvailable: Math.random() > 0.4,
        price: 75
      });
    });
  }
  
  // Economy class (rows 9-35)
  for (let row = 9; row <= 35; row++) {
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(column => {
      seats.push({
        id: `${row}${column}`,
        row,
        column,
        type: 'economy',
        isAvailable: Math.random() > 0.2
      });
    });
  }
  
  return seats;
};

export const airports = [
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago' },
  { code: 'MIA', name: 'Miami International', city: 'Miami' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco' },
  { code: 'DEN', name: 'Denver International', city: 'Denver' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle' },
  { code: 'LAS', name: 'McCarran International', city: 'Las Vegas' }
];