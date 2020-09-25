export default async function LoadData(sidebarChoice) {
  try {
    const response = await fetch(
      `https://rzp-training.herokuapp.com/team2/${sidebarChoice}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
