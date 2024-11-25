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

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable the following services:
   - Authentication (Email/Password)
   - Cloud Firestore
   - Storage

### Authentication Setup
1. In Firebase Console, go to Authentication
2. Click "Get Started"
3. Enable Email/Password authentication
4. Create an admin account with the email you'll use for admin access

### Firestore Setup
1. Go to Firestore Database
2. Click "Create Database"
3. Start in production mode
4. Choose a location closest to your users
5. Add the following security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for all collections
    match /{document=**} {
      allow read: if true;
    }
    
    // Models collection - only admin can write
    match /models/{model} {
      allow write: if request.auth != null && 
                   request.auth.token.email == string(get(/databases/$(database)/documents/config/admin).data.adminEmail);
    }
    
    // Fan Art collection - authenticated users can create, only admin can delete
    match /fanarts/{fanart} {
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
                    request.auth.token.email == string(get(/databases/$(database)/documents/config/admin).data.adminEmail);
    }
    
    // Portfolio collection - only admin can write
    match /portfolio/{item} {
      allow write: if request.auth != null && 
                   request.auth.token.email == string(get(/databases/$(database)/documents/config/admin).data.adminEmail);
    }
  }
}
```

### Storage Setup
1. Go to Storage
2. Click "Get Started"
3. Choose a location
4. Add the following security rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images can be viewed by anyone
    match /images/{allPaths=**} {
      allow read: if true;
    }
    
    // Only authenticated users can upload images
    match /images/{userId}/{allPaths=**} {
      allow write: if request.auth != null &&
                   request.auth.uid == userId &&
                   request.resource.size < 5 * 1024 * 1024 && // 5MB
                   request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Environment Setup

1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

2. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web app icon (</>)
   - Register your app if you haven't already
   - Copy the configuration values

3. Update your `.env` file with the following variables:
```bash
# Firebase Configuration (required)
REACT_APP_FIREBASE_API_KEY=           # From Firebase config
REACT_APP_FIREBASE_AUTH_DOMAIN=       # From Firebase config
REACT_APP_FIREBASE_PROJECT_ID=        # From Firebase config
REACT_APP_FIREBASE_STORAGE_BUCKET=    # From Firebase config
REACT_APP_FIREBASE_MESSAGING_SENDER_ID= # From Firebase config
REACT_APP_FIREBASE_APP_ID=            # From Firebase config

# Admin Configuration (required)
REACT_APP_ADMIN_EMAIL=admin@azualtiv.com  # The email you'll use for admin access

# Analytics (optional)
REACT_APP_FIREBASE_MEASUREMENT_ID=    # From Firebase config, if using Analytics
```

4. Create an admin user:
   - Start the application
   - Go to the login page
   - Create an account using the email specified in REACT_APP_ADMIN_EMAIL
   - This account will have admin privileges

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