import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const recipientNumber = process.env.RECIPIENT_WHATSAPP_NUMBER || '0769142881';

export async function POST(request: Request) {
  try {
    console.log('Twilio WhatsApp API route called');
    const { customerPhone, message } = await request.json();
    console.log('Request data:', { customerPhone, message });
    
    if (!customerPhone || !message) {
      console.log('Missing phone or message');
      return NextResponse.json(
        { error: 'Le numéro de téléphone et le message sont requis' },
        { status: 400 }
      );
    }

    // Format phone numbers for WhatsApp
    const formattedCustomerPhone = formatPhoneNumber(customerPhone);
    const formattedRecipientNumber = formatPhoneNumber(recipientNumber);
    
    console.log('Formatted numbers:', {
      formattedCustomerPhone,
      formattedRecipientNumber
    });
    
    if (!accountSid || !authToken || !twilioWhatsAppNumber) {
      console.error('Twilio credentials are missing', { 
        accountSid: !!accountSid, 
        authToken: !!authToken, 
        twilioWhatsAppNumber 
      });
      return NextResponse.json(
        { error: 'Configuration Twilio manquante' },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);
    
    // Construire les numéros au format WhatsApp
    const fromNumber = `whatsapp:${twilioWhatsAppNumber}`;
    const toNumber = `whatsapp:+${formattedRecipientNumber}`;
    
    console.log('Sending WhatsApp message:', {
      from: fromNumber,
      to: toNumber,
      body: `Nouveau message de ${customerPhone}: ${message}`
    });
    
    try {
      // Send message to your number with customer's phone and message
      const result = await client.messages.create({
        body: `Nouveau message de ${customerPhone}: ${message}`,
        from: fromNumber,
        to: toNumber
      });
      
      console.log('Twilio message sent successfully:', {
        sid: result.sid,
        status: result.status,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage
      });
    } catch (twilioError) {
      console.error('Twilio error:', twilioError);
      throw twilioError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi du message', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Helper function to format phone numbers for WhatsApp
function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters except the + at the beginning
  let cleaned = phoneNumber.replace(/^\+/, '').replace(/\D/g, '');
  
  // Ensure it has the country code (default to France +33)
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1);
  }
  
  // If no country code is present, add French country code
  if (!cleaned.startsWith('33') && cleaned.length <= 10) {
    cleaned = '33' + cleaned;
  }
  
  return cleaned;
}
