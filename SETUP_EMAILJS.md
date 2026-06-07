# EmailJS Setup Guide

Your contact form is now set up to send emails to **ayeshulhassan@gmail.com** exclusively. Here's how to complete the setup:

## Step 1: Sign Up on EmailJS
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up with your email (use ayeshulhassan@gmail.com or any email you want to receive notifications on)
3. Verify your email

## Step 2: Get Your Public Key
1. Go to Dashboard → Integration (or Account settings)
2. Copy your **Public Key**
3. Replace `'YOUR_PUBLIC_KEY_HERE'` in [Contact.tsx](src/sections/Contact.tsx) line 10:
```typescript
emailjs.init('YOUR_PUBLIC_KEY_HERE');  // ← Paste your public key here
```

## Step 3: Create Email Service
1. Go to **Email Services** from the sidebar
2. Click **Add Service**
3. Choose your email provider (Gmail recommended):
   - Select "Gmail"
   - Connect your Gmail account
   - Click "Create Service"
4. Copy the **Service ID** (looks like `service_xxxxx`)

## Step 4: Create Email Template
1. Go to **Email Templates** from the sidebar
2. Click **Create New Template**
3. Use these settings:
   - **Template Name**: Contact Form (or any name)
   - **Service**: Select the service you created in Step 3
   - **Template Variables**: Add these fields:
     - `{{to_email}}`
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{message}}`
     - `{{reply_to}}`

4. In the **Email Content** section, set:
   - **To Email**: `{{to_email}}` (this ensures emails go to ayeshulhassan@gmail.com)
   - **Subject**: New Message from {{from_name}}
   - **Message Body**:
   ```
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```

5. Click **Save** and copy the **Template ID** (looks like `template_xxxxx`)

## Step 5: Update Contact.tsx
Replace the placeholder values in [Contact.tsx](src/sections/Contact.tsx) line 137:
```typescript
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',      // ← Paste your Service ID here
  'YOUR_TEMPLATE_ID_HERE',     // ← Paste your Template ID here
  { ... }
);
```

## Testing
1. Reload your portfolio page (http://localhost:3001)
2. Fill out the contact form and click "SEND IT"
3. Check **ayeshulhassan@gmail.com** for the message
4. Check **your email** for email sent notifications

## Security Notes
- ✅ Messages **ALWAYS** go to ayeshulhassan@gmail.com (hardcoded in the code)
- ✅ User's email is captured for reply-to functionality
- ✅ Only your credentials work with the public key
- ✅ EmailJS is a trusted service used by thousands of sites

## Troubleshooting
- **"Invalid public key"**: Double-check the public key is copied correctly
- **"Service not found"**: Verify the Service ID is correct
- **"Template not found"**: Verify the Template ID is correct
- **Email not received**: Check spam folder, verify template variables are correct
- **Check console**: Open browser DevTools (F12) → Console to see any error messages

**That's it! Your contact form is now fully functional and secure.** 🎉
