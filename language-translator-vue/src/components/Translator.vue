<template>
  <div class="translator-container">
    <h2>Translator</h2>
    <div class="language-select">
      <label for="sourceLang">Select Source Language</label>
      <select v-model="sourceLang" id="sourceLang" class="select-box">
        <option v-for="(lang, key) in languages" :key="key" :value="key">
          {{ lang }}
        </option>
      </select>
    </div>
    <div class="language-select">
      <label for="targetLang">Select Target Language</label>
      <select v-model="targetLang" id="targetLang" class="select-box">
        <option v-for="(lang, key) in languages" :key="key" :value="key">
          {{ lang }}
        </option>
      </select>
    </div>
    <br />
    <div class="text-area">
      <label for="inputText">Enter Text to Translate</label>
      <textarea
        v-model="inputText"
        id="inputText"
        class="text-input"></textarea>
    </div>
    <div class="text-area">
      <label for="translation">Translation</label>
      <textarea
        :value="translation"
        id="translation"
        class="text-input"
        readonly></textarea>
    </div>

    <button @click="translate" class="translate-button">
      {{ loading ? "Translating..." : "Translate" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceLang: "en",
      targetLang: "bn",
      inputText: "",
      translation: "",
      languages: {
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
      },

      loading: false,
    };
  },
  methods: {
    async translate() {
      this.loading = true;
      const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
        },
        body: JSON.stringify({
          from: this.sourceLang,
          to: this.targetLang,
          q: this.inputText,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result && result.length > 0) {
          this.translation = result;
        } else {
          this.translation =
            "Translation not found! try another something.....";
        }
      } catch (error) {
        console.error(error);
        this.translation = "Translation error";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.translator-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2c2c54;
  color: white;
}

.translator-container h2 {
  margin: 12px 0 40px;
  text-align: center;
}

.language-select {
  margin: 15px 0;
  font-size: 18px;
}

.select-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #ccc;
  color: white;
}

.select-box option {
  background-color: #2c2c54;
}

.text-area textarea {
  margin: 13px 0;
  width: 96%;
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #ccc;
  color: white;
  outline: none;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.translate-button {
  display: block;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.translate-button:hover {
  background-color: #0056b3;
}
</style>
