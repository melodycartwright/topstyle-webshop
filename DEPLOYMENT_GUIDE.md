# TopStyle Webshop - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for Deployment:

- [x] Fixed CSS typo in ProductCard.css
- [x] Created CartDropdown component with proper styling
- [x] Updated cart functionality with size support
- [x] Added Netlify configuration files
- [x] Production build tested successfully

### 📁 Key Files Created/Updated:

- `netlify.toml` - Netlify build configuration
- `frontend/public/_redirects` - SPA routing support
- `frontend/.env.production.example` - Production environment template
- All new components and features implemented

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: Add size selection, dropdown cart, and improved UX

- Add size selection dropdown to ProductCard
- Implement dropdown cart in navbar
- Update cart slice to handle product sizes
- Fix image display issues
- Improve cart page layout and functionality
- Add Netlify configuration files"
git push origin master
```

### 2. Netlify Frontend Deployment

#### Option A: Automatic Deployment (Recommended)

1. **Connect Repository**:

   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Build Settings** (should auto-detect from netlify.toml):

   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

3. **Environment Variables**:
   Set in Netlify Dashboard → Site Settings → Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api
   ```

#### Option B: Manual Upload

```bash
cd frontend
npm run build
# Upload the 'dist' folder contents to Netlify
```

### 3. Backend Deployment Options

#### Heroku (Recommended)

```bash
cd backend
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git subtree push --prefix=backend heroku master
```

#### Railway

1. Connect GitHub repository
2. Select backend folder
3. Set environment variables
4. Deploy automatically

#### Render

1. Create new Web Service
2. Connect GitHub repository
3. Set build and start commands:
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm start`

## 🔧 Environment Variables

### Frontend (.env)

```bash
VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api
```

### Backend (.env)

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/topstyle
JWT_SECRET=your-super-secret-jwt-key
```

## 🌐 Domain & SSL

- **Netlify**: Provides free SSL and custom domain support
- **Custom Domain**: Configure DNS to point to Netlify
- **HTTPS**: Automatically enabled with Netlify

## 🔍 Post-Deployment Testing

### Test These Features:

1. **Image Loading**: Verify all product images display correctly
2. **Size Selection**: Test size dropdown on product cards
3. **Cart Functionality**:
   - Add items with different sizes
   - Test dropdown cart from navbar
   - Verify cart page displays items correctly
4. **Responsive Design**: Test on mobile and desktop
5. **Navigation**: Ensure all routes work with SPA routing

### Common Issues & Solutions:

#### Images Not Loading

- Verify backend is serving static files correctly
- Check CORS configuration allows frontend domain
- Confirm VITE_API_BASE_URL is set correctly

#### 404 Errors on Page Refresh

- Ensure `_redirects` file is in `frontend/public/`
- Verify `netlify.toml` redirect rules are active

#### Cart Not Persisting

- Redux state resets on page refresh (this is expected)
- Consider adding localStorage persistence if needed

## 📱 Mobile Optimization

- Cart dropdown is responsive (width: 100vw on mobile)
- Touch-friendly size selection dropdowns
- Optimized image loading

## 🎯 Future Enhancements

- Add cart persistence with localStorage
- Implement user accounts with order history
- Add product search and filtering
- Integrate payment processing
- Add product reviews and ratings

## 📞 Support

If you encounter any deployment issues:

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Check Netlify deploy logs for build errors

---

**Your TopStyle Webshop is ready for production! 🎉**
