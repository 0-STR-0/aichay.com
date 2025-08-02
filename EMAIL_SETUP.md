# 📧 Email Notification Setup Guide

This guide will help you set up email notifications to receive payment alerts at **manutdlol818@gmail.com**.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in your project root:
```bash
# Copy the example file
cp env.example .env
```

Edit the `.env` file with your Gmail credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

### 3. Gmail App Password Setup

Since Gmail requires an "App Password" for security:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "aichay-payments"
   - Copy the 16-character password
3. **Use the App Password** in your `.env` file

### 4. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📧 Email Notifications

### What You'll Receive

When someone makes a payment, you'll get a beautiful email with:

- **Order Details**: Order ID, Payment ID, Amount
- **Customer Information**: Email, Phone, Delivery Address
- **Order Items**: List of products with quantities and prices
- **Payment Method**: PayPal, Credit Card, or Cash on Delivery
- **Total Amount**: In KWD currency

### Email Format
```
🎉 New Payment Received - aichay

Payment Details:
- Order ID: PAY_1234567890
- Payment ID: CAPTURE_1234567890
- Amount: 18.98 KWD
- Payment Method: PayPal
- Date: 2024-01-15 14:30:25

Customer Information:
- Email: customer@example.com
- Phone: +965 12345678
- Delivery Address: Kuwait City, Kuwait

Order Items:
- Strawberry Bites: 2 x 8.99 KWD
- Blueberry Bites: 1 x 9.99 KWD

Total: 18.98 KWD
```

## 🔧 PayPal Webhook Setup

### 1. PayPal Developer Dashboard
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Log in with your PayPal Business account
3. Go to **Webhooks** in the left sidebar

### 2. Create Webhook
1. Click **Add Webhook**
2. **URL**: `https://your-domain.com/webhook/paypal`
3. **Event Types**: Select `PAYMENT.CAPTURE.COMPLETED`
4. Click **Save**

### 3. Test Webhook
1. Use PayPal's webhook simulator
2. Send a test event to verify email notifications

## 🌐 Deploy to Production

### Option 1: Heroku (Recommended)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-aichay-app

# Set environment variables
heroku config:set EMAIL_USER=your-gmail@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Deploy
git add .
git commit -m "Add email notifications"
git push heroku main
```

### Option 2: DigitalOcean/AWS
1. Upload files to your server
2. Install Node.js and npm
3. Run `npm install`
4. Use PM2 to keep server running:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   ```

### Option 3: Vercel/Netlify
These platforms are better for static sites. For email notifications, you'll need a separate backend service.

## 🔍 Testing

### Test Email Notifications
```bash
# Start the server
npm start

# Test with curl
curl -X POST http://localhost:3000/api/payment-notification \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST_123",
    "paymentId": "TEST_PAY_123",
    "amount": "18.98",
    "currency": "KWD",
    "paymentMethod": "PayPal",
    "customerEmail": "test@example.com",
    "deliveryAddress": "Test Address, Kuwait",
    "phoneNumber": "+965 12345678",
    "items": [
      {
        "name": "Strawberry Bites",
        "quantity": 2,
        "price": 8.99
      }
    ],
    "orderDate": "2024-01-15T14:30:25.000Z"
  }'
```

## 🔒 Security Notes

### Production Security
1. **Webhook Verification**: Implement proper PayPal webhook signature verification
2. **HTTPS**: Always use HTTPS in production
3. **Environment Variables**: Never commit `.env` files to git
4. **Rate Limiting**: Add rate limiting to prevent spam
5. **Input Validation**: Validate all incoming data

### Email Security
1. **App Passwords**: Use Gmail App Passwords, not regular passwords
2. **Encryption**: Consider using encrypted email services
3. **Backup**: Keep backup copies of important orders

## 🛠️ Troubleshooting

### Common Issues

**Email not sending:**
- Check Gmail App Password is correct
- Verify 2FA is enabled on Gmail
- Check spam folder for test emails

**Server won't start:**
- Verify Node.js is installed (`node --version`)
- Check all dependencies are installed (`npm install`)
- Verify `.env` file exists and has correct values

**Webhook not working:**
- Ensure webhook URL is publicly accessible
- Check server logs for errors
- Verify PayPal webhook is configured correctly

### Debug Mode
Add this to your `.env` file for detailed logging:
```env
DEBUG=*
```

## 📞 Support

If you need help:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Test with the curl command above
4. Ensure your Gmail account has 2FA enabled

## 🎉 Success!

Once set up, you'll receive beautiful email notifications at **manutdlol818@gmail.com** every time someone makes a payment on your aichay website!

The emails will include all order details, customer information, and payment amounts in KWD currency. 