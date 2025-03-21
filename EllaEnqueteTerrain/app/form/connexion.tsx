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

const SignScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logique de connexion ici
    console.log("Nom :", name);
    console.log("Mot de passe :", password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>
        Bienvenue ! Entrez vos informations pour vous connecter.
      </Text>

      <View style={styles.form}>
              <Text style={styles.label}>Votre nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                value={name}
                onChangeText={setName}
              />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Link href="/form/page" style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Se connecter</Text>
         </Link>

        <Text style={styles.footerText}>
          Vous n'avez pas de compte ?{" "}
          <Link href="/form/inscription" style={styles.Link}>
              S'inscrire
          </Link>
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
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#0c442c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
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
  link: {
    color: "#0c442c",
    textDecorationLine: "underline",
  },
});

export default SignScreen;
