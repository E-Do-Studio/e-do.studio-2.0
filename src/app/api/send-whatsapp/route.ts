import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber, message } = await request.json();

    // Validation
    if (!phoneNumber || !message) {
      return NextResponse.json(
        { success: false, error: 'Phone number and message are required' },
        { status: 400 }
      );
    }

    // Récupérer les identifiants Twilio depuis les variables d'environnement
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    
    // Vérifier que les variables d'environnement sont définies
    if (!accountSid || !authToken || !twilioWhatsappNumber) {
      console.error('Twilio environment variables are not set');
      return NextResponse.json(
        { success: false, error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Votre numéro personnel WhatsApp (destinataire fixe)
    const yourWhatsAppNumber = '+33769142881'; // Remplacer par votre numéro avec l'indicatif pays
    
    // Formater le numéro de téléphone de l'expéditeur pour le lien WhatsApp
    let formattedSenderPhone = phoneNumber.replace(/\s+/g, '');
    if (!formattedSenderPhone.startsWith('+')) {
      formattedSenderPhone = '+33' + (formattedSenderPhone.startsWith('0') ? formattedSenderPhone.substring(1) : formattedSenderPhone);
    }
    
    // Préparer le message avec les informations de l'utilisateur et un lien cliquable
    // Note: Twilio WhatsApp prend en charge certains formats de texte enrichi
    const fullMessage = `Message de: ${phoneNumber} \n\nPour répondre directement: https://wa.me/${formattedSenderPhone.replace('+', '')}\n\nMessage:\n${message}`;
    
    try {
      // Initialiser le client Twilio
      const client = twilio(accountSid, authToken);
      
      // Envoyer le message via l'API Twilio WhatsApp
      await client.messages.create({
        body: fullMessage,
        from: `whatsapp:${twilioWhatsappNumber}`,
        to: `whatsapp:${yourWhatsAppNumber}`
      });
      
      console.log(`Message envoyé à ${yourWhatsAppNumber} via Twilio WhatsApp`);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message envoyé avec succès! Nous vous contacterons bientôt.' 
      });
    } catch (twilioError) {
      console.error('Twilio API error:', twilioError);
      return NextResponse.json(
        { success: false, error: 'Failed to send message via Twilio' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error processing WhatsApp message request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message request' },
      { status: 500 }
    );
  }
}
