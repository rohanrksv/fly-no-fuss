import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Flight, Seat } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Check, Download, Mail, Plane } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const { flight, passengers, selectedSeats, totalPrice } = location.state as {
    flight: Flight;
    passengers: number;
    selectedSeats: Seat[];
    totalPrice: number;
  } || {};

  const handleConfirmBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsBooking(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBooking(false);
    setBookingComplete(true);
    
    toast({
      title: 'Booking Confirmed!',
      description: 'Your flight has been successfully booked. Confirmation email sent.',
    });
  };

  if (!flight) {
    navigate('/');
    return null;
  }

  if (bookingComplete) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-success-foreground" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-success">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Your flight has been successfully booked. You will receive a confirmation email shortly.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="font-mono text-lg font-bold">
                  Booking Reference: SKY{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download E-Ticket</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Confirmation</span>
                </Button>
              </div>
              
              <Button onClick={() => navigate('/')} className="btn-flight">
                Book Another Flight
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Confirm Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>Flight Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Airline</div>
                    <div className="text-muted-foreground">{flight.airline}</div>
                  </div>
                  <div>
                    <div className="font-medium">Flight Number</div>
                    <div className="text-muted-foreground">{flight.flightNumber}</div>
                  </div>
                  <div>
                    <div className="font-medium">Aircraft</div>
                    <div className="text-muted-foreground">{flight.aircraft}</div>
                  </div>
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-muted-foreground">{flight.duration}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="font-medium mb-2">Departure</div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">{flight.departure.time}</div>
                        <div>{flight.departure.date}</div>
                        <div className="text-muted-foreground">
                          {flight.departure.airport}, {flight.departure.city} ({flight.departure.code})
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Arrival</div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">{flight.arrival.time}</div>
                        <div>{flight.arrival.date}</div>
                        <div className="text-muted-foreground">
                          {flight.arrival.airport}, {flight.arrival.city} ({flight.arrival.code})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            <Card>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">Name</div>
                      <div className="text-muted-foreground">
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">{user?.email}</div>
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">{user?.phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="font-medium">Passengers</div>
                      <div className="text-muted-foreground">{passengers}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-2">Selected Seats</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seat) => (
                        <Badge key={seat.id} variant="outline" className="text-sm">
                          {seat.id} ({seat.type})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary & Booking */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Flight ({passengers}x ${flight.price})</span>
                    <span>${flight.price * passengers}</span>
                  </div>
                  
                  {selectedSeats.some(seat => seat.price) && (
                    <div className="flex justify-between">
                      <span>Seat Selection</span>
                      <span>
                        ${selectedSeats.reduce((total, seat) => total + (seat.price || 0), 0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & Fees</span>
                    <span>$0</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  className="w-full btn-flight"
                >
                  {isBooking ? 'Processing...' : 'Confirm & Pay'}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  By clicking "Confirm & Pay", you agree to our terms and conditions.
                  This is a demo booking - no actual payment will be processed.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;