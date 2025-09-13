const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const coursesPath = path.join(process.cwd(), 'data', 'admin-courses.json');
    const coursesData = fs.readFileSync(coursesPath, 'utf8');
    const courses = JSON.parse(coursesData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(courses)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to fetch courses' })
    };
  }
};
