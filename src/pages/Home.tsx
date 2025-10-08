import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import { CreditCard, Mic, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-street-market.jpg';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden rounded-3xl mx-6 mt-24 mb-16">
        <img
          src={heroImage}
          alt="Street market with colorful stalls"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to StreetVendor Pro
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Empowering street vendors with cutting-edge digital tools. Experience seamless UPI integration and advanced voice AI capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={CreditCard}
            title="UPI Integration"
            description="Streamline your payments with our seamless UPI integration, allowing you to focus more on your business."
          />
          <FeatureCard
            icon={Mic}
            title="Voice AI"
            description="Harness the power of voice AI to assist with your daily operations and enhance customer interaction."
          />
          <FeatureCard
            icon={BarChart3}
            title="Analytics"
            description="Gain insights into your sales and performance with our advanced analytics dashboard."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center">
          <Link to="/demo-sales">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-glow">
              Get Started
            </Button>
          </Link>
          <Link to="/demo-sales">
            <Button variant="outline" size="lg" className="ml-4 px-8 py-6 text-lg font-semibold rounded-full">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 StreetVendor Pro. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
