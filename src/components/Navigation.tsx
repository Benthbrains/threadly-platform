'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiPlusCircle, 
  FiMessageCircle, 
  FiBook, 
  FiGlobe, 
  FiUserCheck,
  FiShoppingBag,
  FiAward
} from 'react-icons/fi';
import ThreadCoinDisplay from './ThreadCoinDisplay';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: FiHome },
    { href: '/communities', label: 'Communities', icon: FiUsers },
    { href: '/create-post', label: 'Create Post', icon: FiPlusCircle },
    { href: '/messages', label: 'Messages', icon: FiMessageCircle },
    { href: '/authors', label: 'Authors', icon: FiBook },
    { href: '/live-news', label: 'Live News', icon: FiGlobe },
    { href: '/politicians', label: 'Politicians', icon: FiUserCheck },
    { href: '/store', label: 'Store', icon: FiShoppingBag },
    { href: '/achievements', label: 'Achievements', icon: FiAward },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Threadly
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-lg ${
                    pathname === link.href
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-500 dark:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
            {/* ThreadCoin Display */}
            <div className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <ThreadCoinDisplay balance={0} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}