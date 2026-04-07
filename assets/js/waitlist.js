/* ══════════════════════════════════════
   WAITLIST JS — EmailJS Integration
   Service  : service_8vcsfns
   Template : template_pyramidmail
   Public K : blfR01aZiUPHAJ6iI
══════════════════════════════════════ */

(function () {

  /* ── Config EmailJS ── */
  const EMAILJS_SERVICE_ID  = 'service_8vcsfns';
  const EMAILJS_TEMPLATE_ID = 'template_q0oji1v'; /* ← remplace par ton vrai Template ID */
  const EMAILJS_PUBLIC_KEY  = 'blfR01aZiUPHAJ6iI';

  /* ── Initialisation ── */
  emailjs.init(EMAILJS_PUBLIC_KEY);

  /* ── Sélecteurs ── */
  const form      = document.querySelector('.waitlist-form');
  const btnSubmit = document.querySelector('.btn-continue');

  if (!form || !btnSubmit) return;

  /* ── Utilitaires ── */
  function getVal(placeholder) {
    return form.querySelector(`[placeholder="${placeholder}"]`)?.value.trim() || '';
  }

  /* ── Prévention soumissions duplicates ── */
  const SUBMITTED_KEY = 'pm-submitted-emails';

  function isAlreadySubmitted(email) {
    const list = JSON.parse(localStorage.getItem(SUBMITTED_KEY) || '[]');
    return list.map(e => e.toLowerCase()).includes(email.toLowerCase());
  }

  function markAsSubmitted(email) {
    const list = JSON.parse(localStorage.getItem(SUBMITTED_KEY) || '[]');
    list.push(email.toLowerCase());
    localStorage.setItem(SUBMITTED_KEY, JSON.stringify(list));
  }

  function setLoading(yes) {
    btnSubmit.disabled = yes;
    btnSubmit.textContent = yes ? 'Envoi en cours…' : 'Continuer';
    btnSubmit.style.opacity = yes ? '0.7' : '1';
  }

  function showToast(msg, type) {
    const existing = document.getElementById('pm-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'pm-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '32px',
      left:         '50%',
      transform:    'translateX(-50%)',
      background:   type === 'success' ? '#0087CA' : '#e53e3e',
      color:        '#fff',
      padding:      '14px 28px',
      borderRadius: '50px',
      fontFamily:   'Inter, sans-serif',
      fontSize:     '14px',
      fontWeight:   '600',
      boxShadow:    '0 8px 32px rgba(0,0,0,0.18)',
      zIndex:       '9999',
      transition:   'opacity .4s ease',
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; }, 3500);
    setTimeout(() => toast.remove(), 4000);
  }

  function validate(prenom, nom, email, tel) {
    if (!prenom) return 'Veuillez saisir votre prénom.';
    if (!nom)    return 'Veuillez saisir votre nom.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Veuillez saisir une adresse e-mail valide.';
    if (!tel || tel.length < 8)
      return 'Veuillez saisir un numéro de téléphone valide.';
    return null;
  }

  /* ── Soumission ── */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const prenom = getVal('Prénom*');
    const nom    = getVal('Nom*');
    const email  = getVal('Adresse e-mail *');
    const tel    = form.querySelector('.phone-input')?.value.trim() || '';

    /* Validation */
    const err = validate(prenom, nom, email, tel);
    if (err) { showToast(err, 'error'); return; }

    /* Vérification doublon */
    if (isAlreadySubmitted(email)) {
      showToast("Cet email est déjà inscrit sur la liste d'attente.", 'error');
      return;
    }

    setLoading(true);

    /* Paramètres envoyés au template EmailJS */
    const templateParams = {
      to_email    : email,
      to_name     : prenom,
      prenom      : prenom,
      nom         : nom,
      telephone   : tel,
      confirm_url : 'https://rubens-dev11.github.io/LP_PyramidMail/merci.html',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      /* Marquer l'email comme soumis */
      markAsSubmitted(email);

      showToast('🎉 Email de confirmation envoyé ! Vérifiez votre boîte.', 'success');

      /* ── Enregistrement Google Sheets ── */
      const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxq7-HhftfMe6m2Dc5eEa3RYzfQ_44gLrSwfY7y08Nulg5ZZV-nWTQZ5W6gV7IuG5BsVQ/exec';

      fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: prenom,
          nom: nom,
          to_email: email,
          telephone: tel
        })
      }).catch(function(err) {
        console.warn('Sheets non enregistré:', err);
      });

      form.reset();

      /* Pré-remplir le +237 après reset */
      const phoneInput = form.querySelector('.phone-input');
      if (phoneInput) phoneInput.value = '+237 ';

    } catch (error) {
      console.error('EmailJS error:', error);
      showToast('Une erreur est survenue. Réessayez dans quelques instants.', 'error');
    } finally {
      setLoading(false);
    }
  });

})();
