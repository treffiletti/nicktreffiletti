# Newsletter Stack Setup

## Environment Variables

Add these to your Vercel project settings under **Environment Variables**:

### Required Variables
```bash
NEXT_PUBLIC_SITE_URL=https://www.nicktreffiletti.com
NEWSLETTER_PLATFORM=beehiiv
BEEHIIV_PUBLICATION_ID=<your_beehiiv_publication_id>
BEEHIIV_API_KEY=<your_beehiiv_api_key>
```

### Optional Variables (for Buttondown fallback)
```bash
BUTTONDOWN_API_KEY=<your_buttondown_api_key>
```

## Beehiiv Setup

### 1. Get Your Publication ID
1. Go to your Beehiiv dashboard
2. Navigate to **Settings** → **General**
3. Copy your **Publication ID**

### 2. Generate API Key
1. Go to **Settings** → **Integrations** → **API**
2. Click **Generate New API Key**
3. Copy the key (store securely)

### 3. Configure RSS Auto-Send
1. Go to **Settings** → **Integrations** → **RSS**
2. Enable **Auto-publish from RSS**
3. Set RSS feed URL: `https://www.nicktreffiletti.com/feed.xml`
4. Choose send timing (immediate or digest)

### 4. Create Welcome Email Automation
1. Go to **Automations** → **Create New**
2. Trigger: **New Subscriber**
3. Email content:
   - **Subject**: "Your Platform Architecture Scorecard + what to expect"
   - **Body**: Include link to `https://www.nicktreffiletti.com/scorecard.pdf`

## Testing

### Local Development
```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Production Testing
1. Deploy to Vercel with environment variables
2. Submit a real email through the form
3. Check Beehiiv subscribers list
4. Verify welcome email delivery
5. Test scorecard PDF download

## UTM Tracking

The system automatically captures and forwards these UTM parameters:
- `utm_source` (default: "site")
- `utm_medium` (default: "cta") 
- `utm_campaign` (default: "newsletter-signup")

View tracking data in Beehiiv's **Analytics** → **Subscribers** section.

## Security Notes

- API keys are server-side only (not exposed to client)
- Email validation prevents invalid submissions
- Rate limiting handled by Beehiiv/Buttondown
- HTTPS required for production
