# Azualtiv Website

A React-based website for VTuber Azualtiv featuring content management, fan art submissions, and portfolio showcase.

## Features

### Home Page
- Social media integration
- Biography section
- Embedded Twitch stream
- TikTok content integration

### Models Gallery
- Display of 2D and 3D models
- Admin-controlled content management
- Detailed model information including artist credits

### Fan Art Section
- Public fan art submission system
- Gallery display with artist attribution
- Image upload functionality

### Portfolio
- Live2D model showcase
- Commissioner information and links
- Admin-controlled content management

## Technologies Used

- React 18
- React Router v6
- Material-UI (MUI)
- Firebase
  - Authentication
  - Firestore Database
  - Storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/azualtiv-website.git
cd azualtiv-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and obtain configuration:
   - Go to Firebase Console
   - Create a new project
   - Enable Authentication, Firestore, and Storage
   - Copy the configuration object

4. Configure Firebase:
   - Update `src/utils/firebase.js` with your Firebase configuration
   - Set up authentication rules in Firebase Console
   - Configure Firestore security rules
   - Set up Storage security rules

5. Start the development server:
```bash
npm start
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Admin Access

To set up admin access:
1. Create a user account through Firebase Authentication
2. Update the admin email in `src/utils/AuthContext.jsx`
3. Deploy your security rules in Firebase Console

## Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Security

- All admin functions are protected by authentication
- File uploads are restricted by type and size
- Database access is controlled through Firebase security rules

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Firebase for backend services
- React community for excellent documentation and support