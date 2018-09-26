export default function getArticle(
  user = "Genji",
  content = "겐지가 함께한다.",
  url = "https://namu.wiki/w/%EA%B2%90%EC%A7%80(%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98)",
  title = "겐지(오버워치)",
  description = "블리자드 엔터테인먼트 사의 FPS 게임 오버워치의 영웅.기계가 되어버린 몸을 받아들여 내면의 평화를 찾은 강력한 사이보그 닌자.",
  thumbnailUrl = "https://cdn.namuwikiusercontent.com/s/08e7b0467e19ff2f1064ac60191a844d91d1c1c5d24fc276739c037006bd7e2bb8b5332cf184c3bfdf5b1cfe1f15a9efff861447a6a1e8a9ff165f2aa78e3185eac26a4ca757704ec11fbdc9adc889af?e=1544453580&k=IuKHPB7M8hywbxE0apvSHg",
  thumbnailWidth = 80,
  thumbnailHeight = 80,
  provider_name = "namu wiki"
) {
  return {
    user: user,
    content: content,
    cardInfo: {
      url: url,
      title: title,
      description: description,
      thumbnail_url: thumbnailUrl,
      thumbnail_width: thumbnailWidth,
      thumbnail_height: thumbnailHeight,
      provider_name: provider_name
    }
  };
}
