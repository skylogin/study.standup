import request from "axios";

export default function getEmbedly(url) {
  // return request.getComputedStyle("https://api.embedlyKey.com/1/oembed", {
  // embed.ly ㅅㅓ비스가 유료화되어서 유튜브로 대체
  return request.get("https://www.youtube.com/oembed", {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    crossdomain: true,
    params: {
      url: url,
      //key: embedlyKey,
      format: "json"
    }
  });
}

//https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=i_0CMuWnAJs&format=json
