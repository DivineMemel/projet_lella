import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const SignScreen = () => {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Pour la navigation


  const handleLogin = async () => {
    // Vérifiez que les champs ne sont pas vides
    if (!phone_number || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // Données à envoyer à l'API
    const data = {
      phone_number: phone_number,
      password: password,
    };

    try {
      // Envoyer la requête POST à l'API
      const response = await fetch("https://lellagn-project.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Traiter la réponse
      const result = await response.json();

      if (response.ok) {
        // Si la connexion est réussie
        Alert.alert("Succès", result.message || "Connexion réussie !");
        // Rediriger l'utilisateur vers une autre page
        router.push("/form/page"); // Remplacez par la route souhaitée
      } else {
        // Si la connexion échoue
        Alert.alert("Erreur", result.message || "Identifiants incorrects.");
      }
    } catch (error) {
      // Gérer les erreurs réseau ou autres
      console.error("Erreur lors de la connexion :", error);
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>
        Bienvenue ! Entrez vos informations pour vous connecter.
      </Text>

      <View style={styles.form}>
                <Text style={styles.label}>Votre numéro de téléphone</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="0123456789"
                        value={phone_number}
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

<TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={styles.buttonText}>Se connecter</Text>
</TouchableOpacity>

<Text style={styles.footerText}>
  Vous n'avez pas de compte ?{" "}
  <Link href="/form/inscription" style={styles.link}>
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
    backgroundColor: "#ffffff",
    borderRadius: 10,
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
