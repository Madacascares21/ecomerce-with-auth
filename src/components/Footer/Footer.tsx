import Link from "next/link";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Il</span>
              </div>
              <span className="font-semibold text-lg">Il-Traditionale</span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">DUMITRU ANDREI SERV SRL</p>
              <p>CUI: 39560550</p>
              <p>ONRC: J3/1315/29.06.2018</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-medium text-gray-800">Suport telefonic</p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>tel:+4073345490</span>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  Suport tehnic e-mail
                </p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>contact@il-traditionale.ro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Il-Traditionale Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Il-Traditionale</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Accesorii
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Atelier
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Barbati
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Femei
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Il Copii
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Marimi Mari
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Outlet
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Seturi
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Informații client</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Contul meu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Detalii cont
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Comenzile mele
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Adresele mele de livrare
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Retur produse
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Guarantees */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Garanții legale</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Termeni si conditii
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Politica de confidentialitate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  ANPC - SAL
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  ANPC
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              <p>Toate drepturile rezervate. © Il-Traditionale 2025.</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 text-sm">
                Metode de plată
              </h4>
              <div className="flex items-center space-x-2">
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                  Plătesc.ro
                </div>
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                  VISA Electron
                </div>
                <div className="bg-blue-800 text-white px-2 py-1 rounded text-xs">
                  VISA
                </div>
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  MasterCard
                </div>
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  Maestro
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 text-sm">
                Social media
              </h4>
              <div className="flex items-center space-x-2">
                <Link
                  href="#"
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
