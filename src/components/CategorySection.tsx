import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategorySection = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated collections for every member of your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Women Category */}
          <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] hover:shadow-xl transition-all duration-300">
            <Link href="/women" className="absolute inset-0 z-10">
              <span className="sr-only">Shop Women's Collection</span>
            </Link>
            <Image
              src="/placeholder.svg?height=600&width=480"
              alt="Women's Fashion Collection"
              width={480}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Women</h3>
              <p className="text-white/90 mb-4">
                Elegant styles for every occasion
              </p>
              <div className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-full group-hover:bg-gray-100 transition-colors">
                Shop Now
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Men Category */}
          <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] hover:shadow-xl transition-all duration-300">
            <Link href="/men" className="absolute inset-0 z-10">
              <span className="sr-only">Shop Men's Collection</span>
            </Link>
            <Image
              src="/placeholder.svg?height=600&width=480"
              alt="Men's Fashion Collection"
              width={480}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Men</h3>
              <p className="text-white/90 mb-4">
                Modern styles for the contemporary man
              </p>
              <div className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-full group-hover:bg-gray-100 transition-colors">
                Shop Now
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Kids Category */}
          <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
            <Link href="/kids" className="absolute inset-0 z-10">
              <span className="sr-only">Shop Kids Collection</span>
            </Link>
            <Image
              src="/placeholder.svg?height=600&width=480"
              alt="Kids Fashion Collection"
              width={480}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Kids</h3>
              <p className="text-white/90 mb-4">
                Fun and comfortable styles for little ones
              </p>
              <div className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-full group-hover:bg-gray-100 transition-colors">
                Shop Now
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
