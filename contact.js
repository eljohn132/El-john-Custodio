// Sends the "Leave me a message" form to eljohncustodio132@gmail.com via FormSubmit
(function () {
  var f = document.getElementById('contactForm');
  if (!f) return;
  var btn = document.getElementById('sendBtn'), msg = document.getElementById('formMsg');

  function reset() { btn.disabled = false; btn.textContent = 'Send message'; }

  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    btn.disabled = true; btn.textContent = 'Sending…'; msg.textContent = '';
    var data = {};
    new FormData(f).forEach(function (v, k) { data[k] = v; });

    fetch('https://formsubmit.co/ajax/eljohncustodio132@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.success === 'true' || j.success === true) {
          msg.textContent = 'Thank you! Your message was sent. I will reply soon.';
          f.reset();
        } else {
          // Server answered but refused (e.g. form not activated yet): show its reason
          msg.textContent = (j.message || 'Message not sent.') + ' Check your Gmail (and Spam) for the FormSubmit activation email.';
        }
        reset();
      })
      .catch(function () {
        // Network/CORS/blocked: fall back to a normal form submit, which also works for first-time activation
        msg.textContent = 'Sending the standard way…';
        f.submit();
      });
  });
})();
