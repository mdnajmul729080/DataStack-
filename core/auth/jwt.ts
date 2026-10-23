import jwt from 'jsonwebtoken';

export interface ClientTokenPayload {
  clientId: string;
  name?: string;
  rateLimit?: number;
  iat?: number;
  exp?: number;
}

const DEFAULT_SECRET = process.env.DATASTACK_JWT_SECRET || 'datastack-universal-secret-key-2026';

export class AuthService {
  private static secret: string = DEFAULT_SECRET;

  public static setSecret(newSecret: string) {
    if (newSecret && newSecret.trim().length > 0) {
      this.secret = newSecret.trim();
    }
  }

  public static getSecret(): string {
    return this.secret;
  }

  /**
   * Generates a signed JWT for client SDK authentication.
   */
  public static generateClientToken(payload: { clientId: string; name?: string; rateLimit?: number }, expiresIn = '30d'): string {
    return jwt.sign(
      {
        clientId: payload.clientId,
        name: payload.name || payload.clientId,
        rateLimit: payload.rateLimit || 100,
      },
      this.secret,
      { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] }
    );
  }

  /**
   * Verifies and decodes incoming token from Socket.IO handshake.
   */
  public static verifyClientToken(token: string): { valid: boolean; payload?: ClientTokenPayload; error?: string } {
    try {
      const cleanToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
      const decoded = jwt.verify(cleanToken, this.secret) as ClientTokenPayload;
      return { valid: true, payload: decoded };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid token';
      return { valid: false, error: message };
    }
  }
}

export default AuthService;
