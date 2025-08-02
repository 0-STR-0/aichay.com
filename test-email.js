const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email
async function sendTestEmail() {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'manutdlol818@gmail.com',
        subject: '🧪 Test Email - aichay Payment System',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #fbb699, #f6754c); padding: 20px; text-align: center; color: white;">
                    <h1 style="margin: 0;">🧪 Test Email</h1>
                    <p style="margin: 10px 0 0 0;">aichay Payment System</p>
                </div>
                
                <div style="padding: 20px; background: #f9f9f9;">
                    <h2 style="color: #333;">Email System Test</h2>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Status:</strong> ✅ Email system is working!</p>
                        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
                        <p><strong>To:</strong> manutdlol818@gmail.com</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="color: #666; font-size: 14px;">
                            This is a test email to verify the payment notification system is working correctly.
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('📧 Check your email: manutdlol818@gmail.com');
        return true;
    } catch (error) {
        console.error('❌ Error sending test email:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure you have a .env file with EMAIL_USER and EMAIL_PASS');
        console.log('2. Verify your Gmail App Password is correct');
        console.log('3. Check that 2-Factor Authentication is enabled on your Google account');
        return false;
    }
}

// Run the test
sendTestEmail(); 