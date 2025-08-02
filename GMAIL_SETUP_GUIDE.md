# 📧 Gmail App Password Setup Guide

## Why App Password?
Gmail requires an "App Password" for applications like our payment system to send emails securely. This is different from your regular Gmail password.

## Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Find "2-Step Verification" and click "Get started"
4. Follow the setup process (usually involves your phone number)
5. Complete the verification

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Scroll down to "App passwords" (only appears after 2FA is enabled)
4. Click "App passwords"
5. Select "Mail" from the dropdown
6. Select "Other (Custom name)"
7. Enter: `aichay-payment-system`
8. Click "Generate"
9. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Your Configuration
Run this command and use the App Password (not your regular password):
```bash
npm run setup
```

When prompted:
- Gmail address: `manutdlol818@gmail.com`
- Gmail App Password: [paste the 16-character App Password]

### Step 4: Test the Email System
```bash
npm run test-email
```

### Step 5: Start the Server
```bash
npm start
```

## Troubleshooting

**If you get "Invalid login" error:**
- Make sure 2-Factor Authentication is enabled
- Use the App Password (16 characters), not your regular password
- The App Password should look like: `abcd efgh ijkl mnop`

**If you can't find "App passwords":**
- Make sure 2-Factor Authentication is enabled first
- Wait a few minutes after enabling 2FA for the option to appear

## Security Note
- Never share your App Password
- You can revoke App Passwords anytime in your Google Account settings
- Each App Password is unique and secure 