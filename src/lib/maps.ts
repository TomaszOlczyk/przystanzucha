/** Linki do Google Maps. Cel to sam adres (pewna pinezka niezależnie od wizytówki firmy w Google). */
export function mapsQuery(street: string, zip: string, city: string): string {
  return `${street.replace(/\/U\d+$/i, "")}, ${zip} ${city}`;
}

/** Trasa do przedszkola: na telefonie otwiera aplikację Google Maps, na komputerze — maps.google.com. */
export function directionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
