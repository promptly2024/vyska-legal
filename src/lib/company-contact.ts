type CompanyContactInfo = {
  headOffice?: string | null;
  address?: string | null;
};

export const DEFAULT_REGISTERED_OFFICE =
  "House No. 18A/K, Awadhpuri Colony, Muir Road, Allahabad Kty., Allahabad, Uttar Pradesh, India, 211002";

export const DEFAULT_PRAYAGRAJ_OFFICE =
  "B-11, 1st Floor, Vinayak City Square, Sardar Patel Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001";

export const DEFAULT_EMAIL = "vyskalegal@outlook.com";

export const DEFAULT_PHONE = "+91 96167 00999";

export const DEFAULT_WHATSAPP_URL = "https://wa.me/919616700999";

export const DEFAULT_OFFICE_HOURS =
  "Monday to Friday, 10:00 AM - 6:00 PM; Saturday by appointment";

export function getRegisteredOffice(companyInfo?: CompanyContactInfo | null) {
  const registeredOffice = companyInfo?.headOffice?.trim();

  // Older seed data stored only the city name here, which is too vague for public contact info.
  if (!registeredOffice || registeredOffice.toLowerCase() === "prayagraj") {
    return DEFAULT_REGISTERED_OFFICE;
  }

  return registeredOffice;
}

export function getPrayagrajOffice(companyInfo?: CompanyContactInfo | null) {
  return companyInfo?.address?.trim() || DEFAULT_PRAYAGRAJ_OFFICE;
}
