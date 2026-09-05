import { ShieldCheck, Target, Heart, Users } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <PublicPageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <div className="mb-20 text-center animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Empowering Event <span className="text-primary">Organizers</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-lg text-muted-foreground sm:text-xl">
            NYDev Form Generator was built with one simple goal: to make event registration and check-in seamless,
            secure, and professionally branded for organizers of all sizes.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mb-24 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm animate-fade-in-up animation-delay-100">
            <Target className="mb-6 h-10 w-10 text-primary" />
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              We strive to eliminate the friction in event management. By combining intelligent forms with instant QR
              verification, we're giving organizers their time back so they can focus on what matters most — creating
              unforgettable experiences for their attendees.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm animate-fade-in-up animation-delay-200">
            <ShieldCheck className="mb-6 h-10 w-10 text-primary" />
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Promise</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Security and reliability are at the core of everything we build. We promise to protect your attendees' data,
              ensure 99.9% uptime during your critical events, and provide a seamless check-in experience, even offline.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24 animate-fade-in-up animation-delay-300">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-foreground">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide our product and our team.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <Heart className="mb-4 h-8 w-8 text-red-500" />
              <h3 className="mb-2 text-xl font-bold">User-Centric</h3>
              <p className="text-sm text-muted-foreground">Every feature we build starts with organizer feedback and ends with a better attendee experience.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <ShieldCheck className="mb-4 h-8 w-8 text-green-500" />
              <h3 className="mb-2 text-xl font-bold">Security First</h3>
              <p className="text-sm text-muted-foreground">We handle sensitive data with the utmost care, utilizing end-to-end encryption and compliance standards.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 lg:col-span-1 sm:col-span-2">
              <Users className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="mb-2 text-xl font-bold">Community Driven</h3>
              <p className="text-sm text-muted-foreground">We believe in empowering the NYDev community to build better software, together.</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground animate-fade-in-up animation-delay-400 sm:px-12">
          <h2 className="mb-6 text-3xl font-black sm:text-4xl">Ready to simplify your events?</h2>
          <p className="mb-8 text-lg text-primary-foreground/90">Join thousands of organizers creating seamless experiences today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="rounded-lg bg-background px-8 py-3 font-bold text-primary transition-colors hover:bg-muted">
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default AboutPage;
