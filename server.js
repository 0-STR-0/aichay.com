const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// PayPal webhook verification
function verifyPayPalWebhook(body, headers) {
    // In production, you should verify the webhook signature
    // For now, we'll accept all webhooks (you should implement proper verification)
    return true;
}

// Send email notification
async function sendPaymentNotification(paymentData) {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: 'manutdlol818@gmail.com',
        subject: '🎉 New Payment Received - aichay',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #fbb699, #f6754c); padding: 20px; text-align: center; color: white;">
                    <h1 style="margin: 0;">🎉 New Payment Received!</h1>
                    <p style="margin: 10px 0 0 0;">aichay Food Delivery</p>
                </div>
                
                <div style="padding: 20px; background: #f9f9f9;">
                    <h2 style="color: #333;">Payment Details</h2>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Order ID:</strong> ${paymentData.orderId}</p>
                        <p><strong>Payment ID:</strong> ${paymentData.paymentId}</p>
                        <p><strong>Amount:</strong> ${paymentData.amount} KWD</p>
                        <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
                        <p><strong>Email:</strong> ${paymentData.customerEmail}</p>
                        <p><strong>Phone:</strong> ${paymentData.phoneNumber}</p>
                        <p><strong>Delivery Address:</strong> ${paymentData.deliveryAddress}</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #333; margin-top: 0;">Order Items</h3>
                        ${paymentData.items.map(item => `
                            <div style="border-bottom: 1px solid #eee; padding: 8px 0;">
                                <p style="margin: 0;"><strong>${item.name}</strong></p>
                                <p style="margin: 0; color: #666;">${item.quantity} x ${item.price} KWD</p>
                            </div>
                        `).join('')}
                        <div style="border-top: 2px solid #f6754c; padding-top: 10px; margin-top: 10px;">
                            <p style="margin: 0; font-weight: bold; font-size: 18px;">
                                Total: ${paymentData.amount} KWD
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="color: #666; font-size: 14px;">
                            This is an automated notification from your aichay website.
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Payment notification email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// PayPal webhook endpoint
app.post('/webhook/paypal', async (req, res) => {
    try {
        const { body, headers } = req;
        
        // Verify webhook (implement proper verification in production)
        if (!verifyPayPalWebhook(body, headers)) {
            return res.status(400).json({ error: 'Invalid webhook signature' });
        }

        const eventType = body.event_type;
        
        if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
            const paymentData = body.resource;
            
            // Extract payment information
            const paymentInfo = {
                orderId: paymentData.custom_id || 'N/A',
                paymentId: paymentData.id,
                amount: paymentData.amount.value,
                currency: paymentData.amount.currency_code,
                paymentMethod: 'PayPal',
                customerEmail: body.resource.payer?.email_address || 'N/A',
                phoneNumber: 'N/A', // PayPal doesn't provide phone in webhook
                deliveryAddress: 'N/A', // PayPal doesn't provide address in webhook
                items: [] // PayPal doesn't provide items in webhook
            };

            // Send email notification
            await sendPaymentNotification(paymentInfo);
            
            console.log('PayPal payment processed:', paymentInfo);
        }

        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Manual payment notification endpoint (for testing)
app.post('/api/payment-notification', async (req, res) => {
    try {
        const paymentData = req.body;
        
        // Send email notification
        const emailSent = await sendPaymentNotification(paymentData);
        
        if (emailSent) {
            res.json({ success: true, message: 'Payment notification sent' });
        } else {
            res.status(500).json({ error: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Payment notification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Email notifications will be sent to: manutdlol818@gmail.com`);
}); 