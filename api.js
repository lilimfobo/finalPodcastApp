export async function getData(url){
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
}