import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border pb-8 pt-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex max-w-sm flex-col gap-4">
            <div className="flex items-center gap-3 text-foreground">
              <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <QrCode className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">NYDev Form Generator</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The smartest way to create forms and manage event entry with secure QR code technology. Trusted by thousands of organizers worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Product</h4>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/features">
                Features
              </Link>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/pricing">
                Pricing
              </Link>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/download">
                Download App
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Resources</h4>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/contact">
                Contact Us
              </Link>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/about">
                About
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground">Legal</h4>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="text-muted-foreground transition-colors hover:text-primary" to="/terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} NYDev. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="transition-colors hover:text-primary" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="transition-colors hover:text-primary" to="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
