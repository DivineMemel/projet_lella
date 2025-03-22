import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const questions = [
  {
    id: 1,
    question: "Combien de fois par semaine consommez-vous du poulet ?",
    options: ["1 fois", "2 à 3 fois", "4 fois ou plus", "Rarement ou jamais"],
  },
  {
    id: 2,
    question: "Où achetez-vous le plus souvent votre poulet ?",
    options: [
      "Marché",
      "Supermarché",
      "Boucherie",
      "Directement chez un producteur/ferme",
      "En ligne",
      "Autre (préciser)",
    ],
  },
  {
    id: 3,
    question: "Quel type de poulet achetez-vous le plus souvent ?",
    options: ["Local (élevé en Guinée)", "Importé", "Je ne sais pas"],
  },
  {
    id: 4,
    question: "Sous quelle forme achetez-vous votre poulet ?",
    options: [
      "Entier",
      "Découpé (filets, cuisses, ailes)",
      "Déjà préparé (mariné, pané, prêt à cuire)",
      "Transformé (nuggets, saucisses, etc.)",
    ],
  },
  {
    id: 5,
    question: "Achetez-vous du poulet congelé ou frais ?",
    options: ["Toujours frais", "Toujours congelé", "Indifférent"],
  },
  {
    id: 6,
    question: "Quel est le critère le plus important pour vous lorsque vous achetez du poulet ?",
    options: [
      "Le prix",
      "La fraîcheur",
      "Le goût",
      "L'origine (local/importé)",
      "La facilité d’accès (lieu de vente)",
      "Autre (préciser)",
    ],
  },
  {
    id: 7,
    question: "Si le poulet local coûtait un peu plus cher que l’importé, seriez-vous prêt(e) à l’acheter ?",
    options: ["Oui", "Non", "Peut-être"],
  },
  {
    id: 8,
    question: "À quelle occasion achetez-vous du poulet ? (Plusieurs réponses possibles.)",
    options: [
      "Repas quotidien",
      "Week-end",
      "Fêtes et événements spéciaux",
      "Autre (préciser)",
    ],
  },
  {
    id: 9,
    question: "Combien êtes-vous prêt(e) à payer pour 1 kg de poulet local ?",
    options: [
      "Moins de 50 000 GNF",
      "50 000 - 70 000 GNF",
      "Plus de 70 000 GNF",
      "Je ne fais pas attention au prix",
    ],
  },
  {
    id: 10,
    question: "Quelle quantité de poulet achetez-vous en moyenne par mois ?",
    options: ["Moins de 1 kg", "1 à 3 kg", "4 à 6 kg", "Plus de 6 kg"],
  },
  {
    id: 11,
    question: "Savez-vous comment différencier un poulet local d’un poulet importé ?",
    options: ["Oui", "Non"],
  },
  {
    id: 12,
    question: "Selon vous, quels sont les avantages du poulet local ? (Plusieurs réponses possibles.)",
    options: [
      "Meilleur goût",
      "Plus sain (moins d’additifs)",
      "Soutien aux producteurs locaux",
      "Meilleure qualité",
      "Autre (préciser)",
    ],
  },
  {
    id: 13,
    question: "Et quels sont ses inconvénients ? (Plusieurs réponses possibles.)",
    options: [
      "Plus cher",
      "Moins disponible",
      "Qualité variable",
      "Temps de cuisson plus long",
      "Autre (préciser)",
    ],
  },
  {
    id: 14,
    question: "Selon vous, quels sont les avantages du poulet importé ? (Plusieurs réponses possibles.)",
    options: [
      "Moins cher",
      "Plus disponible",
      "Facile à cuisiner",
      "Autre (préciser)",
    ],
  },
  {
    id: 15,
    question: "Et quels sont ses inconvénients ? (Plusieurs réponses possibles.)",
    options: [
      "Moins savoureux",
      "Qualité incertaine",
      "Utilisation de conservateurs",
      "Autre (préciser)",
    ],
  },
  {
    id: 16,
    question: "Êtes-vous satisfait(e) du poulet vendu actuellement sur le marché ?",
    options: [
      "Très satisfait(e)",
      "Assez satisfait(e)",
      "Peu satisfait(e)",
      "Pas du tout satisfait(e)",
    ],
  },
  {
    id: 17,
    question: "Avez-vous déjà eu une mauvaise expérience avec du poulet acheté ?",
    options: [
      "Oui, manque de fraîcheur",
      "Oui, goût ou texture inhabituelle",
      "Oui, problème de conservation",
      "Non, jamais",
    ],
  },
  {
    id: 18,
    question: "Quel est votre principal frein à l’achat du poulet local ?",
    options: [
      "Le prix",
      "La disponibilité",
      "La confiance dans la qualité",
      "Autre (préciser)",
    ],
  },
  {
    id: 19,
    question: "Que faudrait-il améliorer dans l’offre de poulet local ? (Plusieurs réponses possibles.)",
    options: [
      "Plus de points de vente",
      "Meilleure traçabilité et étiquetage",
      "Meilleure qualité et contrôle",
      "Prix plus abordables",
      "Autre (préciser)",
    ],
  },
  {
    id: 20,
    question: "Recommanderiez-vous le poulet local à vos proches ?",
    options: ["Oui, toujours", "Oui, mais avec des réserves", "Non"],
  },
  {
    id: 21,
    question: "Aimeriez-vous voir plus de promotions et réductions sur le poulet local ?",
    options: ["Oui", "Non", "Indifférent"],
  },
  {
    id: 22,
    question: "Souhaiteriez-vous avoir un service de livraison de poulet local à domicile ?",
    options: ["Oui", "Non", "Peut-être"],
  },
  {
    id: 23,
    question: "Seriez-vous intéressé(e) par un programme de fidélité sur l’achat de poulet local ?",
    options: ["Oui", "Non"],
  },
  {
    id: 24,
    question: "Préférez-vous acheter du poulet avec un label de qualité (bio, fermier, certification locale) ?",
    options: ["Oui", "Non"],
  },
  {
    id: 25,
    question: "En un mot, qu’attendez-vous du poulet local idéal ?",
    options: [],
  },
];

