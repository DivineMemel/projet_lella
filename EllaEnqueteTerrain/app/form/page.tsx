import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router'; // Assurez-vous d'utiliser Expo Router pour la navigation

const FormsPage = () => {
  // Liste des formulaires avec leurs IDs et noms
  const forms = [
    { id: 1, title: "Enquête Street BTOC", route: "/form/street" },
    { id: 2, title: "Focus Groupe", route: "/form/focusgroup" },
    { id: 3, title: "Distributeurs & Marchands", route: "/form/distributeursmarchands" },
    { id: 4, title: "Fournisseurs & Prestataires", route: "/form/fournisseursprestataires" },
    { id: 5, title: "Magasin Enquête POS", route: "/form/magasinenquetepos" },
    { id: 6, title: "Restaurateurs & Traiteurs", route: "/form/restaurateurstraiteurs" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Barre de navigation en haut avec les liens "Inscription" et "Connexion" */}
      <View style={styles.navbar}>
        <Link href="/form/accueil" style={styles.navbarLink}>
          <Text style={styles.navbarText}>Déconnexion</Text>
        </Link>
      </View>

      <Text style={styles.title}>Choisissez un Quizz</Text>
      <View style={styles.buttonContainer}>
        {forms.map((form) => (
          <Link key={form.id} href={form.route} style={styles.button}>
            <Text style={styles.buttonText}>{form.title}</Text>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#aec075',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c442c',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0c442c',
    borderRadius: 5,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default FormsPage;