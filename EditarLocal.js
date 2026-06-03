import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarLocal({ route, navigation }) {
  const address = route.params?.address || "";
  const onSave = route.params?.onSave;

  const [cep, setCep] = useState("");
  const [newAddress, setNewAddress] = useState(address);
  const [loading, setLoading] = useState(false); // Para mostrar um carregamento enquanto busca o CEP

  // Função que busca o CEP na API do ViaCEP
  async function buscarCep(text) {
    setCep(text);

    // Quando o usuário digitar os 8 números do CEP, dispara a busca automaticamente
    if (text.replace(/\D/g, "").length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${text}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert("Erro", "CEP não encontrado. Digite o endereço manualmente.");
        } else {
          // Preenche o campo de endereço com o que a API retornou
          setNewAddress(`${data.logradouro}, - ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível conectar ao serviço de CEP.");
      } finally {
        setLoading(false);
      }
    }
  }

  function salvarEndereco() {
    if (onSave) {
      onSave(newAddress);
    }
    navigation.goBack();
  }

  // Verifica se o endereço está vazio para desabilitar o botão
  const isButtonDisabled = !newAddress.trim();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📍 Novo endereço</Text>

      {/* CARD DE BUSCA POR CEP */}
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Ionicons name="search" size={22} color="#ff6b00" />
          <TextInput
            style={[styles.input, { minHeight: 40 }]}
            placeholder="Digite seu CEP (Ex: 72210000)"
            value={cep}
            onChangeText={buscarCep}
            keyboardType="numeric"
            maxLength={8}
          />
          {loading && <ActivityIndicator color="#ff6b00" />}
        </View>
      </View>

      {/* CARD DO ENDEREÇO COMPLETO */}
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Ionicons name="location" size={22} color="#ff6b00" />
          <TextInput
            style={styles.input}
            multiline
            placeholder="O endereço aparecerá aqui. Adicione o número da casa/apto."
            value={newAddress}
            onChangeText={setNewAddress}
          />
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity 
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]} 
        onPress={salvarEndereco}
        disabled={isButtonDisabled}
      >
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.buttonText}>Salvar Endereço</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20, // Diminuído um pouco para caber os dois cards melhor
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center", // Mudado para center para alinhar com o loader do CEP
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 50,
  },

  button: {
    backgroundColor: "#ff6b00",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  buttonDisabled: {
    backgroundColor: "#ccc", // Fica cinza quando desativado
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
