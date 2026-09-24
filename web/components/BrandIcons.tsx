/*
 * Shared brand icons (inline SVG, no extra packages):
 * - Facebook, LinkedIn, WhatsApp, Telegram: official glyphs
 * - Google "G", X: Simple Icons (CC0 1.0)
 */

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="#1877F2">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 20v-6.2h2.08l.31-2.42H13.5V9.83c0-.7.2-1.18 1.2-1.18h1.3V6.49c-.23-.03-1-.1-1.9-.1-1.88 0-3.17 1.15-3.17 3.26v1.73H8.84v2.42h2.09V20h2.57Z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="#0A66C2">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.2 9.3H4.9V18h2.3V9.3ZM6 8.1a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm6.2 4.5c0-1.1.6-1.9 1.9-1.9 1.2 0 1.7.8 1.7 1.9V18h2.3v-3c0-2.3-1.2-3.4-2.9-3.4-1.3 0-1.9.7-2.2 1.2V9.3H10.7c0 .7 0 8.7 0 8.7h2.3v-5.4Z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2 0 1.1.3 2.1.8 3L5.8 18.2l3.3-.9c.9.5 1.9.7 2.9.7 3.4 0 6.2-2.8 6.2-6.2S15.4 5.8 12 5.8Zm0 11.3c-.9 0-1.9-.3-2.7-.7l-.2-.1-1.9.5.5-1.9-.1-.2c-.5-.8-.7-1.7-.7-2.7 0-2.8 2.3-5.1 5.1-5.1s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1Zm2.8-3.8c-.2-.1-1-.5-1.2-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4-.1-.1-.4-1-.6-1.4-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.4.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1-.4 1.2-.8.2-.4.2-.8.1-.9 0-.1-.2-.1-.4-.2Z"
      />
    </svg>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#29A9EB" />
      <path
        fill="#fff"
        d="M17.5 8.2 15 17.1c-.2.7-.6.9-1.3.5l-1.8-1.3-1.2 1.2c-.2.2-.4.4-.8.4l.4-2.6 3.3-3c.2-.2 0-.3-.2-.1l-4 2.6-2.1-.7c-.6-.2-.6-.6.1-.9l8.4-3.2c.5-.1.9.1.7.2Z"
      />
    </svg>
  );
}

export function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="#4285F4">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

export function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
}

/** Official multicolor Google "G" (Wikimedia Commons, PD-textlogo, trademarked). */
export function GoogleGIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
