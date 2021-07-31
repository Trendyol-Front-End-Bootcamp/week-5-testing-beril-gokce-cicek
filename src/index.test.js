import axios from "axios";
import { UserProvider } from "./index";
import { jest } from "@jest/globals";

jest.mock("axios");

describe("UserProvider", () => {
  const userProvider = new UserProvider();
  //Returns the titles of the user who posted the most
  it("should return the titles of the user who posted the most", async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: [
            {
                "userId": 2,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            {
                "userId": 2,
                "id": 3,
                "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
            }
        ],
      });
    });
    expect(await userProvider.getTitleOfMostPostingUser()).toEqual(["qui est esse", "ea molestias quasi exercitationem repellat qui ipsa sit aut"]);
  });

  //Returns the id of the user who posted the most
  it("should return the id of the user who posted the most", async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: [
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                "userId": 2,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            {
                "userId": 2,
                "id": 3,
                "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
            }
        ],
      });
    });
    expect(await userProvider.getMostPostingUserId()).toEqual(2);
  });

  //Returns error when request does not reach api
  it("should return error when the request does not arrive", async () => {
    axios.get.mockImplementation(() => {
      return Promise.reject("network error");
    });
    expect(await userProvider.getTitleOfMostPostingUser()).toBe("network error");
  });
});