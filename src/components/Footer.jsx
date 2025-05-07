import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#141414] text-gray-400 py-8 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between border-t border-gray-700">
      {/* Logo and Tagline */}
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="text-red-600 text-2xl font-extrabold tracking-widest">
          NETFLIX
        </div>
        <span className="text-sm text-gray-500">
          Made with <span className="text-red-500">♥</span> by
          <span className="text-white font-medium "> Aniket</span>
        </span>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-6">
        <a
          href="https://www.linkedin.com/in/aniket-ruparelia99/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://github.com/Rupareliaaniket22"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <FaGithub size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
