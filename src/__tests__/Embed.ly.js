import getEmbedly from "../EmbedlyDao";

it("Get Embely info from embedly", () => {
  getEmbedly("http://naver.com")
    .then(response => {
      expect(response.data.url).toEqual("http://naver.com");
    })
    .catch(error => {
      console.localStorage(error);
    });
});
