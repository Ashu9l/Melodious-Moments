﻿# Media Gallery App 🖼️

A modern, feature-rich media gallery application built with React, Supabase, and Framer Motion. Upload, view, and manage your media files with a beautiful, animated interface.

![{54D3A0BD-9E33-4CF2-BE13-D0FBAFE20BDF}](https://github.com/user-attachments/assets/48272f29-5a7c-4e00-9e6f-9cdd3a3475bd)


## ✨ Features

### 🔐 User Authentication
- Secure email and password authentication
- JWT-based session management
- Password hashing for enhanced security
- Intuitive registration and login flows

### 📁 Media Management
- Support for multiple file types:
  - 🖼️ Images (PNG, JPG, GIF)
  - 🎥 Videos (MP4, WebM)
  - 🎵 Audio (MP3, WAV)
- Drag-and-drop file uploads
- Interactive media previews
- Secure file storage with Supabase

### 🎨 Modern UI/UX
- Responsive design for all devices
- Smooth animations with Framer Motion
- Beautiful gradients and shadows
- Interactive hover effects
- Waveform visualization for audio files

## 🚀 Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend & Storage**: Supabase
- **Audio Visualization**: WaveSurfer.js
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast

## 🛠️ Setup & Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd media-gallery-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Application Structure

```
src/
├── components/
│   ├── Auth.tsx           # Authentication component
│   ├── MediaGallery.tsx   # Main gallery view
│   ├── MediaPreview.tsx   # Media preview modal
│   └── MediaUpload.tsx    # File upload component
├── lib/
│   └── supabase.ts        # Supabase client configuration
└── App.tsx                # Main application component
```

## 🎯 Features in Detail



- Secure registration with email and password
- Password strength requirements
- JWT token-based session management
- Automatic session persistence



- Drag-and-drop interface
- Progress indicators
- File type validation
- Instant preview after upload

### Media Preview
- Full-screen image preview
- Video player with controls
- Audio player with waveform visualization
- Smooth animations and transitions

## 🔒 Security Features

- Row Level Security (RLS) with Supabase
- Secure file storage
- Protected API endpoints
- Encrypted user credentials

## 🎨 UI/UX Features

- Responsive grid layout
- Smooth loading animations
- Interactive hover effects
- Toast notifications
- Modern glassmorphism design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@example.com or join our Slack channel.
