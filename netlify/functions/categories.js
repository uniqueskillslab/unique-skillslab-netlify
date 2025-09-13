const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const categoriesPath = path.join(process.cwd(), 'lib', 'data', 'categories.js');
    const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    
    // Extract the categories array from the module
    const categories = eval(categoriesData.replace('export default ', ''));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to fetch categories' })
    };
  }
};
