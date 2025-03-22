import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";


const questions = [
  {
    id: 1,
    question: "Quel type de commerce gérez-vous ?",
    options: ["Marché traditionnel", "Supermarché", "Boucherie spécialisée", "Vente en ligne", "Autre (préciser)"],
  },
  {
    id: 2,
    question: "Depuis combien de temps vendez-vous du poulet ?",
    options: ["Moins d’un an", "1 à 3 ans", "Plus de 3 ans"],
  },
  {
    id: 3,
    question: "Quelle quantité de poulets vendez-vous chaque jour en moyenne ?",
    options: ["Moins de 10", "10 à 20", "21 à 50", "Plus de 50"],
  },
  {
    id: 4,
    question: "Quel type de poulet vendez-vous principalement ?",
    options: ["Local", "Importé", "Les deux"],
  },
  {
    id: 5,
    question: "Quel format de poulet est le plus vendu dans votre commerce ?",
    options: ["Poulet entier", "Poulet vidé prêt à cuire", "Poulet découpé (filets, cuisses, ailes)"],
  },
  {
    id: 6,
    question: "Où achetez-vous principalement vos poulets ?",
    options: ["Producteurs locaux", "Grossistes", "Importateurs", "Autre (préciser)"],
  },
  {
    id: 7,
    question: "À quelle fréquence passez-vous vos commandes ?",
    options: ["Tous les jours", "2 à 3 fois par semaine", "Une fois par semaine", "Moins d’une fois par semaine"],
  },
  {
    id: 8,
    question: "Avez-vous un fournisseur attitré ?",
    options: ["Oui", "Non"],
  },
  {
    id: 9,
    question: "Quels sont vos critères principaux pour choisir un fournisseur ?",
    options: ["Prix", "Régularité de l’approvisionnement", "Qualité du poulet", "Service de livraison"],
  },
  {
    id: 10,
    question: "Quel délai de livraison vous conviendrait le mieux ?",
    options: ["Moins de 2 heures", "2 à 6 heures", "Livraison programmée la veille"],
  },
  {
    id: 11,
    question: "Comment stockez-vous vos poulets avant la vente ?",
    options: ["Congélateur", "Réfrigérateur", "Glace / Glacière", "Pas de stockage, vente immédiate"],
  },
  {
    id: 12,
    question: "Quelle est la durée moyenne de stockage avant la vente ?",
    options: ["Moins de 24h", "2 à 3 jours", "4 à 7 jours", "Plus d’une semaine"],
  },
  {
    id: 13,
    question: "Avez-vous rencontré des problèmes de conservation du poulet ?",
    options: ["Oui", "Non"],
  },
  {
    id: 14,
    question: "Quelles sont vos attentes en termes de qualité du poulet ?",
    options: ["Chair tendre", "Bonne conservation", "Moins de gras", "Odeur agréable"],
  },
  {
    id: 15,
    question: "Préférez-vous recevoir des poulets emballés sous vide ou en vrac ?",
    options: ["Sous vide", "En vrac", "Indifférent"],
  },
  {
    id: 16,
    question: "Vos clients préfèrent-ils le poulet local ou importé ?",
    options: ["Local", "Importé", "Indifférent"],
  },
  {
    id: 17,
    question: "Quels formats de poulet sont les plus achetés par vos clients ?",
    options: ["Poulet entier", "Poulet vidé prêt à cuire", "Poulet découpé (filets, cuisses, ailes)"],
  },
  {
    id: 18,
    question: "Vos clients posent-ils des questions sur la provenance du poulet ?",
    options: ["Oui, souvent", "Oui, parfois", "Non"],
  },
  {
    id: 19,
    question: "Quel est l’argument de vente le plus important pour vos clients ?",
    options: ["Prix", "Qualité / fraîcheur", "Origine locale", "Format du produit"],
  },
  {
    id: 20,
    question: "Avez-vous remarqué une évolution des habitudes de consommation des clients ces dernières années ?",
    options: ["Oui, plus de demande pour le local", "Oui, plus de demande pour l’importé", "Non, la demande reste stable"],
  },
  {
    id: 21,
    question: "Quel est votre prix de vente moyen par poulet ?",
    options: ["Moins de 50 000 GNF", "50 000 - 70 000 GNF", "Plus de 70 000 GNF"],
  },
  {
    id: 22,
    question: "Quel est votre prix d’achat moyen par poulet ?",
    options: ["Moins de 40 000 GNF", "40 000 - 60 000 GNF", "Plus de 60 000 GNF"],
  },
  {
    id: 23,
    question: "Quel est votre niveau de marge sur chaque poulet vendu ?",
    options: ["Moins de 5 000 GNF", "5 000 - 10 000 GNF", "Plus de 10 000 GNF"],
  },
  {
    id: 24,
    question: "Avez-vous observé des fluctuations importantes des prix ces derniers mois ?",
    options: ["Oui", "Non"],
  },
  {
    id: 25,
    question: "Quels sont les principaux facteurs qui influencent les prix du poulet sur le marché ?",
    options: ["Coût des aliments pour volaille", "Saison et demande fluctuante", "Taxes et coûts d’importation", "Autre (préciser)"],
  },
  {
    id: 26,
    question: "Comment évaluez-vous votre expérience avec vos fournisseurs actuels ?",
    options: ["Très satisfait(e)", "Assez satisfait(e)", "Peu satisfait(e)", "Pas du tout satisfait(e)"],
  },
  {
    id: 27,
    question: "Quels sont les problèmes les plus fréquents rencontrés avec vos fournisseurs ?",
    options: ["Qualité variable", "Rupture de stock fréquente", "Retards de livraison", "Prix instables"],
  },
  {
    id: 28,
    question: "Êtes-vous intéressé(e) par un fournisseur exclusif de poulet local de qualité ?",
    options: ["Oui", "Non", "Peut-être"],
  },
  {
    id: 29,
    question: "Seriez-vous prêt(e) à signer un contrat d’approvisionnement avec un producteur local ?",
    options: ["Oui", "Non", "À voir selon les conditions"],
  },
  {
    id: 30,
    question: "Quel volume de poulets pourriez-vous acheter par semaine si l’offre locale répondait à vos attentes ?",
    options: ["Moins de 20", "20 à 50", "50 à 100", "Plus de 100"],
  },
  {
    id: 31,
    question: "Seriez-vous intéressé(e) par un programme de fidélité avec des producteurs locaux ?",
    options: [],
  },
  {
    id: 32,
    question: "Quel soutien attendez-vous des producteurs pour améliorer votre activité ?",
    options: [],
  },
  {
    id: 33,
    question: "Quelles actions les producteurs locaux pourraient-ils entreprendre pour mieux répondre à vos besoins ?",
    options: [],
  },
  {
    id: 34,
    question: "Que faudrait-il améliorer dans l’offre de poulet local pour le rendre plus compétitif ?",
    options: [],
  },
  {
    id: 35,
    question: "Souhaitez-vous voir plus de promotions et réductions sur le poulet local ?",
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
      <Text style={styles.title}>Enquête Distributeurs et Marchands</Text>
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