import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";


const questions = [
    {
      id: 1,
      question: "Quel type de service ou produit fournissez-vous pour la filière avicole ?",
      options: [
        "Aliments pour volailles",
        "Vaccins et médicaments vétérinaires",
        "Matériel d’élevage (couveuses, abreuvoirs, cages)",
        "Transport et logistique",
        "Abattage et transformation",
        "Autre (préciser)",
      ],
    },
    {
      id: 2,
      question: "Depuis combien de temps êtes-vous actif sur le marché avicole ?",
      options: ["Moins d’un an", "1 à 3 ans", "Plus de 3 ans"],
    },
    {
      id: 3,
      question: "Travaillez-vous principalement avec des producteurs locaux ou des importateurs ?",
      options: ["Producteurs locaux", "Importateurs", "Les deux"],
    },
    {
      id: 4,
      question: "Quels types de clients servez-vous principalement ?",
      options: [
        "Petits éleveurs",
        "Élevages industriels",
        "Marchands et distributeurs",
        "Restaurants et traiteurs",
      ],
    },
    {
      id: 5,
      question: "Quelle est la taille moyenne de vos commandes ?",
      options: [
        "Petites quantités (clients individuels)",
        "Moyennes quantités (coopératives, groupements)",
        "Grosses commandes (élevages industriels)",
      ],
    },
    {
      id: 6,
      question: "Où vous approvisionnez-vous pour vos produits ou services ?",
      options: ["Fabricants locaux", "Importation", "Production propre"],
    },
    {
      id: 7,
      question: "Quels sont les principaux défis liés à l’approvisionnement de vos produits ?",
      options: [
        "Coût élevé des matières premières",
        "Délais de livraison longs",
        "Fluctuation des prix",
        "Qualité variable des produits",
      ],
    },
    {
      id: 8,
      question: "Quelle est votre principale contrainte logistique ?",
      options: ["Stockage", "Transport", "Coût de la distribution"],
    },
    {
      id: 9,
      question: "Livrez-vous directement aux clients ou travaillez-vous avec des distributeurs intermédiaires ?",
      options: ["Livraison directe aux clients", "Utilisation de distributeurs"],
    },
    {
      id: 10,
      question: "Quel est votre rayon de livraison ?",
      options: ["Moins de 50 km", "50 à 100 km", "Plus de 100 km"],
    },
    {
      id: 11,
      question: "Comment fixez-vous vos prix ?",
      options: [
        "En fonction des coûts d’importation",
        "En fonction de la demande locale",
        "Basé sur la concurrence",
      ],
    },
    {
      id: 12,
      question: "Vos prix ont-ils augmenté ces 12 derniers mois ?",
      options: ["Oui, fortement", "Oui, légèrement", "Non"],
    },
    {
      id: 13,
      question: "Quelles sont les raisons principales de la hausse des prix ?",
      options: [
        "Augmentation du coût des matières premières",
        "Hausse des taxes et frais d’importation",
        "Pénuries de produits",
      ],
    },
    {
      id: 14,
      question: "Offrez-vous des facilités de paiement à vos clients ?",
      options: ["Oui, paiement différé", "Oui, crédit fournisseur", "Non"],
    },
    {
      id: 15,
      question: "Quels sont les principaux coûts qui impactent votre rentabilité ?",
      options: [
        "Stockage",
        "Transport",
        "Coût des matières premières",
        "Taxes et réglementation",
      ],
    },
    {
      id: 16,
      question: "Comment garantissez-vous la qualité de vos produits/services ?",
      options: [],
    },
    {
      id: 17,
      question: "Vos produits respectent-ils les normes sanitaires locales et internationales ?",
      options: ["Oui", "Non", "Partiellement"],
    },
    {
      id: 18,
      question: "Offrez-vous des garanties sur vos produits ?",
      options: ["Oui", "Non"],
    },
    {
      id: 19,
      question: "Quels sont les principaux problèmes rencontrés en matière de qualité ?",
      options: ["Produits périmés", "Manque de certification", "Réclamations clients"],
    },
    {
      id: 20,
      question: "Comment gérez-vous les retours et réclamations des clients ?",
      options: [
        "Remboursement",
        "Remplacement des produits défectueux",
        "Aucun retour accepté",
      ],
    },
    {
      id: 21,
      question: "Comment décrivez-vous votre relation avec les éleveurs locaux ?",
      options: ["Très bonne", "Bonne", "Moyenne", "Mauvaise"],
    },
    {
      id: 22,
      question: "Quelles sont les principales difficultés de collaboration avec les producteurs locaux ?",
      options: [
        "Manque de structuration",
        "Faible capacité de production",
        "Paiements irréguliers",
      ],
    },
    {
      id: 23,
      question: "Quels types d’accompagnement proposez-vous aux éleveurs ?",
      options: ["Formation", "Suivi technique", "Aucun"],
    },
    {
      id: 24,
      question: "Avez-vous des contrats à long terme avec vos clients ?",
      options: ["Oui", "Non"],
    },
    {
      id: 25,
      question: "Quels sont les critères pour établir un partenariat avec un éleveur ou distributeur ?",
      options: [],
    },
    {
      id: 26,
      question: "Utilisez-vous des outils numériques pour la gestion de votre activité ?",
      options: ["Oui", "Non"],
    },
    {
      id: 27,
      question: "Quels types de technologies pourraient améliorer votre activité ?",
      options: [
        "Logiciels de gestion de stock",
        "Paiement digitalisé",
        "Traçabilité des produits",
      ],
    },
    {
      id: 28,
      question: "Seriez-vous intéressé par des plateformes en ligne pour vendre vos produits ?",
      options: ["Oui", "Non"],
    },
    {
      id: 29,
      question: "Avez-vous investi dans des solutions écologiques (emballages biodégradables, réduction des déchets) ?",
      options: ["Oui", "Non"],
    },
    {
      id: 30,
      question: "Quel type d’innovation attendez-vous dans la filière avicole ?",
      options: [],
    },
    {
      id: 31,
      question: "Selon vous, quel est le principal défi du secteur avicole en Guinée ?",
      options: [],
    },
    {
      id: 32,
      question: "Que faudrait-il améliorer pour renforcer la production locale de poulet ?",
      options: [],
    },
    {
      id: 33,
      question: "Avez-vous des suggestions pour optimiser la distribution du poulet local ?",
      options: [],
    },
    {
      id: 34,
      question: "Quelles attentes avez-vous envers le gouvernement pour soutenir votre activité ?",
      options: [],
    },
    {
      id: 35,
      question: "Êtes-vous favorable à des coopérations entre fournisseurs pour améliorer la chaîne d’approvisionnement ?",
      options: [],
    },
    {
      id: 36,
      question: "Seriez-vous intéressé par des formations sur les nouvelles tendances du secteur ?",
      options: [],
    },
    {
      id: 37,
      question: "Pensez-vous que la demande pour le poulet local va augmenter dans les prochaines années ?",
      options: [],
    },
    {
      id: 38,
      question: "Quels sont les principaux facteurs qui influencent cette tendance ?",
      options: [],
    },
    {
      id: 39,
      question: "Quelle opportunité commerciale souhaiteriez-vous explorer dans ce secteur ?",
      options: [],
    },
    {
      id: 40,
      question: "Accepteriez-vous de travailler avec un groupement d’éleveurs pour garantir un approvisionnement régulier ?",
      options: [],
    },
    {
      id: 41,
      question: "Quels sont les critères essentiels pour fidéliser vos clients ?",
      options: [],
    },
    {
      id: 42,
      question: "Offrez-vous des avantages aux clients réguliers ?",
      options: [],
    },
    {
      id: 43,
      question: "Quelles améliorations attendez-vous dans la logistique et l’organisation du marché ?",
      options: [],
    },
    {
      id: 44,
      question: "Quels types d’accords commerciaux seraient avantageux pour votre activité ?",
      options: [],
    },
    {
      id: 45,
      question: "Quelle est votre plus grande difficulté pour développer votre entreprise ?",
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
      <Text style={styles.title}>Enquête Distributeurs et Marchands</Text>
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