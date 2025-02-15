import React, { useEffect, useState } from 'react';
import { Trash2, Play, Image as ImageIcon, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { MediaPreview } from './MediaPreview';

interface MediaItem {
  name: string;
  url: string;
  created_at: string;
  type: 'image' | 'video' | 'audio';
}

export function MediaGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const loadMedia = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('media')
        .list();

      if (error) throw error;

      const items = await Promise.all(
        files.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);

          const type = file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)
            ? 'image'
            : file.name.toLowerCase().match(/\.(mp4|webm)$/)
            ? 'video'
            : 'audio';

          return {
            name: file.name,
            url: publicUrl,
            created_at: file.created_at,
            type
          };
        })
      );

      setMediaItems(items);
    } catch (error) {
      console.error('Error loading media:', error);
      toast.error('Failed to load media');
    }
  };

  const deleteMedia = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([fileName]);

      if (error) throw error;

      setMediaItems(prev => prev.filter(item => item.name !== fileName));
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mediaItems.map((item) => (
          <motion.div
            key={item.name}
            variants={item}
            className="relative group bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="aspect-w-16 aspect-h-9">
              {item.type === 'image' && (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                />
              )}
              {item.type === 'video' && (
                <div
                  className="relative w-full h-48 bg-gray-900 cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <video
                    src={item.url}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              )}
              {item.type === 'audio' && (
                <div
                  className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <Music className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 truncate">{item.name}</p>
            </div>

            <button
              onClick={() => deleteMedia(item.name)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {selectedMedia && (
        <MediaPreview
          url={selectedMedia.url}
          type={selectedMedia.type}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
}