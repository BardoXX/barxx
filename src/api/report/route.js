export async function POST(request) {
    const { message } = await request.json();
  
    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }
  
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
    if (!webhookUrl) {
      console.error('Discord webhook URL is missing');
      return Response.json({ error: 'Server error' }, { status: 500 });
    }
  
    try {
      const discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Nieuwe melding: ${message}`,
          embeds: [{
            color: 0xFF0000,
            fields: [{ name: 'Bericht', value: message }]
          }]
        }),
      });
  
      if (!discordResponse.ok) {
        const errorText = await discordResponse.text();
        throw new Error(`Discord API error: ${errorText}`);
      }
  
      return Response.json({ success: true });
    } catch (error) {
      console.error('Fout bij versturen:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  }