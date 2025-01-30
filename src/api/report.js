import { verifyRecaptcha } from '@/lib/recaptcha';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // ✅ Nu pas destructureren, omdat `req` hier beschikbaar is
    const { recaptchaToken, ...formData } = req.body;

    // CAPTCHA validatie
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ message: 'CAPTCHA validatie mislukt' });
    }

    // Valideer formulierdata
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ message: 'Alle velden zijn verplicht' });
    }

    // Hier kan je de data verwerken, bijvoorbeeld opslaan of verzenden per e-mail
    console.log('Formulier ontvangen:', formData);

    return res.status(200).json({ message: 'Bericht succesvol ontvangen!' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
