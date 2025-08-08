// This is the file to switch between English and Spanish 
(function() {
  const LS_KEY = 'lang'; // Name of the storage key so we remember user's choice
  const supported = ['en', 'es']; // Languages we support

  // Load a language file and update the page
  async function loadLang(lang) {
    // Fetch the JSON dictionary file for the chosen language
    const res = await fetch(`${lang}.json`);
    const dict = await res.json();

    // Loop through every element that has data-i18n="some.key"
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');

      // Find the translation text in our dictionary
      const value = key.split('.').reduce((obj, part) => obj && obj[part], dict);

      // If we found a translation, set the text
      if (value) {
        // Special check for placeholders (like input fields)
        if ('placeholder' in el) el.placeholder = value;
        else el.textContent = value;
      }
    });

    // Do the same for images with data-i18n-alt
    document.querySelectorAll('[data-i18n-alt]').forEach(img => {
      const key = img.getAttribute('data-i18n-alt');
      const value = key.split('.').reduce((obj, part) => obj && obj[part], dict);
      if (value) img.alt = value;
    });

    // Save language choice and update the HTML lang attribute
    localStorage.setItem(LS_KEY, lang);
    document.documentElement.lang = lang;
  }

  // Decide which language to load on first visit
  let lang = localStorage.getItem(LS_KEY)
           || (navigator.language || 'en').slice(0,2).toLowerCase();
  if (!supported.includes(lang)) lang = 'en';

  // Event listeners for the language buttons
  document.getElementById('lang-en')?.addEventListener('click', () => loadLang('en'));
  document.getElementById('lang-es')?.addEventListener('click', () => loadLang('es'));

  // Load the chosen language
  loadLang(lang);
})();

