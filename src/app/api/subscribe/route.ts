import { NextRequest, NextResponse } from 'next/server'
import * as postmark from 'postmark'

const client = new postmark.ServerClient(
  process.env.POSTMARK_SERVER_TOKEN || ''
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Send confirmation email to the subscriber
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL || 'changelog@wholesalecentral.com',
      To: email,
      Subject: 'Welcome to Wholesale Central Changelog Updates',
      HtmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #050E40;">Welcome to Wholesale Central Changelog!</h1>
          <p>Thank you for subscribing to our changelog updates.</p>
          <p>You'll receive notifications whenever we ship new features, improvements, and fixes to America's leading B2B wholesale marketplace.</p>
          <p style="margin-top: 24px;">
            <a href="https://www.wholesalecentral.com" style="color: #EDAB2F;">Visit Wholesale Central</a>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #666; font-size: 12px;">
            Wholesale Central - America's wholesale hub since 1997
          </p>
        </div>
      `,
      TextBody: `
Welcome to Wholesale Central Changelog!

Thank you for subscribing to our changelog updates.

You'll receive notifications whenever we ship new features, improvements, and fixes to America's leading B2B wholesale marketplace.

Visit Wholesale Central: https://www.wholesalecentral.com

---
Wholesale Central - America's wholesale hub since 1997
      `.trim(),
      MessageStream: 'outbound',
    })

    // Optionally notify the team about new subscriber
    if (process.env.POSTMARK_NOTIFY_EMAIL) {
      await client.sendEmail({
        From:
          process.env.POSTMARK_FROM_EMAIL || 'changelog@wholesalecentral.com',
        To: process.env.POSTMARK_NOTIFY_EMAIL,
        Subject: 'New Changelog Subscriber',
        TextBody: `New subscriber: ${email}`,
        MessageStream: 'outbound',
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

