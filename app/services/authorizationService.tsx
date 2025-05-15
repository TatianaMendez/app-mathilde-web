import axios from 'axios';

interface AuthResponse {
  token?: string;
  error?: string;
}

export class AuthorizationService {
  private static readonly BASE_URL = 'https://ygskuqceol.execute-api.us-east-2.amazonaws.com/dev/mathilde-ads';
  
  /**
   * Realiza la autenticación y obtiene el token de autorización
   * @param recaptchaToken Token de reCAPTCHA para verificación
   * @returns Promise con la respuesta de autenticación
   */
  public static async authenticate(recaptchaToken?: string): Promise<AuthResponse> {
    try {
        if (!import.meta.env.VITE_AUTHORIZATION_COG) {
            console.log("post url no estan en variables");
            return {
                error: 'Error al realizar la autenticación'
            };
        }

      const response = await axios.post(
        `${this.BASE_URL}/autorizacion`,
        {
          'auth':{
            'token': recaptchaToken 
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${import.meta.env.VITE_AUTHORIZATION_COG}`
          }
        }
      );

      return {
        token: response.data.cognito_token
      };
   
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      return {
        error: 'Error al realizar la autenticación'
      };
    }
  }
  
  /**
   * Almacena el token de autorización de forma segura
   * @param token Token a almacenar
   */
  public static setToken(token: string): void {
    document.cookie = `auth_token=${token}; Secure; SameSite=Strict; HttpOnly; Path=/`;
  }

  /**
   * Obtiene el token almacenado
   * @returns Token de autorización o null si no existe
   */
  public static getStoredToken(): string | null {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='));
    return cookie ? cookie.split('=')[1] : null;
  }

  /**
   * Elimina el token almacenado
   */
  public static removeToken(): void {
    document.cookie = 'auth_token=; Max-Age=0; Path=/';
  }
}
