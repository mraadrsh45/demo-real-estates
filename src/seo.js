/**
 * SEO & Metadata Configuration
 * Western Real Estates - Mohali
 */

export const siteMetadata = {
  title: "Western Real Estates | Luxury Properties & 3D Tours | Mohali",
  shortTitle: "Western Real Estates",
  description: "Premier luxury real estate advisory in Sunny Enclave, Sector 125, SAS Nagar Mohali. Explore luxury villas, commercial plots, and 3D virtual tours.",
  siteUrl: "https://westernrealestates.com",
  canonical: "https://westernrealestates.com/",
  logo: "/logo.png",
  locale: "en_IN",
  author: "Western Real Estates",
  keywords: [
    "Western Real Estates",
    "luxury villas mohali",
    "Sunny Enclave Sector 125",
    "builder floors mohali",
    "property for sale mohali",
    "commercial SCO mohali",
    "RERA registered mohali",
    "3D property tour"
  ],
  geo: {
    region: "IN-PB",
    placename: "Mohali, Punjab, India",
    latitude: 30.7398,
    longitude: 76.6713
  },
  contact: {
    phone: "+91-8283996261",
    email: "westernrealestatesmohali@gmail.com",
    address: "H.No 4058, Sunny Enclave, Sector 125, SAS Nagar, Mohali, Punjab 140301",
    rera: "PBRERA-SAS80-AG0492"
  }
};

/**
 * Helper to dynamically set document title and meta description
 */
export function updateSEO(title, description) {
  if (title) {
    document.title = title.includes("Western Real Estates")
      ? title
      : `${title} | Western Real Estates`;
  }
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
  }
}
