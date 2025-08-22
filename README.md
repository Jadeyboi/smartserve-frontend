# SmartServe Frontend

A modern React application built with Vite, featuring a beautiful login page design with Tailwind CSS and Lucide React icons.

## Features

- 🚀 **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with modern features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔍 **Lucide React** - Beautiful and consistent icons
- 📱 **Responsive Design** - Works on all device sizes
- 🎯 **Modern UI/UX** - Clean and intuitive interface

## Design

The application features a SmartServe login page with:

- Clean, modern header with logo and login button
- Centered login form with email and password fields
- Password visibility toggle
- Right-side illustration with abstract shapes and character
- Custom color scheme matching the SmartServe brand

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd smartserve-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
smartserve-frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind CSS and custom styles
│   └── main.jsx         # Application entry point
├── assets/              # Images and static assets
├── public/              # Public assets
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies
```

## Customization

### Colors

The application uses a custom color palette defined in `tailwind.config.js`:

- `smartserve-red`: #FF4757 (Primary brand color)
- `smartserve-pink`: #FF6B7A (Accent color)
- `smartserve-yellow`: #FFD93D (Secondary button color)
- `smartserve-gray`: #6C757D (Text and borders)
- `smartserve-dark`: #343A40 (Dark text)

### Icons

Icons are provided by Lucide React. You can browse available icons at [lucide.dev](https://lucide.dev) and import them as needed.

## Assets

The `assets/` folder is ready for you to upload:

- Company logos
- Background images
- Illustrations
- Any other visual assets

## Technologies Used

- **Vite** - Build tool and dev server
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support or questions, please open an issue in the repository.
