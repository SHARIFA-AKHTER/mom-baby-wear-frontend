// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-10">
//       <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h3 className="text-lg font-semibold text-white">
//             Mom & Baby Wear
//           </h3>
//           <p className="text-sm mt-2">
//             Quality products for moms and babies. Trusted & loved.
//           </p>
//         </div>

//         <div>
//           <h4 className="font-semibold text-white mb-2">Quick Links</h4>
//           <ul className="space-y-2 text-sm">
//             <li>Products</li>
//             <li>Cart</li>
//             <li>Profile</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold text-white mb-2">Contact</h4>
//           <p className="text-sm">Email: support@mombabywear.com</p>
//           <p className="text-sm">Phone: +880 1234-567890</p>
//         </div>
//       </div>

//       <div className="text-center text-xs py-4 border-t border-gray-700">
//         © {new Date().getFullYear()} Mom & Baby Wear. All rights reserved.
//       </div>
//     </footer>
//   );
// }


import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="container mx-auto py-10 px-4 md:px-0 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-4">Mom & Baby Wear</h3>
          <p className="text-gray-600">
            Quality clothing, toys, and essentials for moms and babies. 
            Trusted and loved by parents everywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories/clothing" className="hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-blue-600">
                Offers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-2">
            Subscribe to get latest offers and updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Mom & Baby Wear. All rights reserved.
      </div>
    </footer>
  );
}
