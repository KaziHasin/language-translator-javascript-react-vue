import React, { useState } from 'react';
import './css/translator.css'

function Translator() {

  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('bn');
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);



  const languages = { 
    en: "English",
    bn: "Bengali",
    es: "Spanish",
    fr: "French",
    de: "German",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ru: "Russian",
    ar: "Arabic",
    pt: "Portuguese",
    it: "Italian",
   };

  const onTranslate = async () => {
    
    setLoading(true);
     

    const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
	},
	body: JSON.stringify({
		from: sourceLang,
		to: targetLang, 
		q: inputText
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  setTranslation(result);
  setLoading(false);

} catch (error) {
	console.error(error);
  setLoading(false);

} 
  };

  return (
    <>
    <div className="translator-container">
      <h2>Translator</h2>
      <div className="language-select">
        <label htmlFor="sourceLang">Select Source Language</label>
        <select
          value={sourceLang}
          onChange={(e)=> setSourceLang(e.target.value)}
          id="sourceLang"
          className="select-box"
        >
          {Object.entries(languages).map(([key, value]) =>(
               <option value={key} key={key}>{value}</option>
          ))}
        </select>
        
      </div>
      <div className="language-select">
        <label htmlFor="targetLang">Select Target Language</label>
        <select
          value={targetLang}
          onChange={(e)=> setTargetLang(e.target.value)}
          id="targetLang"
          className="select-box"
        >

    {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
</select>

      </div>
      <br />
      <div className="text-area">
        <label htmlFor="inputText">Enter Text to Translate</label>
        <textarea
          value={inputText}
          onChange={(e)=> setInputText(e.target.value)}
          id="inputText"
          className="text-input"
        ></textarea>
      </div>
      <div className="text-area">
        <label htmlFor="translation">Translation</label>
        <textarea
          id="translation"
          className="text-input"
          value={translation}
          readOnly
        ></textarea>
      </div>

      <button
        className="translate-button"
        onClick={onTranslate}
      >
        {loading ? 'Translating.....': 'Translate'}
      </button>
    </div>
    </>
  );
}

export default Translator;
