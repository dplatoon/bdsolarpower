import { Link } from "react-router-dom";
import { Sun, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/investors", label: "Investors" },
    { href: "/learn", label: "Learn" },
    { href: "/blog", label: "Blog" },
  ];

  const resourceLinks = [
    { href: "/ai-tools", label: "Solar Calculator" },
    { href: "/ai-tools", label: "Carbon Offset Tool" },
    { href: "/learn", label: "Net Metering Guide" },
    { href: "/learn", label: "Policy Documents" },
    { href: "/investors", label: "Tender Opportunities" },
    { href: "/blog", label: "Latest News" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/bdsolarpower", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/bdsolarpower", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/bdsolarpower", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@bdsolarpower", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-emerald-500" />
              <span className="font-bold text-xl text-white">BDSolarPower</span>
            </Link>
            <p className="text-sm text-gray-400">
              Bangladesh's leading solar energy platform. Empowering investors and accelerating renewable energy adoption across the nation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={link.label + index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Mymensingh, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <a
                  href="mailto:hello@bdsolarpower.com"
                  className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  hello@bdsolarpower.com
                </a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Phone support coming soon. Reach us via WhatsApp or email for now.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left flex items-center gap-1 flex-wrap">
            © {currentYear} BD Solar Power by{" "}
            <a
              href="https://startbd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
            >
              Start BD
            </a>
            . All rights reserved. সকল অধিকার সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/learn" className="hover:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/learn" className="hover:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
            <a
              href="/sitemap.xml"
              className="hover:text-emerald-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;