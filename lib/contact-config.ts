/** Server-side only: never pass configuration values to client components. */
export function contactConfigured() {
 const {RESEND_API_KEY, CONTACT_TO, CONTACT_FROM} = process.env;
 return Boolean(RESEND_API_KEY?.trim() && CONTACT_TO?.trim() && CONTACT_FROM?.trim() && !CONTACT_FROM.toLowerCase().includes("onboarding@resend.dev"));
}
