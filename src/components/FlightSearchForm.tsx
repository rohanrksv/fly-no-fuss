import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Search, ArrowRightLeft } from 'lucide-react';
import { airports } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

const FlightSearchForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState('roundtrip');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to || !departure) return;
    
    const params = new URLSearchParams({
      from,
      to,
      departure: departure.toISOString().split('T')[0],
      passengers,
      tripType
    });
    
    if (returnDate && tripType === 'roundtrip') {
      params.append('return', returnDate.toISOString().split('T')[0]);
    }
    
    navigate(`/search?${params.toString()}`);
  };

  const swapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto flight-card">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Trip Type Selector */}
          <div className="flex space-x-4">
            <Button
              variant={tripType === 'roundtrip' ? 'default' : 'outline'}
              onClick={() => setTripType('roundtrip')}
              size="sm"
            >
              Round Trip
            </Button>
            <Button
              variant={tripType === 'oneway' ? 'default' : 'outline'}
              onClick={() => setTripType('oneway')}
              size="sm"
            >
              One Way
            </Button>
          </div>

          {/* Main Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Departure city" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      <div>
                        <div className="font-medium">{airport.code}</div>
                        <div className="text-sm text-muted-foreground">{airport.city}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={swapAirports}
                className="rounded-full"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Destination city" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      <div>
                        <div className="font-medium">{airport.code}</div>
                        <div className="text-sm text-muted-foreground">{airport.city}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label>Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departure ? format(departure, 'MMM dd') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departure}
                    onSelect={setDeparture}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
              <div className="space-y-2">
                <Label>Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, 'MMM dd') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departure || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch} 
              disabled={!from || !to || !departure}
              className="btn-flight h-10"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;