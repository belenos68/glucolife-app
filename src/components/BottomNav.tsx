import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ScanIcon,
  CompassIcon,
  ChatIcon,
  ProfileIcon
} from './icons/Icons';
import { useLanguage } from '../App';

const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, label: t('nav.dashboard') },
    { path: '/scanner', icon: ScanIcon, label: t('nav.scanner') },
    { path: '/share', icon: CompassIcon, label: t('nav.share') },
    { path: '/assistant', icon: ChatIcon, label: t('nav.assistant') },
    { path: '/profile', icon: ProfileIcon, label: t('nav.profile') },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white/95 dark:bg-gray-900/95
        backdrop-blur-md
        border-t border-gray-200 dark:border-gray-700
        shadow-[0_-4px_12px_rgba(0,0,0,0.08)]
      "
    >
      {/* Conteneur centré et compact */}
      <div className="mx-auto max-w-md px-4">
        <div className="flex justify-center items-center gap-4 h-16">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                flex flex-col items-center justify-center
                px-3 py-1 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? 'text-mint-green font-bold bg-mint-green/10'
                    : 'text-gray-600 dark:text-gray-400 font-semibold hover:text-mint-green'
                }
                `
              }
            >
              <Icon className="h-6 w-6 mb-0.5" />
              <span className="text-[11px] leading-none whitespace-nowrap">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
