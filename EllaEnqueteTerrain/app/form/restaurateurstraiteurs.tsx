import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const questions = [
    {
      id: 1,
      question: "Quel type d’établissement dirigez-vous ?",
      options: ["Restaurant", "Fast-food", "Maquis / Choukouya", "Hôtel", "Cantine scolaire / d’entreprise", "Traiteur"],
    },
    {
      id: 2,
      question: "Depuis combien de temps votre établissement est-il en activité ?",
      options: [],
    },
    {
      id: 3,
      question: "Combien de clients servez-vous en moyenne par jour ?",
      options: [],
    },
    {
      id: 4,
      question: "Combien de poulets achetez-vous en moyenne par jour ?",
      options: [],
    },
    {
      id: 5,
      question: "À quelle fréquence passez-vous commande pour du poulet ?",
      options: ["Tous les jours", "Plusieurs fois par semaine", "Une fois par semaine", "Moins d’une fois par semaine"],
    },
    {
      id: 6,
      question: "Où achetez-vous actuellement vos poulets ?",
      options: ["Marché local", "Fournisseur direct", "Grossiste", "Importateur"],
    },
    {
      id: 7,
      question: "Préférez-vous acheter du poulet local ou importé ? Pourquoi ?",
      options: [],
    },
    {
      id: 8,
      question: "Quel type de poulet préférez-vous acheter ?",
      options: ["Poulet entier", "Poulet vidé prêt à cuire", "Poulet découpé (cuisses, ailes, filets)"],
    },
    {
      id: 9,
      question: "Quel est le poids idéal d’un poulet pour votre activité ?",
      options: ["Petit (1 - 1,2 kg)", "Moyen (1,3 - 1,5 kg)", "Grand (+1,6 kg)"],
    },
    {
      id: 10,
      question: "Achetez-vous du poulet frais ou congelé ? Pourquoi ?",
      options: [],
    },
    {
      id: 11,
      question: "Quelles sont vos exigences en matière de qualité du poulet ?",
      options: ["Chair tendre", "Bonne conservation", "Saveur naturelle"],
    },
    {
      id: 12,
      question: "À quel moment de la journée préférez-vous être livré(e) ?",
      options: ["Matin", "Après-midi", "Soir"],
    },
    {
      id: 13,
      question: "Quelle est votre principale contrainte pour acheter du poulet local ?",
      options: ["Prix", "Disponibilité", "Fraîcheur", "Poids du poulet", "Autre (préciser)"],
    },
    {
      id: 14,
      question: "Selon vous, le prix actuel du poulet local est-il :",
      options: ["Trop cher", "Raisonnable", "Pas assez cher (si la qualité est améliorée)"],
    },
    {
      id: 15,
      question: "Si la qualité était garantie, accepteriez-vous de payer un peu plus cher pour du poulet local ?",
      options: ["Oui", "Non", "Peut-être"],
    },
    {
      id: 16,
      question: "Comment jugez-vous la qualité du poulet local actuellement sur le marché ?",
      options: ["Excellente", "Bonne", "Moyenne", "Mauvaise"],
    },
    {
      id: 17,
      question: "Quelles améliorations souhaitez-vous voir dans le poulet local ?",
      options: ["Meilleure texture", "Goût plus prononcé", "Moins de gras", "Conservation plus longue"],
    },
    {
      id: 18,
      question: "Avez-vous déjà rencontré des problèmes de qualité avec le poulet local ?",
      options: ["Oui (préciser)", "Non"],
    },
    {
      id: 19,
      question: "Comment stockez-vous vos poulets actuellement ?",
      options: ["Réfrigérateur", "Congélateur", "Glace / Glacière", "Pas de stockage (achat quotidien)"],
    },
    {
      id: 20,
      question: "Quelle est votre durée moyenne de stockage avant cuisson ?",
      options: ["Moins de 24h", "2 à 3 jours", "4 à 7 jours", "Plus d’une semaine"],
    },
    {
      id: 21,
      question: "Avez-vous déjà eu des pertes de poulets à cause d’un mauvais stockage ?",
      options: ["Oui", "Non"],
    },
    {
      id: 22,
      question: "Préférez-vous recevoir des poulets emballés sous vide ou en vrac ?",
      options: ["Sous vide", "En vrac", "Indifférent"],
    },
    {
      id: 23,
      question: "Qui s’occupe de l’achat du poulet dans votre établissement ?",
      options: ["Moi-même", "Mon cuisinier", "Un employé dédié", "Autre (préciser)"],
    },
    {
      id: 24,
      question: "Quelle est la distance entre votre établissement et votre point d’approvisionnement ?",
      options: ["Moins de 5 km", "5 - 10 km", "Plus de 10 km"],
    },
    {
      id: 25,
      question: "Faites-vous appel à un fournisseur qui vous livre directement ?",
      options: ["Oui", "Non"],
    },
    {
      id: 26,
      question: "Quel délai de livraison vous conviendrait le mieux ?",
      options: ["Moins de 2 heures", "Moins de 6 heures", "Livraison programmée la veille"],
    },
    {
      id: 27,
      question: "Avez-vous déjà eu des problèmes de retard ou d’annulation de livraison ?",
      options: ["Oui", "Non"],
    },
    {
      id: 28,
      question: "Comment évaluez-vous votre expérience avec vos fournisseurs actuels ?",
      options: ["Très satisfait(e)", "Assez satisfait(e)", "Peu satisfait(e)", "Pas du tout satisfait(e)"],
    },
    {
      id: 29,
      question: "Quels sont les problèmes les plus fréquents rencontrés avec vos fournisseurs ?",
      options: ["Qualité variable", "Rupture de stock fréquente", "Retards de livraison", "Prix fluctuants"],
    },
    {
      id: 30,
      question: "Êtes-vous intéressé(e) par un fournisseur exclusif de poulet local de qualité ?",
      options: ["Oui", "Non", "Peut-être"],
    },
    {
      id: 31,
      question: "Êtes-vous prêt(e) à signer un contrat d’approvisionnement avec un fournisseur local ?",
      options: ["Oui", "Non", "À voir selon les conditions"],
    },
    {
      id: 32,
      question: "Vos clients demandent-ils du poulet local spécifiquement ?",
      options: ["Oui", "Non"],
    },
    {
      id: 33,
      question: "Proposez-vous du poulet local sur votre menu ?",
      options: ["Oui", "Non"],
    },
    {
      id: 34,
      question: "Avez-vous remarqué une tendance des clients à privilégier des produits locaux ?",
      options: ["Oui", "Non"],
    },
    {
      id: 35,
      question: "Quel type de plat à base de poulet est le plus commandé dans votre établissement ?",
      options: ["Choukouya", "Poulet braisé", "Poulet en sauce", "Poulet frit"],
    },
    {
      id: 36,
      question: "Seriez-vous intéressé(e) par un service de livraison automatisé de poulet local ?",
      options: [],
    },
    {
      id: 37,
      question: "Quelles attentes avez-vous envers un fournisseur de poulet local ?",
      options: [],
    },
    {
      id: 38,
      question: "Quel est votre principal frein à l’achat de poulet local ?",
      options: [],
    },
    {
      id: 39,
      question: "Comment les producteurs locaux pourraient-ils mieux répondre aux besoins des restaurateurs ?",
      options: [],
    },
    {
      id: 40,
      question: "Quelles améliorations attendez-vous dans la filière du poulet local ?",
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
      <Text style={styles.title}>Enquête Restaurateurs</Text>
      <View style={styles.form}>


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