async function getResource(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch move');
  }

  const data = await response.json();

  return data;
}

export {
  getResource
}