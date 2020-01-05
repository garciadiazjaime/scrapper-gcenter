const { Parser } = require('json2csv');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile); 

const { openDB, closeDB } = require('../mongoUtil')
const Conversation = require('../../models/conversationModel')

async function getMessages() {
  const conversations = await Conversation.find().sort({ created_at: -1 }).limit(1000)
  const records = conversations.map(item => ({
    id: item.id,
    message: item.messages[item.messages.length - 1].message,
  }))

  return records
}

function createCSV(messages) {
  const fields = ['id', 'message'];
  const json2csvParser = new Parser({ fields });
  const csvData = json2csvParser.parse(messages);

  console.log(csvData)
  return writeFileAsync('./data/facebook_messages.csv', csvData, 'utf8')
}

async function main() {
  const messages = await getMessages()
  
  await createCSV(messages)
}

if (require.main === module) {
  const run = async () => {
    await openDB()
    await main();
    await closeDB();
  };

  run();
}
