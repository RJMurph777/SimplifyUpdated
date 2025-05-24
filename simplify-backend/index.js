const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(cors());

const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

app.get('/api/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20email%20profile%20https://www.googleapis.com/auth/gmail.readonly&access_type=offline&prompt=consent`;
  res.redirect(url);
});

app.get('/api/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const access_token = tokenRes.data.access_token;
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

    res.redirect(`/?token=${access_token}&email=${userInfo.data.email}&name=${userInfo.data.name}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('OAuth callback failed');
  }
});

app.get('/api/user', (req, res) => {
  const { email, name } = req.query;
  if (!email) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ email, name });
});

app.listen(3001, () => console.log('Server running on port 3001'));
