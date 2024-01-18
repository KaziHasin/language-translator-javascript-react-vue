document.addEventListener("DOMContentLoaded", function () {
  const sourceLangSelect = document.getElementById("sourceLang");
  const targetLangSelect = document.getElementById("targetLang");
  const inputText = document.getElementById("inputText");
  const translationText = document.getElementById("translation");
  const translateBtn = document.getElementById("translateBtn");

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

  for (const key in languages) {
    if (languages.hasOwnProperty(key)) {
      const option1 = document.createElement("option");
      option1.value = key;
      option1.text = languages[key];
      sourceLangSelect.add(option1);

      const option2 = document.createElement("option");
      option2.value = key;
      option2.text = languages[key];
      targetLangSelect.add(option2);

      if (targetLangSelect.options.length === 2) {
        targetLangSelect.selectedIndex = 1;
      }
    }
  }
  const originalText = translateBtn.textContent;
  translateBtn.addEventListener("click", function () {
    this.textContent = "Translating...";
    translate();
  });

  async function translate() {
    const sourceLang = sourceLangSelect.value;
    const targetLang = targetLangSelect.value;
    const textToTranslate = inputText.value;

    // Add your API endpoint and key here
    const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
    const apiKey = "SIGN-UP-FOR-KEY"; //put your key

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
      },
      body: JSON.stringify({
        from: sourceLang,
        to: targetLang,
        q: textToTranslate,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result && result.length > 0) {
        translationText.value = result;
      } else {
        translationText.value = "Translation not found! Try something else.";
      }
    } catch (error) {
      console.error(error);
      translationText.value = "Translation error";
    } finally {
      translateBtn.textContent = originalText;
    }
  }
});