const getRandomQuestions = () => {
  let shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};


const RandomSurveyForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const navigation = useNavigation();
  const [currentQuestions, setCurrentQuestions] = useState(getRandomQuestions());


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
          "Authorization": `Bearer ${token}`,  
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
      <Text style={styles.title}>Enquête Focus Groupe</Text>
      <View style={styles.form}>

        {/* Questions aléatoires */}
        {currentQuestions.map((q, index) => (
          <View key={q.id} style={styles.questionContainer}>
            <Text style={styles.label}>{`${index + 1}. ${q.question}`}</Text>
            
            {/* Champ de texte si pas d'options */}
            {q.options.length === 0 ? (
              <Controller
                control={control}
                rules={{ required: "Ce champ est obligatoire" }}
                render={({ field }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Votre réponse"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
                name={`question_${q.id}`}
              />
            ) : (
              q.options.map((option, optIndex) => (
                <Controller
                  key={optIndex}
                  control={control}
                  name={`question_${q.id}`}
                  render={({ field }) => {
                    let selectedValues = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];
              
                    return (
                      <TouchableOpacity
                        style={[
                          styles.option,
                          selectedValues.includes(option) && styles.selectedOption
                        ]}
                        onPress={() => {
                          let newValue = [...selectedValues];
                          if (newValue.includes(option)) {
                            newValue = newValue.filter((val) => val !== option);
                          } else {
                            newValue.push(option);
                          }
                          field.onChange(newValue);
                        }}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedValues.includes(option) && styles.selectedOptionText
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              ))
              
            )}
          </View>
        ))}

        {/* Bouton Envoyer */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>

        {/* Bouton Quitter */}
        <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Quitter</Text>
        </TouchableOpacity>

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
    backgroundColor: "#b0c575",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a472e",
    marginBottom: 20,
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
  questionContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a472e",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0e3dc",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f0e3dc",
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "#0a472e",
  },
  optionText: {
    color: "#0a472e",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
  },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#0a472e",
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
});

export default RandomSurveyForm;