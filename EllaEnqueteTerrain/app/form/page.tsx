import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router'; // Assurez-vous d'utiliser Expo Router pour la navigation

const FormsPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choisissez une catégorie</Text>
      <View style={styles.buttonContainer}>
        <Link href="/form/street" style={styles.button}>
          <Text style={styles.buttonText}>Enquête  Street BTOC</Text>
        </Link>
        <Link href="/form/consommateurs" style={styles.button}>
          <Text style={styles.buttonText}>Consommateurs & Traiteurs (HORECA - B2B)</Text>
        </Link>
        <Link href="/form/distributeursmarchands" style={styles.button}>
          <Text style={styles.buttonText}>Distributeurs & Marchands</Text>
        </Link>
        <Link href="/form/expertspartenairesstrategiques" style={styles.button}>
          <Text style={styles.buttonText}>experts & Partenaires & Strategiques</Text>
        </Link>
        <Link href="/form/fournisseursprestataires" style={styles.button}>
          <Text style={styles.buttonText}>Fournisseurs & Prestataires</Text>
        </Link>
        <Link href="/form/producteurseleveurs" style={styles.button}>
          <Text style={styles.buttonText}>Producteurs & Eleveurs</Text>
        </Link>
        <Link href="/form/restaurateurstraiteurs" style={styles.button}>
          <Text style={styles.buttonText}>Restaurateurs & Traiteurs</Text>
        </Link>
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
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormsPage;
