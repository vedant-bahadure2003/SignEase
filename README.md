# SignEase 2.0 🤟

A modern, real-time sign language detection web application that translates American Sign Language (ASL) hand gestures into text and speech across multiple languages.

![SignEase Banner](https://img.shields.io/badge/SignEase-2.0-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.13-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Features

- **Real-time ASL Detection**: Instant recognition of American Sign Language gestures through webcam
- **Multi-language Support**: Translate sign language to 17+ languages including English, Spanish, French, German, Chinese, Japanese, Korean, Hindi, Arabic, and more
- **Text-to-Speech**: Convert recognized text to natural speech with customizable voice settings
- **Modern UI**: Clean, responsive interface built with React and TailwindCSS
- **Accessibility First**: Designed with accessibility in mind for better user experience
- **Performance Optimized**: Efficient processing with error handling and performance monitoring

## 🚀 Live Demo

[View Live Demo]() <!-- Replace with your actual demo link -->

## 📱 Screenshots

<!-- Add screenshots of your application here -->

_Camera Interface_
![Camera Interface](screenshots/camera-interface.png)

_Multi-language Output_
![Multi-language Support](screenshots/multi-language.png)

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1
- **Styling**: TailwindCSS 3.4.13
- **Icons**: FontAwesome
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Language**: JavaScript/JSX

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CameraSection.jsx
│   ├── ControlPanel.jsx
│   ├── Instructions.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── hooks/              # Custom React hooks
│   ├── useCamera.js
│   ├── useSignLanguagePrediction.js
│   ├── useSpeechSynthesis.js
│   └── usePerformanceMonitor.js
├── config/             # Configuration files
│   ├── constants.js
│   └── languages.js
├── utils/              # Utility functions
│   └── helpers.js
└── App.js             # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Modern web browser with camera support
- **Backend API** (Sign language recognition server)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vedant-bahadure2003/signease-2.0.git
   cd signease-2.0/myapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoint**

   Edit `src/config/constants.js` to point to your backend API:

   ```javascript
   export const API_CONFIG = {
     BASE_URL: "http://localhost:5000", // Update with your API URL
     ENDPOINTS: {
       PREDICT: "/predict",
     },
     PREDICTION_INTERVAL: 1000,
   };
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

## 🔧 Configuration

### Camera Settings

Modify camera configuration in `src/config/constants.js`:

```javascript
export const CAMERA_CONFIG = {
  VIDEO: {
    width: 640,
    height: 480,
  },
  CONSTRAINTS: {
    video: true,
  },
};
```

### Language Support

Add or modify supported languages in `src/config/languages.js`:

```javascript
export const languageNames = {
  en: "English",
  es: "Spanish",
  // Add more languages...
};
```

## 🎯 Usage

1. **Allow camera access** when prompted by your browser
2. **Position your hand** in front of the camera
3. **Make ASL gestures** - the app will recognize letters in real-time
4. **Select target language** from the dropdown
5. **Adjust speech settings** using the control panel
6. **Use the speak button** to hear the translated text

### Tips for Best Results

- 📹 **Camera Position**: Keep camera at eye level with hands centered
- 👐 **Hand Visibility**: Ensure hands are clearly visible with good contrast
- 💡 **Lighting**: Use bright, even lighting without shadows
- 🎯 **Background**: Use a simple, contrasting background
- ⏱️ **Timing**: Hold gestures steady for better recognition

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design
- Test across different browsers

## 🐛 Known Issues

- Camera initialization may take a few seconds on first load
- Some browsers may require HTTPS for camera access
- Performance may vary based on device capabilities

## 📝 API Requirements

This frontend requires a backend API that provides:

- `POST /predict` endpoint that accepts image data and returns predicted ASL letters
- Image processing capabilities for hand gesture recognition
- CORS configuration for frontend communication

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Note**: Camera and speech synthesis features require modern browser support.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vedant Bahadure**

- GitHub: [@vedant-bahadure2003](https://github.com/vedant-bahadure2003)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- American Sign Language community for inspiration
- React team for the excellent framework
- TailwindCSS for the utility-first CSS framework
- FontAwesome for the beautiful icons
- All contributors who helped make this project better

## 🔮 Future Enhancements

- [ ] Word prediction and autocomplete
- [ ] Support for sign language phrases
- [ ] Offline mode capability
- [ ] Mobile app version
- [ ] Integration with learning management systems
- [ ] Support for other sign languages (BSL, FSL, etc.)
- [ ] Real-time collaboration features
- [ ] Enhanced accuracy with machine learning improvements

---

<div align="center">
  <p>Made with ❤️ for the deaf and hard-of-hearing community</p>
  <p>
    <a href="#signease-20-">⬆️ Back to Top</a>
  </p>
</div>
