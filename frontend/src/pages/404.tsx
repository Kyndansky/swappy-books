import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <DefaultLayout>
      <div className="relative flex flex-col items-center justify-center min-h-[75vh] px-6 text-center overflow-hidden">
        {/* Sfondo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-primary/20 blur-[100px] rounded-full" 
        />
        
        {/* Numero 404: torna il bounce (backOut) scattante */}
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Float più veloce (da 3s a 2s)
            className="block text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-default-400 to-default-100 dark:from-default-200 dark:to-default-50/0 select-none"
          >
            404
          </motion.span>
        </motion.h1>

        {/* Contenuto */}
        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4 -mt-8 md:-mt-12 relative z-10"
        >
          <h2 className="text-4xl md:text-4xl font-bold">Lost in swaps?</h2>
          <p className="text-default-500 max-w-md mx-auto text-lg">
            The page you're looking for doesn't exist or has been moved to another galaxy.
          </p>

          <div className="flex items-center justify-center pt-6">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                as={Link} 
                to="/" 
                color="primary" 
                size="lg" 
                startContent={<Home size={20} />}
                className="font-semibold shadow-lg shadow-primary/20 h-14 px-8"
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DefaultLayout>
  );
}