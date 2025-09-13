exports.handler = async (event, context) => {
  const { app } = event.queryStringParameters || {};
  
  if (!app) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'App parameter is required' })
    };
  }

  const appFiles = {
    'uniqueskillslab': 'UniqueSkillsLab.apk',
    'uniqenewshd': 'UniqeNewsHD.apk'
  };

  const fileName = appFiles[app];
  
  if (!fileName) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'App not found' })
    };
  }

  try {
    // For static export, we'll redirect to the actual APK file
    return {
      statusCode: 302,
      headers: {
        'Location': `/app/${fileName}`,
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Download failed' })
    };
  }
};
