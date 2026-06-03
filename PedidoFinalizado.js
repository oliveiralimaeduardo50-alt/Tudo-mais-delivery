import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PedidoFinalizado({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={100} color="#00cc66" />
        
        <Text style={styles.titulo}>Pedido Finalizado! 🎉</Text>
        <Text style={styles.subtitulo}>Tempo estimado de entrega: 30 - 45 min</Text>
        <Text style={styles.agradecimento}>
          Obrigado por comprar na TudoMais+ ❤️{"\n"}Seu pedido já está sendo preparado!
        </Text>
      </View>

      {/* Mudamos o botão para levar à tela de acompanhamento */}
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate("Acompanhamento")} 
      >
        <Text style={styles.textoBotao}>Acompanhar Pedido 🚚</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20, justifyContent: "space-between" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", gap: 15 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  subtitulo: { color: "#00cc66", fontSize: 16, fontWeight: "600" },
  agradecimento: { color: "#fff", textAlign: "center", fontSize: 14, lineHeight: 20 },
  botao: { backgroundColor: "#ff6b00", padding: 18, borderRadius: 18, alignItems: "center", marginBottom: 20 },
  textoBotao: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
