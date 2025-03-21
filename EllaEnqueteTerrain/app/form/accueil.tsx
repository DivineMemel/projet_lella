import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import SignScreen from "./connexion"; // Importez votre composant de connexion

const Accueil = () => {
  return (
    <View style={styles.container}>
      {/* Barre de navigation en haut avec les liens "Inscription" et "Connexion" */}
      

      {/* Conteneur principal pour diviser la page en deux */}
      <View style={styles.mainContainer}>
        {/* Partie gauche pour le logo */}
        <View style={styles.leftSection}>
          <View style={styles.imageContainer}>
            <Image
              source={require('/home/divine/Stage-Djoli/projet_lella/EllaEnqueteTerrain/assets/images/Design sans titre (1).png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.text}>Le 1er Abattoir Moderne de Volaille</Text>
        </View>

        {/* Partie droite pour le formulaire de connexion */}
        <View style={styles.rightSection}>
          <SignScreen /> {/* Intégrez le formulaire de connexion ici */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aec075', // Fond de la page
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
  mainContainer: {
    flex: 1,
    flexDirection: 'row', // Divise la page en deux sections
    justifyContent: 'space-between', // Espace entre les sections
    alignItems: 'center', // Centre verticalement
    paddingHorizontal: 20, // Espacement horizontal
  },
  leftSection: {
    flex: 1, // Occupe la moitié de l'espace
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1, // Occupe la moitié de l'espace
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 300, // Ajuste la taille de l'image
    height: 150, // Ajuste la taille de l'image
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30, // Espace entre le texte et les boutons
  },
});

export default Accueil;