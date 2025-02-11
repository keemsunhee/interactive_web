(function () {
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    // console.log(pageXOffset);
    // body 전체 높이(500vw)에서 눈에 보이는 화면 높이(스크롤바) 만큼 뺀 값 = 전체 스크롤 할 수 있는 범위

    // console.log(pageYOffset / maxScrollValue);
    // 얼마나 내려갔는지 비율 확인
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 970 - 490; //490 뒤로 빼놓은 default값 정리
    // 1000 대신 970인 이유는 마지막 스크롤 화면에서 3d 입체감을 보이기 위해
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    //progressbar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", function (e) {
    // console.log(e.clientX, e.clientY);
    // **내 시점(화면의 center)을 (0,0)이 되도록 바꿔보자**

    // mousePos.x = e.clientX / window.innerWidth // 현재Y위치 / 전체브라우저넓이 -> 범위: 0 ~ 1 -> 가운데 시점이 0.5가 됨 -> * 2 -> 0 ~ 2 -> -1 ~ 1
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    // console.log(mousePos);

    // **캐릭터도 함께 시점변경마다 움직이게끔 하기 위해 stage를 회전을 시키자**
    stageElem.style.transform =
      "rotateX(" + mousePos.y * 5 + "deg) rotateY(" + mousePos.x * 5 + "deg)"; // * 5 -> 흔들리는 범위를 더 넓히기 위함
  });

  //window.innerHeight 값이 바뀌면 스크롤값이 게속 바껴서 화면 비율 마다 고쳐질 값 설정이 필요함
  window.addEventListener("resize", resizeHandler);

  resizeHandler();
  //같은 코드 수정 -> 로드 될때 바로 resizeHandler 부터 실행 될 수 있도록
})();
