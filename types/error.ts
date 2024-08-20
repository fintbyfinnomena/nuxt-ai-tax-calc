import type { NuxtError } from "#app";

export {};
declare global {
  interface AppError extends NuxtError {
    response: any;
  }

  interface ErrorITF {
    title?: string;
    message?: string;
    status?: boolean;
    statusCode?: number | undefined;
    cta_icon?: string;
    cta_url?: string | { to: string; external: boolean };
    cta_text?: string;
    callback?: any;
    can_dismiss?: boolean;
    error_code?: string;
  }
}
