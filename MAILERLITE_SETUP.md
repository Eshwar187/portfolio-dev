# Setting Up MailerLite for Your Newsletter

This guide will walk you through setting up MailerLite for your portfolio's newsletter subscription feature.

## Step 1: Create a MailerLite Account

1. Go to [MailerLite](https://www.mailerlite.com/) and sign up for an account
2. Complete the registration process and verify your email address
3. Follow MailerLite's onboarding steps to set up your account

## Step 2: Create a Subscriber Group

1. In your MailerLite dashboard, go to "Subscribers"
2. Click "Add new group"
3. Name your group (e.g., "Portfolio Newsletter")
4. Click "Save"

## Step 3: Create a Signup Form

1. In your MailerLite dashboard, go to "Forms"
2. Click "Create form" and select "Embedded Form"
3. Choose a template or start from scratch
4. Configure the form fields:
   - Name (First name, Last name, or both)
   - Email (required)
   - Add any other fields you want to collect
5. Customize the form design:
   - Change colors to match your portfolio (purple/pink gradient theme)
   - Adjust fonts and button styles
   - Customize success message
6. Save your form

## Step 4: Get Your Form ID and Account ID

1. After saving your form, click on "Get embed code"
2. Look for the HTML code snippet
3. Find these values in the code:
   - `data-form="XXXXXXX"` - This is your form ID
   - `data-account="XXXXXXX"` - This is your account ID
4. Copy these values

## Step 5: Update Your Code

1. Open `portfolio-app\components\MailerLiteForm.tsx`
2. Replace the placeholder account ID:
   ```typescript
   formDiv.dataset.account = '5000000'; // Replace with your MailerLite account ID
   ```
3. Open `portfolio-app\app\blog\page.tsx`
4. Replace the placeholder form ID:
   ```typescript
   <MailerLiteForm formId="your-form-id" />
   ```

## Step 6: Create a Welcome Email Automation

1. In your MailerLite dashboard, go to "Automations"
2. Click "Create workflow"
3. Select "When subscriber completes a form" as the trigger
4. Choose your newsletter signup form
5. Click "Add step" and select "Send email"
6. Create your welcome email:
   - Set a subject (e.g., "Welcome to My Newsletter!")
   - Design your email content
   - Use personalization tags like {{$name}} for the subscriber's name
   - Set your email address as the Reply-To
7. Save and activate the workflow

## Step 7: Test Your Newsletter Subscription

1. Run your portfolio application
2. Navigate to the Blog page
3. Scroll down to the Newsletter section
4. Fill out the form with a test email and submit
5. Check that:
   - The form submission is successful
   - You receive a notification in MailerLite
   - The test email receives the welcome email

## Step 8: Managing Subscribers

1. In your MailerLite dashboard, go to "Subscribers"
2. Select your newsletter group
3. Here you can:
   - View all subscribers
   - Export subscriber data
   - Manage unsubscribes
   - Create segments for targeted emails

## Step 9: Sending Newsletters

1. In your MailerLite dashboard, go to "Campaigns"
2. Click "Create campaign"
3. Select "Regular campaign"
4. Choose your subscriber group
5. Design your newsletter:
   - Use the drag-and-drop editor
   - Add your content, images, and links
   - Personalize with subscriber data
6. Preview and test your newsletter
7. Schedule or send immediately

## Troubleshooting

If you encounter any issues:

1. Check that your MailerLite account is properly set up and verified
2. Verify that your form ID and account ID are correctly entered in the code
3. Check the browser console for any JavaScript errors
4. Make sure your MailerLite account is on an active plan (free plan is available)
5. Test with different browsers to ensure compatibility

For more information, visit the [MailerLite documentation](https://www.mailerlite.com/help).
