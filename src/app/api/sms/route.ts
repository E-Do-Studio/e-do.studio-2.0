import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Stockage temporaire des messages (en mémoire)
let messages: Array<{
  id: string;
  phone: string;
  message: string;
  timestamp: string;
}> = [];

// Fonction pour stocker les messages dans un fichier JSON
function saveMessageToFile(phone: string, message: string) {
  try {
    const timestamp = new Date().toISOString();
    const id = `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newMessage = { id, phone, message, timestamp };
    
    // Ajouter à la liste en mémoire
    messages.push(newMessage);
    
    // Créer le répertoire de stockage s'il n'existe pas
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Chemin du fichier de messages
    const filePath = path.join(dataDir, 'messages.json');
    
    // Lire les messages existants ou créer un tableau vide
    let existingMessages = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        existingMessages = JSON.parse(fileContent);
      } catch (e) {
        // Si le fichier est corrompu, on commence avec un tableau vide
        console.error('Error parsing messages file:', e);
      }
    }
    
    // Ajouter le nouveau message
    existingMessages.push(newMessage);
    
    // Écrire dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(existingMessages, null, 2));
    
    // Afficher un message très visible dans la console
    console.log('\n\n');
    console.log('='.repeat(80));
    console.log('NOUVEAU MESSAGE REÇU:');
    console.log('-'.repeat(80));
    console.log(`De: ${phone}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log('='.repeat(80));
    console.log('\n\n');
    
    return id;
  } catch (error) {
    console.error('Error saving message to file:', error);
    return null;
  }
}

// Route API pour récupérer tous les messages
export async function GET() {
  try {
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve messages' }, { status: 500 });
  }
}

// Fonction pour envoyer un SMS (version gratuite avec stockage local)
export async function POST(request: Request) {
  try {
    const { customerPhone, message } = await request.json();
    
    console.log('SMS API route called');
    console.log('Request data:', { customerPhone, message });
    
    if (!customerPhone || !message) {
      console.log('Missing phone or message');
      return NextResponse.json(
        { error: 'Le numéro de téléphone et le message sont requis' },
        { status: 400 }
      );
    }

    // Format phone number (remove spaces, ensure international format)
    let formattedPhone = customerPhone.replace(/\s+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+33' + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }
    
    console.log('Formatted phone:', formattedPhone);
    
    // Récupérer le numéro du destinataire (votre numéro)
    const recipientNumber = process.env.RECIPIENT_WHATSAPP_NUMBER || '0769142881';
    
    // Stocker le message dans un fichier pour référence future
    const messageId = saveMessageToFile(formattedPhone, message);
    
    // Dans une version gratuite, nous simulons l'envoi d'un SMS
    // En production, vous utiliseriez une API comme MessageBird, Twilio, etc.
    
    // Simulation d'envoi réussi
    console.log(`[SIMULATION] SMS envoyé à ${recipientNumber} avec le message: ${message} (de ${customerPhone})`);
    console.log(`[INFO] Message stocké avec l'ID: ${messageId}`);
    
    // Pour une implémentation réelle avec MessageBird, vous feriez quelque chose comme:
    /*
    const messagebird = require('messagebird')('YOUR_API_KEY');
    
    messagebird.messages.create({
      originator: 'E-Do Studio',
      recipients: [formattedPhone],
      body: `Nouveau message: ${message}`
    }, function(err, response) {
      if (err) {
        console.log('MessageBird error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
      console.log('MessageBird response:', response);
    });
    */
    
    // Retourner une réponse de succès
    return NextResponse.json({ 
      success: true,
      message: 'Message reçu et sera traité rapidement',
      messageId
    });
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi du message', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
