import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router"; 

const Accueil = () => {
  return (
    <View style={styles.container}>
      {/* Barre de navigation en haut avec les liens "Inscription" et "Connexion" */}
      <View style={styles.navbar}>
        <Link href="/form/inscription" style={styles.navbarLink}>
          <Text style={styles.navbarText}>Inscription</Text>
        </Link>
        <Link href="/form/connexion" style={styles.navbarLink}>
          <Text style={styles.navbarText}>Connexion</Text>
        </Link>
      </View>

      {/* Conteneur avec fond vert pour l'image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('/home/divine/Stage-Djoli/projet_lella/EllaEnqueteTerrain/assets/images/Design sans titre (1).png')}
          style={styles.logo}
        />
      </View>

      {/* Message de bienvenue */}
      <Text style={styles.text}>Le 1er Abbatoir Moderne de Volaille</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aec075', // Fond de la page
    justifyContent: 'center', // Centre le contenu verticalement
    alignItems: 'center', // Centre le contenu horizontalement
    position: 'relative', // Pour positionner les boutons en absolu
  },
  navbar: {
    position: 'absolute',
    top: 20, // Place la barre de navigation en haut
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  navbarLink: {
    padding: 10,
  },
  navbarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: '#aec075', // Fond de l'image
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Si tu veux un contour arrondi pour l'image
    padding: 10, // Espacement autour de l'image
    marginBottom: 20, // Espace sous l'image
  },
  logo: {
    width: 500, // Ajuste la taille de l'image
    height: 200, // Ajuste la taille de l'image
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30, // Espace entre le texte et les boutons
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Positionne les boutons en bas
    right: 20, // Positionne les boutons à droite
    width: '80%', // Gère la largeur des boutons
  },
  button: {
    backgroundColor: '#aec075', // Couleur de fond du bouton
    padding: 15, // Espacement interne du bouton
    borderRadius: 5, // Bord arrondi du bouton
    alignItems: 'center', // Centre le texte horizontalement
    marginBottom: 10, // Espace entre les boutons
  },
  buttonText: {
    color: 'white', // Couleur du texte du bouton
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Accueil;
