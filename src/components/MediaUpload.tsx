import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileAudio, FileImage, FileVideo } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export function MediaUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (error) throw error;
      
      toast.success('File uploaded successfully!');
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 1
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-white shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ scale: isDragActive ? 1.1 : 1 }}
          className="space-y-4"
        >
          <Upload className="mx-auto h-12 w-12 text-blue-500" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {isDragActive
                ? "Drop it like it's hot! 🔥"
                : "Drag 'n' drop your media here"}
            </p>
            <p className="text-sm text-gray-500">
              or click to select files
            </p>
          </div>

          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <FileImage className="mx-auto h-8 w-8 text-blue-400" />
              <p className="mt-2 text-sm text-gray-600">Images</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF</p>
            </div>
            <div className="text-center">
              <FileVideo className="mx-auto h-8 w-8 text-purple-400" />
              <p className="mt-2 text-sm text-gray-600">Videos</p>
              <p className="text-xs text-gray-400">MP4, WebM</p>
            </div>
            <div className="text-center">
              <FileAudio className="mx-auto h-8 w-8 text-green-400" />
              <p className="mt-2 text-sm text-gray-600">Audio</p>
              <p className="text-xs text-gray-400">MP3, WAV</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}