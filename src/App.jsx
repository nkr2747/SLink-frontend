import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState(null);
  const [shortURL, setShortURL] = useState(null);
  const [textToCopy, setTextToCopy] = useState("")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Use the modern Clipboard API
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      
      // Reset the button text back to "Copy" after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
  function handleInput(e) {
    setLongUrl(e.target.value);
  }
  async function handleClick() {
    const res = await fetch(`${BACKEND_URL}/v1/urls`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ longUrl: longUrl }),
    });
    setLongUrl("");
    const { shortUrl } = await res.json();
    setShortURL(shortUrl);
    setTextToCopy(`${BACKEND_URL}/${shortUrl}`)
    setResult(true);
  }
  return (
    <>
      <section id="center">
        <div>
          <h1>SLink</h1>
          <h2>URL Shortner</h2>
          <input type="text" value={longUrl} onChange={handleInput} />
          <button type="submit" onClick={handleClick}>
            Create
          </button>
          {result && (
            <div>
              <p>
                Shorten URL: {BACKEND_URL}/{shortURL}
              </p>
              <button onClick={handleCopy} className="copy-button">
                {isCopied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          )}
        </div>
        <div></div>
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App;
