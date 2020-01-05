const FB = require('fb');

const { openDB, closeDB } = require('../mongoUtil')
const Conversation = require('../../models/conversationModel')
const config = require('../../config')

FB.setAccessToken(config.get('facebook.token'));

async function findOneOrCreate(item) {
  const query = {
    id: item.id
  }
  const conversation = await Conversation.findOne(query)

  if (conversation) {
    return null
  }

  const data = {
    messages: item.messages.data,
    id: item.id
  }

  return new Conversation(data).save()
}

function main() {
  const params = {
    folder: 'page_done',
    fields: 'messages{message,created_time}'
  }

  return new Promise(resolve => {
    FB.api('/me/conversations', params, response => {
      const promises = response.data.map(findOneOrCreate)

      resolve(Promise.all(promises))
    });
  })
}

if (require.main === module) {
  const run = async () => {
    await openDB()
    await main();
    await closeDB();
  };

  run();
}
