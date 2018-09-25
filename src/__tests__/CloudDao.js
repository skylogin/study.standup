import FirebaseDao from "../FirebaseDao";
import config from "../config";

import Article from "../components/Article";

const dao = new FirebaseDao(config);
const article1 = Article();

it("Upload article and edit and delete", () => {
  let key = dao.newKey();

  //입력
  let updated = dao.update(key, article1);

  dao.getArticle(key).on("value", snapShot => {
    expect(snapShot.key).toEqual(key);
    //수정
    dao.update(key, article1);

    //삭제
    //dao.remove(key);
  });

  return updated;
});

it("Object assign", () => {
  let article2 = Object.assign({}, article1);
  article2.user = "Genji";
  article2.content = "다음";
  article2.urls[0].url = "http://www.naver.com";

  expect(article1.urls[0].imgWidth).toEqual(article2.urls[0].imgWidth);
});

it("list article", () => {
  dao.list(25).once("value", dataSnapshots => {
    let keys = [];
    dataSnapshots.forEach(dataSnapshot => {
      keys.push(dataSnapshot.key);
      var article = dataSnapshots.val();
      expect(article.user).toEqual("Genji");
    });
  });
});
