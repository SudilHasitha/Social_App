const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // Your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // This function is called when the user is authenticated successfully    
        
      // You can perform actions like creating a user session or generating a JWT token here    
      const user = profile;
      console.log(user);
    
      // You can access the user's profile information from the 'profile' object
      
      // For example, to get the user's email: profile.emails[0].value

      // Replace the following line with your own logic
      return done(null, profile);
    }
  )
);
