
import siteConfig from "@config/site.config";

export async function submitLead(payload) {
  const url = siteConfig.appsScriptUrl;

  if (!url) {
    throw new Error("VITE_APPS_SCRIPT_URL is not set. Check your .env file.");
  }

  const body = {
    ...payload,
    _submittedAt: new Date().toISOString(),
    _source: window.location.hostname,
  };

  console.log("[Booking] Sending payload:", body);

  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(body),
  });

  console.log("[Booking] Request sent; Google response cannot be verified.");
}

