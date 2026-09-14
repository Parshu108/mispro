import React from "react";
import logo from "../image/Logo.png";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const SectionHeading = ({ children }) => (
  <div className="mb-5">
    <h4 className="text-[13px] font-bold text-[#EEEEEE] mb-2">{children}</h4>
    <span className="block w-6 h-[3px] rounded-full bg-[#00ADB5]" />
  </div>
);

const FooterLink = ({ to, href, children }) => {
  const className =
    "footer-link text-[13px] text-[#EEEEEE]/70 hover:text-[#EEEEEE] transition-colors";
  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 rounded-full border border-[#393E46] bg-[#2A313A] text-[#EEEEEE]/80 hover:bg-[#00ADB5] hover:text-[#222831] hover:border-[#00ADB5] flex items-center justify-center transition-colors duration-200"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer
      className="bg-[#222831] text-[#EEEEEE] pt-16 pb-8 border-t border-[#393E46]"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
        .footer-link { position: relative; display: inline-block; }
        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 0%;
          background: #00ADB5;
          transition: width 0.2s ease;
        }
        .footer-link:hover::after { width: 100%; }
      `}</style>

      {/* thin brand-accent rule at the very top, replacing the heavy solid border */}
      <div
        className="h-px w-full mb-16"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #00ADB5 50%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-10 pb-14">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-4 space-y-5 lg:pr-6">
            <img
              src={logo}
              alt="Mishu Mattress"
              className="h-12 object-contain"
            />

            <p className="text-[13px] text-[#EEEEEE]/70 leading-relaxed max-w-sm">
              Crafting supreme sleep comfort with high-resilience memory foam,
              orthopedic contouring, and advanced cooling technology.
            </p>

            <div className="space-y-3 text-[13px] text-[#EEEEEE]/70 pt-1">
              <p className="flex items-start gap-3">
                <CiLocationOn className="text-[#00ADB5] text-base shrink-0 mt-0.5" />
                <span>
                  Plot no- 911, Alang road, Opposite Pooja Weigh Bridge, Trapaj,
                  Bhavnagar, Gujarat 364150
                </span>
              </p>
              <p className="flex items-center gap-3">
                <MdOutlineMail className="text-[#00ADB5] text-base shrink-0" />
                <span>info@mishumattress.com</span>
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-[#00ADB5] text-base shrink-0" />
                <span>+91 63521 09065</span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="#" label="Facebook">
                <FaFacebookF
                  size={14}
                  className="text-[#EEEEEE] hover:text-[#00ADB5]"
                />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <FaInstagram size={14} className="text-[#EEEEEE] hover:text-[#00ADB5]" />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <FaLinkedinIn size={14} className="text-[#EEEEEE] hover:text-[#00ADB5]" />
              </SocialIcon>
            </div>
          </div>

          {/* Col 2: Customer Help */}
          <div className="lg:col-span-2 lg:border-l lg:border-[#393E46] lg:pl-8">
            <SectionHeading>Help &amp; Support</SectionHeading>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Returns &amp; Exchanges</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Shipping Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </li>
              <li>
                <FooterLink href="#">FAQ's</FooterLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Links */}
          <div className="lg:col-span-2 lg:border-l lg:border-[#393E46] lg:pl-8">
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="space-y-3">
              <li>
                <FooterLink to="/matter">Our Mattresses</FooterLink>
              </li>
              <li>
                <FooterLink to="/shop">Shop Collection</FooterLink>
              </li>
              <li>
                <FooterLink to="/showroom">Find Showroom</FooterLink>
              </li>
              <li>
                <FooterLink to="/blog">Sleep Blog</FooterLink>
              </li>
              <li>
                <FooterLink to="/wishlist">Wishlist</FooterLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 lg:border-l lg:border-[#393E46] lg:pl-8">
            <SectionHeading>Newsletter</SectionHeading>
            <p className="text-[13px] text-[#EEEEEE]/70 mb-4 leading-relaxed max-w-xs">
              Subscribe to receive exclusive mattress discounts &amp; sleep
              tips.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="flex items-stretch max-w-xs rounded-lg overflow-hidden border border-[#393E46] focus-within:border-[#00ADB5] transition-colors bg-[#2A313A]"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 px-3.5 py-2.5 bg-transparent text-[13px] text-[#EEEEEE] placeholder-[#EEEEEE]/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 px-4 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-bold text-[12px] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#393E46] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#EEEEEE]/50">
          <p>
            © {new Date().getFullYear()} Mishu Mattress. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="footer-link cursor-pointer hover:text-[#EEEEEE]">
              Terms
            </span>
            <span className="footer-link cursor-pointer hover:text-[#EEEEEE]">
              Privacy
            </span>
            <span className="footer-link cursor-pointer hover:text-[#EEEEEE]">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
