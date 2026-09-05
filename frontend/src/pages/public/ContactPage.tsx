import { MapPin, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { useState } from 'react';
import { contactService } from '../../services/contact.service';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return toast.error('Please fill in all fields');
    }
    
    setIsLoading(true);
    try {
      await contactService.submitForm(formData);
      toast.success("Message sent! We'll get back to you shortly.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicPageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
            Have a question about our platform, enterprise pricing, or need technical support? 
            Our team is here to help you succeed.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-8 animate-fade-in-up animation-delay-100">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground">nydevofficial@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Call Us</h3>
                    <p className="text-sm text-muted-foreground">+251705451415</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Visit Us</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      Arada Subcity, Addis Ababa
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-bold text-foreground">Enterprise Support</h3>
              <p className="text-sm text-muted-foreground">
                Current Enterprise customers have access to priority 24/7 technical support. 
                Please check your SLA agreement for your dedicated hotline.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-[2.5rem] border border-border bg-card p-2 shadow-2xl animate-fade-in-up animation-delay-200">
            <div className="rounded-[2rem] border border-border/50 bg-background/50 p-6 sm:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-card-foreground">Send us a message</h3>
                <p className="text-muted-foreground text-sm mt-1">Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John Doe"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="john@company.com"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="How can we help?"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Tell us about your project or inquiry..."
                    disabled={isLoading}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                </button>
              </form>
            </div>
          </div>
          </div>
      </div>
    </PublicPageLayout>
  );
};

export default ContactPage;
