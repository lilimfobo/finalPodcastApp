export async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("Could not fetch data: ", e);
    return null;
  }
}