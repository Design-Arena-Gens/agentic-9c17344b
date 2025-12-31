import { NextRequest, NextResponse } from 'next/server'

// Facebook Webhook Verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'md_siam_islam_bot_2024'

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!')
    return new NextResponse(challenge, { status: 200 })
  } else {
    return new NextResponse('Forbidden', { status: 403 })
  }
}

// Handle Facebook Messenger messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.object === 'page') {
      body.entry.forEach((entry: any) => {
        const webhookEvent = entry.messaging[0]
        const senderPsid = webhookEvent.sender.id

        if (webhookEvent.message) {
          handleMessage(senderPsid, webhookEvent.message)
        } else if (webhookEvent.postback) {
          handlePostback(senderPsid, webhookEvent.postback)
        }
      })

      return NextResponse.json({ status: 'ok' })
    } else {
      return new NextResponse('Not Found', { status: 404 })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

async function handleMessage(senderPsid: string, receivedMessage: any) {
  const response = {
    text: `আপনার বার্তার জন্য ধন্যবাদ! Thanks for your message! আমাদের টিম শীঘ্রই রিপ্লাই করবে। Our team will reply soon.`
  }

  await callSendAPI(senderPsid, response)
}

async function handlePostback(senderPsid: string, receivedPostback: any) {
  const payload = receivedPostback.payload
  let response

  switch(payload) {
    case 'GET_STARTED':
      response = {
        text: '👋 স্বাগতম! Welcome to MD Siam Islam!'
      }
      break
    default:
      response = {
        text: 'আমি বুঝতে পারিনি। I didn\'t understand.'
      }
  }

  await callSendAPI(senderPsid, response)
}

async function callSendAPI(senderPsid: string, response: any) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

  const requestBody = {
    recipient: {
      id: senderPsid
    },
    message: response
  }

  try {
    await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
  } catch (error) {
    console.error('Unable to send message:', error)
  }
}
