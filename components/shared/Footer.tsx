import React from "react";
import WrapperContainer from "./WrapperContainer";
import Link from "next/link";
import {
  Clock,
  Facebook,
  HeadphonesIcon,
  Linkedin,
  Shield,
  Twitter,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 text-gray-300 py-12 lg:py-16">
      <WrapperContainer>
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Image
              src={"/images/web-logo.png"}
              alt="logo"
              width={200}
              height={100}
              className="-ml-5"
            />
            <h3 className="mb-4 text-lg font-bold uppercase text-white">
              Stay Connected
            </h3>
            <div className="md-4 flex space-x-4">
              <Link href={"#"}>
                <Facebook className="w-6 h-6 text-white" />
              </Link>
              <Link href={"#"}>
                <Twitter className="w-6 h-6 text-white" />
              </Link>
              <Link href={"#"}>
                <Linkedin className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase text-white">
              about us
            </h3>
            <ul className="space-y-2 cursor-pointer">
              <li>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase text-white">
              Useful Link
            </h3>
            <ul className="space-y-2 cursor-pointer">
              <li>
                <Link href={"/how-it-works"}>How It Works</Link>
              </li>
              <li>
                <Link href={"/blogs"}>Blogs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold uppercase text-white">
              Policies
            </h3>
            <ul className="space-y-2 cursor-pointer">
              <li>
                <Link href={"/terms-of-users"}>Terms Of Users</Link>
              </li>
              <li>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
          {/* feature section */}
        </div>
        <section className="py-6 px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl p-6 shadow-xl">
              <div className="rounded-full p-3">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className=" font-bold text-white">Secure Payment</h3>
                <p className="text-sm text-gray-500">
                  100% Secure Payment Gateway
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl p-6 shadow-xl">
              <div className="rounded-full p-3">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className=" font-bold text-white">BookKart Trust</h3>
                <p className="text-sm text-gray-500">
                  Money Transferred safely after confirmation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl p-6 shadow-xl">
              <div className="rounded-full p-3">
                <HeadphonesIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className=" font-bold text-white">Customer Support</h3>
                <p className="text-sm text-gray-500">
                  24/7 hour customer support
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy;{new Date().getFullYear()} BookKart. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Image
            src={"/icons/visa.svg"}
            alt="visa"
            width={40}
            height={60}
            className="filter brightness-20 invert"
            />
            <Image
            src={"/icons/paytm.svg"}
            alt="paytm"
            width={40}
            height={60}
            className="filter brightness-20 invert"
            />
            <Image
            src={"/icons/upi.svg"}
            alt="upi"
            width={40}
            height={60}
            className="filter brightness-20 invert"
            />
            <Image
            src={"/icons/rupay.svg"}
            alt="rupay"
            width={40}
            height={60}
            className="filter brightness-20 invert"
            />
          </div>

        </section>
      </WrapperContainer>
    </footer>
  );
};

export default Footer;
