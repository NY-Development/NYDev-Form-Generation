import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-[#f0f2f4] dark:border-[#2a3441] pt-12 pb-8 bg-background-light dark:bg-background-dark transition-colors duration-300 px-6">
    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex items-center gap-3 text-[#111318] dark:text-white">
          <div className="size-6 flex items-center justify-center bg-primary rounded text-white">
            <span className="material-symbols-outlined !text-[16px]">qr_code_scanner</span>
          </div>
          <h3 className="text-lg font-bold">NYDev Form Generator</h3>
        </div>
        <p className="text-[#616f89] dark:text-slate-400 text-sm">
          The smartest way to create forms and manage event entry with secure QR code technology.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#111318] dark:text-white">Product</h4>
          <a className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" href="#features">Features</a>
          <a className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" href="#pricing">Pricing</a>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/org/integrations">Integrations</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#111318] dark:text-white">Resources</h4>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/docs">Documentation</Link>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/blog">Blog</Link>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/community">Community</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[#111318] dark:text-white">Company</h4>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/about">About</Link>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/contact">Contact</Link>
          <Link className="text-[#616f89] dark:text-slate-400 hover:text-primary transition-colors" to="/legal">Legal</Link>
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9aa2b1] dark:text-slate-500 pt-8 border-t border-[#f0f2f4] dark:border-[#2a3441]">
      <p>&copy; 2026 NYDev. All rights reserved.</p>
      <div className="flex gap-4">
        <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
        <Link className="hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default Footer;