import type { WebhookEvent } from '../types/integrations';

export async function verifyWebhookSignature(signature: string, secret: string, body: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(body);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  const signatureBuffer = Buffer.from(signature, 'hex');
  return await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBuffer,
    data
  );
}

export async function handleWebhookEvent(event: WebhookEvent, config: any) {
  switch (event.type) {
    case 'wordpress.event.created':
      // Handle WordPress event creation
      break;
    case 'whatsapp.message.received':
      // Handle WhatsApp message
      break;
    case 'openai.completion.created':
      // Handle OpenAI response
      break;
    default:
      console.warn(`Unhandled webhook event type: ${event.type}`);
  }
}