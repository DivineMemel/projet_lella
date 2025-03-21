import React, { useState } from "react";
import { Link } from "expo-router"; 

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = () => {
    // Logique d'inscription ici
    console.log("Nom :", name);
    console.log("Numéro de téléphone :", phone);
    console.log("Mot de passe :", password);
    console.log("Accepté les termes :", agreeTerms);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.subtitle}>
        Ravi de vous rencontrer ! Entrez vos coordonnées pour vous inscrire.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Votre nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Votre numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="0123456789"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View style={agreeTerms ? styles.checkedBox : styles.uncheckedBox} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            J'accepte les{" "}
            <Text style={styles.link}>Conditions Générales</Text>
          </Text>
        </View>

        <Link href="/form/page" style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>S'inscrire / Se connecter</Text>
        </Link>

        <Text style={styles.footerText}>
          Vous avez déjà un compte ?{" "}
          <Text style={styles.link}>Se connecter</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#aec075",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0c442c",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#0c442c",
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    color: "#0c442c",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#f0e3dc",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#0c442c",
    justifyContent: "center",
    alignItems: "center",
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0c442c",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#0c442c",
  },
  link: {
    color: "#0c442c",
    textDecorationLine: "underline",
  },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#0c442c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default LoginScreen;
