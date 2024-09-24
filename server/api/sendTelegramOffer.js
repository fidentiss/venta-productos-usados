import express from 'express';

const router = express.Router();

router.post('/send-offer', async (req, res) => {
  const { product, offer, whatsapp } = req.body;

  const message = `Nueva oferta para ${product}:\nOferta: $${offer}\nWhatsApp: [${whatsapp}](https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola, te escribo por tu oferta de $${offer} en el producto ${product}.`)})`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true, // Desactiva la vista previa
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    res.json({ success: true, message: 'Oferta enviada con éxito' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    res.status(500).json({ success: false, message: 'Error al enviar la oferta' });
  }
});

// Exportación como default
export default router;
