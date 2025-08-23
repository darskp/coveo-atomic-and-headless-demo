
const documents = [
  {
    documentId: 'item://doc3',
    title: 'Smartphone Overview',
    content: 'This document covers smartphone specs, brands, and reviews.',
    uri: 'https://www.example.com/smartphones',
    type: 'HTML'
  },
  {
    documentId: 'item://doc4',
    title: 'Camera Tips',
    content: 'This document provides tips for choosing cameras and photography.',
    uri: 'https://www.example.com/cameras',
    type: 'HTML'
  },
  {
    documentId: 'item://doc5',
    title: 'Gaming Laptop Review',
    content: 'This document reviews the latest gaming laptops.',
    uri: 'https://www.example.com/gaming-laptops',
    type: 'HTML'
  }
];

async function pushDocuments() {
  for (const doc of documents) {
    try {
      const response = await fetch(
        `https://api.cloud.coveo.com/push/v1/organizations/${ORG_ID}/sources/${PUSH_SOURCE}/documents?documentId=${encodeURIComponent(doc.documentId)}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: doc.title,
            content: doc.content,
            uri: doc.uri,
            type: doc.type
          })
        }
      );

      if (!response.ok) {
        console.error(`Failed to push ${doc.documentId}:`, response.status, await response.text());
      } else {
        console.log(`Document ${doc.documentId} pushed successfully`);
      }
    } catch (err) {
      console.error(`Error pushing ${doc.documentId}:`, err);
    }
  }
}

pushDocuments();

