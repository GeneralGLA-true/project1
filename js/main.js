async function getFetchData (){
  try {
    const response = await fetch('http://localhost:3001/photos');
    if(!response.ok) {
      throw new Error('Some network problem');
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  };
};
const mockArray = await getFetchData();
console.log(mockArray, 'mockArray');

export {mockArray};