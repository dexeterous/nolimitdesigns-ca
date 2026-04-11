"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header id="header" className="fixed top-0 py-5 w-full z-50 bg-background transition-all duration-500">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/design-mode/logo(1).png"
              alt="logo"
              width={160}
              height={40}
              className="lg:max-w-[160px] max-w-[120px]"
            />
          </Link>
          <div className="text-3xl mt-1 cursor-pointer block lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="ri-menu-line"></i>
          </div>
          <nav
            className={`lg:bg-secondary bg-black-300 lg:rounded-[50px] lg:static absolute left-0 top-16 z-50 w-full ${isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"} lg:max-h-full lg:opacity-100 lg:visible lg:w-auto transition-all duration-500 ease-linear overflow-hidden`}
          >
            <ul className="flex lg:flex-row flex-col">
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/how-it-works"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  How It Works
                </Link>
              </li>
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/#services"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  Services
                </Link>
              </li>
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/portfolio"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  Portfolio
                </Link>
              </li>
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/#pricing"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  Pricing
                </Link>
              </li>
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/about"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  About
                </Link>
              </li>
              <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                <Link
                  href="/contact"
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
