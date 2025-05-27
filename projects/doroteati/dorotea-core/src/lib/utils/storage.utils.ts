import { DoroteaUploadOptions } from '../interfaces/storage-config.interface';
import { DEFAULT_UPLOAD_OPTIONS } from '../constants/storage.constants';

export class StorageUtils {
  static generateFileName(
    originalName: string,
    options: DoroteaUploadOptions = {}
  ): string {
    const finalOptions = { ...DEFAULT_UPLOAD_OPTIONS, ...options };

    if (!finalOptions.generateUniqueName) {
      return finalOptions.prefix + originalName.replace(/\s+/g, '_');
    }

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = this.getFileExtension(originalName);
    const nameWithoutExt = this.getFileNameWithoutExtension(originalName);

    return `${finalOptions.prefix}${timestamp}_${randomId}_${nameWithoutExt}.${extension}`;
  }

  static getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  static getFileNameWithoutExtension(fileName: string): string {
    const parts = fileName.split('.');
    if (parts.length === 1) return parts[0];
    return parts.slice(0, -1).join('.');
  }

  static validateFile(
    file: File,
    maxSizeMB?: number,
    allowedTypes?: string[]
  ): string | null {
    // Validar tamaño
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return `El archivo excede el tamaño máximo de ${maxSizeMB}MB`;
    }

    // Validar tipo
    if (allowedTypes && allowedTypes.length > 0) {
      const fileExtension = this.getFileExtension(file.name);
      if (!allowedTypes.includes(fileExtension)) {
        return `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(
          ', '
        )}`;
      }
    }

    return null;
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
