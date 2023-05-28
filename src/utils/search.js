export default function searchCertificates(certificates, query) {
  const searchResults = {
    "First Year": [],
    "Second Year": [],
    "Third Year": [],
    "Fourth Year": [],
  };
  query = query.toLowerCase();
  for (const year in certificates) {
    for (const certificate of certificates[year]) {
      if (
        certificate.certificateName.toLowerCase().includes(query) ||
        certificate.category.activityHead.toLowerCase().includes(query) ||
        certificate.category.activity.toLowerCase().includes(query)
      ) {
        searchResults[year].push(certificate);
      }
    }
  }
  // Return the search results object
  return searchResults;
}
