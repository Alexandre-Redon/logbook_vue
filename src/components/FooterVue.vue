<template>
  <footer class="footer">
    <div class="footer__addr">
      <h1 class="footer__logo">Alexandre Redon</h1>

      <h2>Contact</h2>

      <address>
        112 rue de la République, 33000 Bordeaux, France
        <a class="footer__btn" href="mailto:example@gmail.com"> Contactez-nous </a>
      </address>
    </div>

    <ul class="footer__nav">
      <li class="nav__item">
        <h2 class="nav__title">Liens</h2>

        <ul class="nav__ul">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/shop">Boutique</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </li>

      <li class="nav__item nav__item--extra">
        <h2 class="nav__title">Aide</h2>

        <ul class="nav__ul nav__ul--extra">
          <li><a href="#">Options de paiement</a></li>
          <li><a href="#">Retours</a></li>
          <li><a href="#">Politiques de confidentialité</a></li>
        </ul>
      </li>

      <li class="nav__item">
        <h2 class="nav__title">Newsletter</h2>

        <ul class="nav__ul">
          <li>
            <input type="text" class="input__newsletter" placeholder="Entrez votre adresse mail" />
          </li>
          <li>
            <a class="btn__newletter" href="#"> Souscrire </a>
          </li>
        </ul>
      </li>
    </ul>

    <div class="legal">
      <p>&copy; 2023 Alexandre Redon. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterVue'
}
</script>

<style scoped>
@import '@/styles/home.css';
</style>
