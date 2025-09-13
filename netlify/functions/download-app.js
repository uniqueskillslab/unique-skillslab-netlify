import path from 'path';
import fs from 'fs';

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Get app parameter from query string
    const { app } = event.queryStringParameters || {};
    
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
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          message: 'Invalid app parameter. Available apps: uniqueskillslab, uniqenewshd' 
        }),
      };
    }

    // Path to the APK file
    const apkPath = path.join(process.cwd(), 'public', 'app', apps[app].filename);
    
    // Check if APK file exists
    if (!fs.existsSync(apkPath)) {
      console.log('APK file not found at:', apkPath);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          message: `APK file not found. Please upload ${apps[app].filename} to public/app/ directory.`,
          path: apkPath 
        }),
      };
    }

    // Read the file
    const fileBuffer = fs.readFileSync(apkPath);
    const fileSize = fs.statSync(apkPath).size;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${apps[app].filename}"`,
        'Content-Length': fileSize.toString(),
      },
      body: fileBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error serving APK:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
