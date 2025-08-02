const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 aichay Email Setup');
console.log('=====================\n');

console.log('To receive payment notifications, you need to configure your Gmail account.');
console.log('Follow these steps:\n');

console.log('1. Go to your Google Account settings');
console.log('2. Enable 2-Factor Authentication');
console.log('3. Generate an App Password for this application');
console.log('4. Use that App Password below\n');

rl.question('Enter your Gmail address: ', (email) => {
    rl.question('Enter your Gmail App Password: ', (password) => {
        const envContent = `# Email Configuration
EMAIL_USER=${email}
EMAIL_PASS=${password}

# Server Configuration
PORT=3000

# PayPal Configuration (if needed for webhook verification)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret`;

        fs.writeFileSync('.env', envContent);
        
        console.log('\n✅ .env file created successfully!');
        console.log('\n📧 Email notifications will be sent to: manutdlol818@gmail.com');
        console.log('\n🚀 To start the server, run: npm start');
        console.log('\n🌐 The website will be available at: http://localhost:3000');
        
        rl.close();
    });
}); 