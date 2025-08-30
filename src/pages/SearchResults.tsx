import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { mockFlights, Flight, airports } from '@/lib/mockData';
import { Plane, Clock, Users, ArrowRight } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departure = searchParams.get('departure');
  const passengers = searchParams.get('passengers') || '1';

  useEffect(() => {
    // Simulate API call
    const searchFlights = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter flights based on search criteria
      let filteredFlights = mockFlights.filter(flight => 
        flight.departure.code === from && flight.arrival.code === to
      );

      // If no exact matches, show some flights anyway for demo
      if (filteredFlights.length === 0) {
        filteredFlights = mockFlights.slice(0, 2);
      }

      setFlights(filteredFlights);
      setLoading(false);
    };

    searchFlights();
  }, [from, to, departure]);

  const getAirportName = (code: string) => {
    return airports.find(airport => airport.code === code)?.city || code;
  };

  const handleSelectFlight = (flight: Flight) => {
    navigate('/seat-selection', { 
      state: { 
        flight, 
        passengers: parseInt(passengers),
        searchParams: Object.fromEntries(searchParams.entries())
      } 
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-32 bg-muted/50" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Flight Results</h1>
          <div className="flex items-center text-muted-foreground space-x-4">
            <span>{getAirportName(from || '')} → {getAirportName(to || '')}</span>
            <span>•</span>
            <span>{departure}</span>
            <span>•</span>
            <span>{passengers} {parseInt(passengers) === 1 ? 'Passenger' : 'Passengers'}</span>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {flights.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
                <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No flights found for your search criteria.</p>
                <p>Please try different dates or destinations.</p>
              </div>
              <Button onClick={() => navigate('/')}>
                Search Again
              </Button>
            </Card>
          ) : (
            flights.map((flight) => (
              <Card key={flight.id} className="flight-card cursor-pointer" onClick={() => handleSelectFlight(flight)}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    {/* Airline & Flight Info */}
                    <div className="space-y-2">
                      <div className="font-semibold text-lg">{flight.airline}</div>
                      <div className="text-sm text-muted-foreground">{flight.flightNumber}</div>
                      <div className="text-sm text-muted-foreground">{flight.aircraft}</div>
                    </div>

                    {/* Flight Times & Route */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{flight.departure.time}</div>
                          <div className="text-lg font-medium">{flight.departure.code}</div>
                          <div className="text-sm text-muted-foreground">{flight.departure.city}</div>
                        </div>
                        
                        <div className="flex-1 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="h-px bg-border flex-1" />
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Plane className="w-4 h-4" />
                              <span className="text-sm">{flight.duration}</span>
                            </div>
                            <div className="h-px bg-border flex-1" />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold">{flight.arrival.time}</div>
                          <div className="text-lg font-medium">{flight.arrival.code}</div>
                          <div className="text-sm text-muted-foreground">{flight.arrival.city}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{flight.availableSeats} seats available</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="text-right space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          ${flight.price}
                        </div>
                        <div className="text-sm text-muted-foreground">per person</div>
                      </div>
                      
                      <Button className="btn-flight w-full lg:w-auto">
                        Select Flight
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Search for Different Flights
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchResults;