# Rotating Earth Website

A modern, interactive website for Organoterra - an applied research and technology lab focused on sustainable innovation.

## 🌍 Features

- **Interactive 3D Earth Animation** - Powered by Three.js
- **Responsive Design** - Works on all devices
- **Modern UI** - Dark theme with elegant typography
- **Professional Pages** - Home, Terms & Conditions, Privacy Policy
- **Team Section** - Showcase team members with LinkedIn integration

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript** - Three.js for 3D animations
- **Web Fonts** - WOFF2 format for optimal performance

## 📁 Project Structure

```
rotating-earth-website/
├── index.html          # Home page
├── terms.html          # Terms & Conditions
├── privacy.html        # Privacy Policy
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── earth.js        # Original Earth animation
│   └── earth_2.js      # Updated Earth animation
├── fonts/              # WOFF2 font files
├── assets/             # Images and media
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rotating-earth-website
   ```

2. **Download Inter Font Files**
   - Download Inter font files from [Google Fonts](https://fonts.google.com/specimen/Inter)
   - Place `Inter-Regular.woff2`, `Inter-Medium.woff2`, and `Inter-SemiBold.woff2` in the `fonts/` directory

3. **Open in Browser**
   - Open `index.html` in your web browser
   - The website will work locally without a server

## 🎨 Customization

### Colors
Update CSS custom properties in `style.css`:
```css
:root {
  --bg: #000000;
  --fg: #eaeff7;
  --accent: #60a5fa;
  --muted: #94a3b8;
}
```

### Fonts
The site uses Inter font with WOFF2 format. To change fonts:
1. Update `@font-face` rules in `css/style.css`
2. Add new font files to `fonts/` directory
3. Update `font-family` in the `body` selector

### Content
- Edit team member information in `index.html`
- Update contact details in `terms.html` and `privacy.html`
- Modify company information and descriptions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Organoterra Team
- Website: [rotating-earth-website](index.html)
- Email: info@organoterra.com

---

*Built with ❤️ for a better material world*
