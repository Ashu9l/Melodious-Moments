import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video' | 'audio';
  onClose: () => void;
}

export function MediaPreview({ url, type, onClose }: MediaPreviewProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (type === 'audio' && waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#C7D2FE',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 100,
      });

      wavesurferRef.current.load(url);

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, [url, type]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full bg-white rounded-xl p-4"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mt-8">
            {type === 'image' && (
              <img
                src={url}
                alt="Preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
            {type === 'video' && (
              <video
                src={url}
                controls
                className="w-full max-h-[80vh] rounded-lg"
              />
            )}
            {type === 'audio' && (
              <div className="p-8">
                <div ref={waveformRef} className="w-full" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}