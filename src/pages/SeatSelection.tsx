import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { generateSeats, Seat, Flight } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const { flight, passengers, searchParams } = location.state as {
    flight: Flight;
    passengers: number;
    searchParams: any;
  } || {};

  useEffect(() => {
    if (!flight) {
      navigate('/');
      return;
    }
    
    setSeats(generateSeats());
  }, [flight, navigate]);

  const handleSeatSelect = (seatId: string) => {
    if (!seats.find(s => s.id === seatId)?.isAvailable) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else if (prev.length < passengers) {
        return [...prev, seatId];
      } else {
        toast({
          title: 'Maximum seats selected',
          description: `You can only select ${passengers} seat(s) for your booking.`,
          variant: 'destructive'
        });
        return prev;
      }
    });
  };

  const getSeatPrice = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    return seat?.price || 0;
  };

  const getTotalSeatPrice = () => {
    return selectedSeats.reduce((total, seatId) => total + getSeatPrice(seatId), 0);
  };

  const getTotalPrice = () => {
    return (flight.price * passengers) + getTotalSeatPrice();
  };

  const handleContinueBooking = () => {
    if (selectedSeats.length !== passengers) {
      toast({
        title: 'Please select seats',
        description: `Please select ${passengers} seat(s) to continue.`,
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to login to complete your booking.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        flight,
        passengers,
        selectedSeats: selectedSeats.map(id => seats.find(s => s.id === id)).filter(Boolean),
        totalPrice: getTotalPrice(),
        searchParams
      }
    });
  };

  if (!flight) return null;

  const getSeatTypeColor = (type: string) => {
    switch (type) {
      case 'first': return 'bg-yellow-100 text-yellow-800';
      case 'business': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Flight Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Your Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Flight</div>
                <div className="text-muted-foreground">{flight.airline} {flight.flightNumber}</div>
              </div>
              <div>
                <div className="font-medium">Route</div>
                <div className="text-muted-foreground">
                  {flight.departure.code} → {flight.arrival.code}
                </div>
              </div>
              <div>
                <div className="font-medium">Passengers</div>
                <div className="text-muted-foreground">{passengers} passenger(s)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Aircraft Seating</CardTitle>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-success rounded" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted rounded" />
                    <span>Occupied</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* First Class */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getSeatTypeColor('first')}>First Class</Badge>
                    <span className="text-sm text-muted-foreground">Rows 1-3 (+$150)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-w-xs">
                    {seats.filter(s => s.type === 'first').map(seat => (
                      <Button
                        key={seat.id}
                        variant={selectedSeats.includes(seat.id) ? 'default' : seat.isAvailable ? 'outline' : 'secondary'}
                        size="sm"
                        className={`h-8 text-xs ${!seat.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={!seat.isAvailable}
                      >
                        {seat.id}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Business Class */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getSeatTypeColor('business')}>Business Class</Badge>
                    <span className="text-sm text-muted-foreground">Rows 4-8 (+$75)</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 max-w-md">
                    {seats.filter(s => s.type === 'business').map(seat => (
                      <Button
                        key={seat.id}
                        variant={selectedSeats.includes(seat.id) ? 'default' : seat.isAvailable ? 'outline' : 'secondary'}
                        size="sm"
                        className={`h-8 text-xs ${!seat.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={!seat.isAvailable}
                      >
                        {seat.id}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Economy Class */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getSeatTypeColor('economy')}>Economy Class</Badge>
                    <span className="text-sm text-muted-foreground">Rows 9-35</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 max-w-md max-h-96 overflow-y-auto">
                    {seats.filter(s => s.type === 'economy').map(seat => (
                      <Button
                        key={seat.id}
                        variant={selectedSeats.includes(seat.id) ? 'default' : seat.isAvailable ? 'outline' : 'secondary'}
                        size="sm"
                        className={`h-8 text-xs ${!seat.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={!seat.isAvailable}
                      >
                        {seat.id}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Flight ({passengers}x)</span>
                    <span>${flight.price * passengers}</span>
                  </div>
                  {getTotalSeatPrice() > 0 && (
                    <div className="flex justify-between">
                      <span>Seat Selection</span>
                      <span>${getTotalSeatPrice()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div>
                    <div className="font-medium mb-2">Selected Seats:</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedSeats.join(', ')}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleContinueBooking}
                  className="w-full btn-flight"
                  disabled={selectedSeats.length !== passengers}
                >
                  Continue to Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;