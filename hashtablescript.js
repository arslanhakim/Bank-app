const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('../../acript.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Get the column indices
const columnIndexProduct = 0; // Assuming 'Product' is in the first column
const columnIndexValue = 1; // Assuming 'Value' is in the second column

// Create an empty hashtable
const hashtable = {};

// Iterate over each row starting from the second row
for (let i = 1; i < data.length; i++) {
  const row = data[i];

  // Get the values from the columns using column indices
  const url = row[columnIndexProduct];
  const value = row[columnIndexValue];

  // Check if both URL and value exist
  if (url && value) {
    // Remove the base URL from the URL
    const baseUrl = 'https://www.robinskitchen.com.au/'; // Replace with your base URL
    const cleanUrl = url.replace(baseUrl, '/');
    const cleanValue = value.replace(baseUrl, '/');

    // Add the cleaned URL and value to the hashtable
    hashtable[cleanUrl] = cleanValue;
  }
}

// Convert hashtable to JSON
const json = JSON.stringify(hashtable, null, 2);

// Write the JSON to a new file
fs.writeFileSync('hashtable.json', json);

console.log('Hashtable successfully written to hashtable.json');
