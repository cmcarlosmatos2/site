const BOT_TOKEN = "6857006458:AAFnjf1SxioQXZteGuTQpBcB6nLTYjJhjDQ";
const CHAT_ID = "5913147075";

export async function sendToTelegram(message: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Erreur lors de l\'envoi vers Telegram:', error);
    return false;
  }
}