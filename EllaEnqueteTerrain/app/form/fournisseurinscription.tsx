import { useState } from "react";
import { TextInput, Button, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form"; // Importer React Hook Form

export default function FournisseurInscription() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitting(true);
    // Rediriger vers le formulaire du fournisseur
    setTimeout(() => {
      router.push(`/form/fournisseur/${data.companyName}`);
    }, 1000); // Simuler un délai d'inscription
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-2xl font-semibold text-center mb-6 text-gray-700">Inscription du Fournisseur</Text>
      
      <View className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <Text className="text-lg font-medium text-gray-800 mb-4">Informations du Fournisseur</Text>
        
        {/* Nom de l'entreprise */}
        <View className="mb-4">
          <Text className="text-gray-600">Nom de l'entreprise</Text>
          <Controller
            control={control}
            name="companyName"
            rules={{ required: "Le nom de l'entreprise est requis" }}
            render={({ field }) => (
              <TextInput
                className="border-2 border-gray-300 rounded p-2 mt-2 w-full"
                placeholder="Nom de l'entreprise"
                {...field}
              />
            )}
          />
          {errors.companyName && <Text className="text-red-500 text-sm">{errors.companyName.message}</Text>}
        </View>

        {/* Contact Email */}
        <View className="mb-4">
          <Text className="text-gray-600">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "L'email est requis",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Adresse email invalide"
              }
            }}
            render={({ field }) => (
              <TextInput
                className="border-2 border-gray-300 rounded p-2 mt-2 w-full"
                placeholder="Email"
                keyboardType="email-address"
                {...field}
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-sm">{errors.email.message}</Text>}
        </View>

        {/* Contact Téléphone */}
        <View className="mb-4">
          <Text className="text-gray-600">Téléphone</Text>
          <Controller
            control={control}
            name="phone"
            rules={{ required: "Le numéro de téléphone est requis" }}
            render={({ field }) => (
              <TextInput
                className="border-2 border-gray-300 rounded p-2 mt-2 w-full"
                placeholder="Téléphone"
                keyboardType="phone-pad"
                {...field}
              />
            )}
          />
          {errors.phone && <Text className="text-red-500 text-sm">{errors.phone.message}</Text>}
        </View>

        {/* Bouton de soumission */}
        <Button
          title={isSubmitting ? "Enregistrement..." : "S'inscrire"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          color="#0a472e"
        />
      </View>
    </View>
  );
}
