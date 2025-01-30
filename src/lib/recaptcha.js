export async function verifyRecaptcha(token) {
    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
      });
  
      const data = await response.json();
      return data.success && data.score >= 0.5;
    } catch (error) {
      console.error('CAPTCHA validatie fout:', error);
      return false;
    }
  }