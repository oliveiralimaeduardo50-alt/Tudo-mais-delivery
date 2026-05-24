import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmarEntrega({ route, navigation }) {
  const { address } = route.params;

  return (
    <SafeAreaView style={styles.container}>

    {/* BOTÃO VOLTAR */}
<TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.goBack()}
>
  <Ionicons name="arrow-back" size={26} color="#fff" />
</TouchableOpacity>
      
      {/* Título */}
      <Text style={styles.title}>Confirmar Entrega</Text>

      {/* Endereço */}
      <View style={styles.card}>
        <Ionicons name="location" size={22} color="#22c55e" />
        <Text style={styles.address}>{address}</Text>
      </View>

      {/* Informações */}
      <View style={styles.card}>
        <Text style={styles.info}>Tempo estimado: 30-45 min</Text>
        <Text style={styles.info}>Frete: R$ 9,90</Text>
      </View>

      {/* Botão finalizar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PedidoFinalizado")}
      >
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
  position: "absolute",
  top: 20,
  left: 5,
  zIndex: 10,
},
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  address: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },

  info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
