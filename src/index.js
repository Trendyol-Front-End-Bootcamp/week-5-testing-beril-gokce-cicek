import axios from "axios";

let userIdArr = [];

export class UserProvider {

  //The titles of the user who posts the most are returned
  async getTitleOfMostPostingUser() {
    var mostPostingUserId = this.getMostPostingUserId();
    try {
      const titles = await axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${mostPostingUserId}`)
        .then((result) => result.data.map((item) => item.title));
      return titles;
    } catch (error) {
      return error;
    }
  }

  //Returns the id of the user who posted the most
  async getMostPostingUserId() {
    try {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((result) => result.data.map((item) => userIdArr.push(item.userId)));
        const userId = this.getMostRepeatedId(userIdArr);
        return userId;
    } catch (error) {
      return error;
    }
  }

  //Each id is pushing into an array and the most repeated id is found in the array 
  //and returns from this method
  getMostRepeatedId(userIdArr) {
    var mostRepeatedItem;
    var mostRepeatedNum = 1;
    var userIdCounter = 0;
    for (var i = 0; i < userIdArr.length; i++) {
      for (var j = i; j < userIdArr.length; j++) {
        if (userIdArr[i] === userIdArr[j]) {
          userIdCounter++;
          if (mostRepeatedNum < userIdCounter) {
            mostRepeatedNum = userIdCounter;
            mostRepeatedItem = userIdArr[i];
          }
        }
      }
      userIdCounter = 0;
    }
    return mostRepeatedItem;
  }
}
