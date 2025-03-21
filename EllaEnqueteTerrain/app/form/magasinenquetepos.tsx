import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";


const questions = [
    {
      id: 1,
      question: "Comment avez-vous entendu parler de LELLA SARL ?",
      options: [
        "Bouche-à-oreille",
        "Réseaux sociaux",
        "Publicité",
        "Marché",
        "Recommandation",
      ],
    },
    {
      id: 2,
      question: "Pourquoi avez-vous choisi d’acheter du poulet ici aujourd’hui ?",
      options: [
        "Proximité",
        "Qualité perçue",
        "Prix attractif",
        "Recommandation",
        "Habitude",
      ],
    },
    {
      id: 3,
      question: "À quelle fréquence achetez-vous du poulet ?",
      options: [
        "Tous les jours",
        "Une fois par semaine",
        "Plusieurs fois par mois",
        "Occasionnellement",
      ],
    },
    {
      id: 4,
      question: "Quels critères sont les plus importants pour vous lors de l’achat de poulet ?",
      options: [
        "Fraîcheur",
        "Goût",
        "Origine locale",
        "Prix",
        "Label qualité",
        "Emballage",
      ],
    },
    {
      id: 5,
      question: "Quel format de produit préférez-vous ?",
      options: [
        "Poulet entier",
        "Découpé",
        "Mariné",
        "Prêt à cuire",
        "Transformé (nuggets, saucisses)",
      ],
    },
    {
      id: 6,
      question: "Achetez-vous généralement du poulet importé ou local ? Pourquoi ?",
      options: [],
    },
    {
      id: 7,
      question: "Comment évaluez-vous votre expérience d’achat aujourd’hui ?",
      options: [
        "Rapidité du service",
        "Disponibilité des produits",
        "Accueil",
        "Facilité de paiement",
      ],
    },
    {
      id: 8,
      question: "Qu’est-ce qui vous manque ou vous freine dans l’achat de nos produits ?",
      options: [
        "Stock limité",
        "Prix",
        "Manque d’informations",
        "Autres formats de produits attendus",
      ],
    },
    {
      id: 9,
      question: "Quels produits ou services aimeriez-vous voir chez LELLA SARL à l’avenir ?",
      options: [
        "Poulet bio",
        "Plats cuisinés",
        "Abonnements",
        "Livraison",
        "Programme de fidélité",
      ],
    },
    {
      id: 10,
      question: "Recommanderiez-vous LELLA SARL à votre entourage ? Pourquoi ?",
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

  
  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    reset(); // Réinitialiser le formulaire
    setCurrentQuestions(getRandomQuestions()); // Générer un nouveau groupe de questions
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enquête Magasin Enquête POS</Text>
      <View style={styles.form}>

        {/* Nom */}
        <Text style={styles.label}>Nom</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="name"
        />

        {/* Prénom */}
        <Text style={styles.label}>Prénom</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Entrez votre prénom"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="firstName"
        />

        {/* Questions aléatoires */}
        {currentQuestions.map((q, index) => (
          <View key={q.id} style={styles.questionContainer}>
            <Text style={styles.label}>{`${index + 1}. ${q.question}`}</Text>
            
            {/* Champ de texte si pas d'options */}
            {q.options.length === 0 ? (
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