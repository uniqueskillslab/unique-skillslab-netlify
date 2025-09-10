import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Path to your APK file (you'll need to upload this to your Vercel project)
    const apkPath = path.join(process.cwd(), 'public', 'app', 'UniqueSkillsLab.apk');
    
    // Check if APK file exists
    if (!fs.existsSync(apkPath)) {
      return res.status(404).json({ message: 'APK file not found' });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="UniqueSkillsLab.apk"');
    res.setHeader('Content-Length', fs.statSync(apkPath).size);

    // Stream the file
    const fileStream = fs.createReadStream(apkPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving APK:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
