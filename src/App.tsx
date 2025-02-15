import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ImagePlus, LogOut } from 'lucide-react';
import { MediaUpload } from './components/MediaUpload';
import { MediaGallery } from './components/MediaGallery';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Auth />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <ImagePlus className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Sign Out</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <MediaUpload onUploadComplete={() => window.location.reload()} />
        </motion.div>

        <MediaGallery />
      </div>
    </div>
  );
}

export default App;