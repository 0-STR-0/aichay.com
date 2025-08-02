const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing aichay website for deployment...\n');

// Create deployment directory
const deployDir = 'aichay-deploy';
if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
    console.log('✅ Created deployment directory');
}

// Files to copy for static hosting
const staticFiles = [
    'index.html',
    'blueberry-bite.png',
    'strawberry-bite.png',
    '4880855B-A545-4E9F-8606-3BF484AC5C82.jpeg',
    'backblue.gif',
    'fade.gif'
];

// Copy files
let copiedCount = 0;
staticFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(deployDir, file));
        console.log(`✅ Copied: ${file}`);
        copiedCount++;
    } else {
        console.log(`⚠️  Missing: ${file}`);
    }
});

// Update favicon in deployment folder
const deployIndexPath = path.join(deployDir, 'index.html');
if (fs.existsSync(deployIndexPath)) {
    let deployIndexContent = fs.readFileSync(deployIndexPath, 'utf8');
    deployIndexContent = deployIndexContent.replace(
        /<link rel="icon" href="[^"]*">/,
        '<link rel="icon" href="4880855B-A545-4E9F-8606-3BF484AC5C82.jpeg">'
    );
    fs.writeFileSync(deployIndexPath, deployIndexContent);
    console.log('✅ Updated favicon to aichay logo');
}

console.log(`\n📁 Deployment files ready in: ${deployDir}/`);
console.log(`📊 Files copied: ${copiedCount}/${staticFiles.length}`);

// Create deployment info
const deployInfo = {
    staticHosting: {
        files: staticFiles.filter(f => fs.existsSync(f)),
        instructions: [
            '1. Go to https://netlify.com',
            '2. Create account and login',
            '3. Drag and drop the aichay-deploy folder',
            '4. Your website will be live instantly!'
        ]
    },
    fullStackHosting: {
        requirements: [
            'server.js',
            'package.json',
            '.env (with email credentials)',
            'All image files'
        ],
        instructions: [
            '1. Go to https://heroku.com',
            '2. Create account and install Heroku CLI',
            '3. Run: heroku create aichay-website',
            '4. Run: git push heroku main',
            '5. Set environment variables in Heroku dashboard'
        ]
    }
};

fs.writeFileSync(path.join(deployDir, 'deployment-info.json'), JSON.stringify(deployInfo, null, 2));
console.log('📋 Created deployment-info.json with instructions');

console.log('\n🎯 Next Steps:');
console.log('1. For static hosting: Upload aichay-deploy/ folder to Netlify');
console.log('2. For full features: Deploy entire project to Heroku');
console.log('3. Test your website after deployment'); 