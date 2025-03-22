import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConsumerSurveyForm = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
      console.log("Données du formulaire :", data);
    
      const formattedResponses = currentQuestions.map((q) => ({
        question_id: q.id,
        answer: Array.isArray(data[`question_${q.id}`])
          ? data[`question_${q.id}`].join(", ")
          : data[`question_${q.id}`] || "",
      }));
    
      const payload = {
        form_type_id: 1, 
        responses: formattedResponses,
      };
    
      try {
        // Récupérer le token d'accès stocké
        const token = await AsyncStorage.getItem("accessToken");
    
        if (!token) {
          Alert.alert("Erreur", "Vous devez être connecté pour soumettre le formulaire.");
          return;
        }
    
        // Envoyer les données à l'API avec le token
        const response = await fetch("https://lellagn-project.onrender.com/apiquiz-responses/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // 🔥 Ajout du token ici
          },
          body: JSON.stringify(payload),
        });
    
        const rawResponse = await response.text();
        console.log("Réponse brute de l'API :", rawResponse);
    
        const result = JSON.parse(rawResponse);
    
        if (response.ok) {
          Alert.alert("Succès", "Vos réponses ont été soumises avec succès !");
          reset();
          setCurrentQuestions(getRandomQuestions());
        } else {
          Alert.alert("Erreur", result.message || "Une erreur s'est produite.");
        }
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enquête Street BTOC</Text>
      <Text style={styles.subtitle}>Merci de répondre aux questions suivantes :</Text>

      <View style={styles.form}>
      
        {/* Questions */}
        {questions.map((q, index) => (
          <View key={index}>
            <Text style={styles.label}>{`${index + 1}. ${q.label}`}</Text>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Votre réponse"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
              name={q.name}
              rules={{ required: true }}
            />
            {errors[q.name] && <Text style={styles.error}>Cette question est obligatoire</Text>}
          </View>
        ))}

        {/* Boutons */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Quitter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const questions = [
  { name: "chickenFrequency", label: "Consommez-vous souvent du poulet ? Si oui, à quelle fréquence ?" },
  { name: "chickenOrigin", label: "Lorsque vous achetez du poulet, d’où vient-il généralement ?" },
  { name: "chickenDifference", label: "Savez-vous faire la différence entre le poulet local et le poulet importé ?" },
  { name: "purchaseCriteria", label: "Quels critères sont les plus importants pour vous lors de l’achat de poulet ?" },
  { name: "payMoreLocal", label: "Êtes-vous prêt(e) à payer un peu plus cher pour un poulet local de meilleure qualité ?" },
  { name: "lellaKnowledge", label: "Avez-vous déjà entendu parler de LELLA SARL ?" },
  { name: "buyingPlace", label: "Où achetez-vous généralement votre poulet ?" },
  { name: "buyingObstacles", label: "Quels sont les freins qui vous empêchent d’acheter du poulet local plus souvent ?" },
  { name: "interestLella", label: "Si une marque comme LELLA SARL proposait du poulet local de qualité avec livraison ou points de vente accessibles, seriez-vous intéressé(e) ?" },
  { name: "improvements", label: "Qu’aimeriez-vous voir de plus dans l’offre de poulet en Guinée ?" }
];

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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginTop: 20,
  },
  quitButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#deb078",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default ConsumerSurveyForm;