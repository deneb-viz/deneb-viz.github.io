// Function to shuffle the array using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffleArray = <T>(array: T[]) => {
  // variables to track the current index and current random index
  let currentIndex = array.length,
    randomIndex: number;

  // while there are remaining elements
  while (currentIndex !== 0) {
    //assign randomIndex a random number that is >= 0 && < currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex--;

    //swap positions between currentIndex and randomIndex
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
