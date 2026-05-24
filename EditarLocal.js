import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarLocal({ route, navigation }) {
  const address = route.params?.address || "";
  const onSave = route.params?.onSave;

  const [newAddress, setNewAddress] = useState(address);

  function salvarEndereco() {
    if (onSave) {
      onSave(newAddress);
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📍 Novo endereço</Text>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Ionicons name="location" size={22} color="#ff6b00" />

          <TextInput
            style={styles.input}
            multiline
            placeholder="Digite seu endereço completo"
            value={newAddress}
            onChangeText={setNewAddress}
          />
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={salvarEndereco}>
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
    marginBottom: 30,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 80,
  },

  button: {
    backgroundColor: "#ff6b00",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
