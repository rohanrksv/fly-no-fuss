import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FlightSearchForm from '@/components/FlightSearchForm';
import heroImage from '@/assets/hero-flight.jpg';
import { Plane, Shield, Clock, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-sky/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Your Next
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book flights to destinations worldwide with the best prices and seamless experience
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-12 px-4 -mt-20 relative z-20">
        <div className="container mx-auto">
          <FlightSearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkyBooker?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of flight booking with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Plane className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-muted-foreground">
                Compare prices from multiple airlines to find the best deals
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky/20 transition-colors">
                <Shield className="w-8 h-8 text-sky" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-muted-foreground">
                Your personal and payment information is always protected
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                <Clock className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer service for all your travel needs
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
                <Globe className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-muted-foreground">
                Access flights to over 1000+ destinations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
