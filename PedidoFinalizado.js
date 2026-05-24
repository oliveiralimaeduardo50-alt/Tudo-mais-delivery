import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PedidoFinalizado({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* emoji confirmado */}
      <Ionicons
        name="checkmark-circle"
        size={120}
        color="#22c55e"
        style={{ alignSelf: "center", marginTop: 80 }}
      />

      {/* mensagem da compra */}
      <Text style={styles.title}>Pedido Finalizado 🎉</Text>

      {/* tempo estimado */}
      <Text style={styles.time}>
        Tempo estimado de entrega: 30 - 45 min
      </Text>

      {/* Mensagem */}
      <Text style={styles.message}>
        Obrigado por comprar em nossa loja ❤️{"\n"}
        Seu pedido já está sendo preparado!
      </Text>

      {/* Botão voltar ao início */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Delivery")}
      >
        <Text style={styles.buttonText}>Voltar ao início</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
  },

  time: {
    color: "#22c55e",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },

  message: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 18,
    borderRadius: 20,
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
