import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get app parameter from query string
    const { app } = req.query;
    
    // Define app configurations
    const apps = {
      'uniqueskillslab': {
        filename: 'UniqueSkillsLab.apk',
        displayName: 'UniqueSkillsLab'
      },
      'uniqenewshd': {
        filename: 'UniqeNewsHD.apk',
        displayName: 'UniqeNewsHD'
      }
    };

    // Validate app parameter
    if (!app || !apps[app]) {
      return res.status(400).json({ 
        message: 'Invalid app parameter. Available apps: uniqueskillslab, uniqenewshd' 
      });
    }

    // Path to the APK file
    const apkPath = path.join(process.cwd(), 'public', 'app', apps[app].filename);
    
    // Check if APK file exists
    if (!fs.existsSync(apkPath)) {
      console.log('APK file not found at:', apkPath);
      return res.status(404).json({ 
        message: `APK file not found. Please upload ${apps[app].filename} to public/app/ directory.`,
        path: apkPath 
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${apps[app].filename}"`);
    res.setHeader('Content-Length', fs.statSync(apkPath).size);

    // Stream the file
    const fileStream = fs.createReadStream(apkPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving APK:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
