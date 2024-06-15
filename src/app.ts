import {Message, Whatsapp} from "venom-bot"

const venom = require('venom-bot');

venom.create({
  session: 'mybible-bot', 
})
  .then((client:Whatsapp) => start(client))
  .catch((error:any) => {
    console.log(error);
  });

async function start(client: Whatsapp) {
  client.onMessage(async (message: Message) => {
    if (message.body === "Hi" && !message.isGroupMsg) {
      client.sendText(message.from, "Hello");
    }

    if (message.body === "/mybible" && !message.isGroupMsg) {
      console.log(message.from)
      // sendBibleMainMenu(client, message.from);
      client.sendText(message.from, `
        My Bible Whatsapp Bot ✝️🤲🏼🤖

        Please select your desired action.
        */subscribe* - Subscribe to daily bible verse updates.
        */unsubscribe* - Unsubscribe from daily bible verse updates.
        */votd* - Get the verse of the day.
        `);
    }

    // Handle button responses
    if (message.type === 'buttons_response') {
      handleButtonResponse(client, message);
    }
  });
}

async function sendBibleMainMenu(client: Whatsapp, from:any) {
  const buttons = [
    {
      buttonId: 'verse_of_the_day',
      buttonText: { displayText: 'Verse of the DAY 🌅' },
      type: 1
    },
    {
      buttonId: 'subscribe',
      buttonText: { displayText: 'Subscribe 😊' },
      type: 1
    },
    {
      buttonId: 'unsubscribe',
      buttonText: { displayText: 'Unsubscribe 😢' },
      type: 1
    }
  ];

  await client.sendButtons(from, 'My Bible Whatsapp Bot ✝️🤲🏼🤖', 'Please select your desired action.', buttons)
    .then((result) => {
      console.log('Result: ', result); // Return object success
    })
    .catch((error) => {
      console.error('Error when sending: ', error); // Return object error
    });
}

async function handleButtonResponse(client: Whatsapp, message: any) {

  switch (message.selectedButtonId) {
    case 'verse_of_the_day':
      client.sendText(message.from, 'Here is your verse of the day!');
      // Add logic to send a verse
      break;
    case 'subscribe':
      client.sendText(message.from, 'You have subscribed to daily updates!');
      // Add logic to handle subscription
      break;
    case 'unsubscribe':
      client.sendText(message.from, 'You have unsubscribed from daily updates.');
      // Add logic to handle unsubscription
      break;
    default:
      client.sendText(message.from, 'Invalid selection.');
      break;
  }
}
