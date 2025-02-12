import NodeCache from 'node-cache';
import { v2 as cloudinary } from 'cloudinary';

// Cache pendant 1 heure par défaut
const cloudinaryCache = new NodeCache({ stdTTL: 3600 });

interface CloudinaryResource {
  secure_url: string;
  bytes: number;
  format: string;
}

async function fetchCloudinaryResource(publicId: string): Promise<CloudinaryResource> {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'image',
      type: 'upload',
    });

    return {
      secure_url: result.secure_url,
      bytes: result.bytes,
      format: result.format,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Cloudinary resource: ${error}`);
  }
}

export async function getCachedCloudinaryResource(publicId: string): Promise<CloudinaryResource | null> {
  const cacheKey = `cloudinary_${publicId}`;

  // Vérifier si déjà en cache
  const cachedData = cloudinaryCache.get<CloudinaryResource>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Si pas en cache, faire l'appel API Cloudinary
    const resource = await fetchCloudinaryResource(publicId);

    // Mettre en cache le résultat
    cloudinaryCache.set(cacheKey, resource);

    return resource;
  } catch (error) {
    console.error('Erreur lors de la récupération Cloudinary:', error);
    return null;
  }
}

// Fonction helper pour nettoyer le cache
export function clearCloudinaryCache() {
  cloudinaryCache.flushAll();
} 