
"use client";

import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 py-24"
      >
        <motion.header 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="border-b border-gray-100 dark:border-gray-800 pb-10 mb-12"
        >
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Last Updated: February 05, 2026
          </p>
        </motion.header>

        <div className="space-y-12 text-gray-600 dark:text-gray-300 leading-relaxed">
          <motion.section 
            whileHover={{ x: 5 }}
            className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
              Agreement to Terms
            </h2>
            <p>By accessing Mom & Baby Wear, you agree to these terms. If you disagree, please do not use our services.</p>
          </motion.section>

          <motion.section 
             whileHover={{ x: 5 }}
             className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
              Return Policy
            </h2>
            <p>Items must be returned within 7 days of delivery in original packaging. Refunds are processed within 5-7 business days.</p>
          </motion.section>

          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-10 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400 italic text-center"
          >
            By purchasing, you confirm you agree to all terms.
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}