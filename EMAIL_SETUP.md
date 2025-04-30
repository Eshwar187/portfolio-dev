# Setting Up EmailJS for Contact Form with Auto-Reply

This portfolio uses EmailJS to send emails directly from the contact form without requiring a backend server. It implements two email functionalities:
1. Contact Form Submission - Sends the user's message to you
2. Auto-Reply - Sends a confirmation email to the user

Follow these steps to set up both EmailJS functionalities:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails per month, which should be sufficient for a portfolio contact form

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Give your service a name (e.g., "portfolio-contact")
6. Note down the Service ID for later use

## Step 3: Create Three Email Templates

### Contact Form Template
1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your contact form template with the following variables:
   - `{{from_name}}` - The name of the person contacting you
   - `{{reply_to}}` - The email address of the person contacting you
   - `{{message}}` - The message content
   - `{{to_name}}` - Your name (as the recipient)
4. Save the template
5. Note down the Template ID as your Contact Template ID

### Auto-Reply Template
1. Create another template by clicking "Create New Template" again
2. Design your auto-reply template with the following variables:
   - `{{from_name}}` - The name of the person contacting you (will appear as sender)
   - `{{to_name}}` - The name of the person contacting you (as recipient)
   - `{{to_email}}` - The email address of the person contacting you
   - `{{message}}` - Optional: Include their original message
3. Save the template
4. Note down the Template ID as your Auto-Reply Template ID

### Newsletter Subscription Template
1. Create another template by clicking "Create New Template" again
2. Design your newsletter subscription template with the following variables:
   - `{{subscriber_email}}` - The email address of the person subscribing
   - `{{to_name}}` - Your name (as the recipient)
   - `{{to_email}}` - **IMPORTANT**: Your email address where you'll receive notifications
   - `{{reply_to}}` - The subscriber's email (to allow you to reply directly)
   - `{{notes}}` - Additional information about the subscription
3. Make sure to set the "To Email" field in the template to `{{to_email}}` or your fixed email address
4. Save the template
5. Note down the Template ID as your Newsletter Template ID

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account"
2. Find your "Public Key" in the API Keys section
3. Note down the Public Key for later use

## Step 5: Update Environment Variables

1. Open the `.env.local` file in your portfolio project
2. Update the following variables with your EmailJS credentials:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
   NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id
   NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Step 6: Test the Contact Form and Newsletter

### Testing Contact Form
1. Run your portfolio application
2. Navigate to the Contact page
3. Fill out the form and submit it
4. Check your email to ensure you received the contact message
5. Check the email address you entered in the form to ensure it received the auto-reply

### Testing Newsletter Subscription
1. Navigate to the Blog page
2. Scroll down to the Newsletter section
3. Enter an email address and click Subscribe
4. Check your email to ensure you received the newsletter subscription notification

## Troubleshooting

If you encounter any issues:

1. Check the browser console for error messages
2. Verify that your EmailJS credentials are correct in the `.env.local` file
3. Make sure your email templates contain the correct variables
4. Check the EmailJS dashboard for any error logs
5. Ensure your email service is properly connected and active

For more information, visit the [EmailJS documentation](https://www.emailjs.com/docs/).
