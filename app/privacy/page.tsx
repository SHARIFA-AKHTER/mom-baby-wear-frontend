
"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 py-24"
      >
        <motion.header variants={itemVariants} className="border-b border-gray-100 dark:border-gray-800 pb-10 mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Effective Date: February 05, 2026
          </p>
        </motion.header>

        <div className="space-y-12 text-gray-600 dark:text-gray-300 leading-relaxed">
          {[
            {
              title: "Introduction",
              content: "At Mom & Baby Wear, we are committed to protecting your personal information. This policy explains how we collect and use your data when you shop with us."
            },
            {
              title: "Information We Collect",
              content: "We collect necessary data such as your name, shipping address, and email to process orders and improve your shopping experience."
            },
            {
              title: "Data Security",
              content: "Your data is protected with SSL encryption and secure payment gateways. We never store your full credit card information."
            }
          ].map((section, index) => (
            <motion.section key={index} variants={itemVariants}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
                {section.title}
              </h2>
              <p>{section.content}</p>
            </motion.section>
          ))}

          <motion.footer variants={itemVariants} className="pt-10 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400 italic text-center">
            Questions? Contact us at sr0589071@gmail.com
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}