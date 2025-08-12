"use client";
import { useEffect, useRef, useState } from "react";
import "./../public/css/love.css"

export default function Home() {
  const WHITE = "color: green;";
  const RED = "color: red;";

  const lyrics = [
    [`<span style="${WHITE}">Nguyện làm vầng trăng soi sáng đường</span>`, 0.2, 0.09],
    [`<span style="${WHITE}">Nguyện làm màn đêm yên giấc em</span>`, 0.2, 0.11],
    [`<span style="${WHITE}">Khi những trưa nắng hè, anh làm bóng mát cho em.</span>`, 0.2, 0.1],
    [`<span style="${WHITE}">Nguyện làm giường êm em muốn nằm</span>`, 0.5, 0.15],
    [`<span style="${WHITE}">Nguyện làm chăn ấm những đêm đông</span>`, 0.4, 0.085],
    [`<span style="${WHITE}">Nguyện làm gối êm thu về em tựa vào lòng anh</span>`, 1.5, 0.13],
    [`<span style="${WHITE}">Nguyện làm hàng cây dưới đường</span>`, 0.8, 0.1],
    [`<span style="${WHITE}">Nghiêng dài để anh che nắng em</span>`, 0.7, 0.11],
    [`<span style="${WHITE}">Anh sẽ luôn bên cạnh, cả đời che chở em</span>`, 0.4, 0.13],
    [`<span style="${WHITE}">Nguyện làm vì sao em ngước nhìn</span>`, 0.7, 0.12],
    [`<span style="${WHITE}">Nghe chuyện thì thầm em mỗi đêm</span>`, 0.5, 0.09],
    [`<span style="${WHITE}">Nguyện làm gió xuân trong lành</span>`, 0.2, 0.08],
    [`<span style="${WHITE}">Luôn quanh quẩn bên em</span>`, 3, 0.1],
    [`<span style="${RED}">Nguyện làm gió xuân trong lành</span>`, 1, 0.1],
    [`<span style="${RED}">Luôn quanh quẩn</span>`, 1.7, 0.2],
    [`<span style="${RED}">bên EM</span>`, 0.2, 0.5]
  ];

  const audioRef = useRef(null);
  const textRef = useRef(null);
  const [started, setStarted] = useState(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function karaoke(lyricsList) {
    if (!textRef.current) return;
    textRef.current.innerHTML = "";
    let line = "";

    for (let i = 0; i < lyricsList.length; i++) {
      const [htmlText, pause, delay] = lyricsList[i];
      const match = htmlText.match(/<span style="([^"]+)">(.+)<\/span>/);
      const color = match ? match[1] : "";
      const text = match ? match[2] : htmlText;

      for (const ch of text) {
        line += `<span style="${color}">${ch}</span>`;
        textRef.current.innerHTML = line;
        await sleep(delay * 1000);
      }
      line += "<br/>";
      if (i < lyricsList.length - 1) {
        await sleep(pause * 1000);
        textRef.current.innerHTML += "\n";
      }
    }
  }

  useEffect(() => {
    if (started) {
      audioRef.current?.play();
      karaoke(lyrics);
    }
  }, [started]);

  return (
    <div
      style={{ textAlign: "center", cursor: "pointer", userSelect: "none", display: "flex", height: "100vh", width: "100vw", justifyContent: "center", backgroundColor: "white", alignItems: "center" }}
      onClick={() => setStarted(true)}
    >
      {started && (
        <figure className="item">
          <div className="item-inner">
            <img src="/baby.jpg" style={{position:"relative", top:"-25%", right:"-20%", borderRadius:"15px", width:"50%", transform:"rotate(-15deg)"}}></img>
            <footer className="meta">
              <input
                type="checkbox"
                id="love"
                name="Love"
                value="Love"
                style={{ display: "none" }}
              />
              <label htmlFor="love">Love</label>
              <span className="heart"></span>
            </footer>
            <figcaption className="vh">Flowers</figcaption>
          </div>
        </figure>
      )}
      <p
        className="innerText"
        ref={textRef}
        style={{
          marginLeft: "20px",
          fontSize: 20,
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          color: "black"
        }}
      ></p>
      <audio ref={audioRef} src="/NguyenLam.mp3" />
      {!started && <img src="/box.jpg" alt="gift-box" style={{ width: "200px", height: "200px" }}></img>}
    </div>
  );
}
