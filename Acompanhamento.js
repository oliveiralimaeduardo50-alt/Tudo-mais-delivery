import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const passos = [
  { titulo: "Pedido Recebido", sub: "A loja TudoMais+ já aceitou o seu pedido.", icone: "receipt-outline" },
  { titulo: "Preparando Produtos", sub: "Estamos embalando seus itens de limpeza.", icone: "cube-outline" },
  { titulo: "Rota de Entrega", sub: "O motoqueiro acabou de sair com o seu pedido!", icone: "bicycle-outline" },
  { titulo: "Pedido Entregue", sub: "Produtos entregues com sucesso. Obrigado!", icone: "home-outline" }
];

export default function Acompanhamento({ navigation }) {
  const [passoAtual, setPassoAtual] = useState(0);

  useEffect(() => {
    // Cria um temporizador que muda o status do pedido sozinho a cada 5 segundos
    if (passoAtual < passos.length - 1) {
      const timer = setTimeout(() => {
        setPassoAtual(prev => prev + 1);
      }, 15000); 

      return () => clearTimeout(timer);
    }
  }, [passoAtual]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloTela}>Status do Pedido 📦</Text>
        {passoAtual < passos.length - 1 && (
          <ActivityIndicator color="#ff6b00" style={{ marginTop: 5 }} />
        )}
      </View>

      <View style={styles.timeline}>
        {passos.map((passo, index) => {
          const ativo = index <= passoAtual;
          const destaque = index === passoAtual;

          return (
            <View key={index} style={styles.passoContainer}>
              {/* Esquerda: Linha e Círculo com Ícone */}
              <View style={styles.colunaEsquerda}>
                <View style={[styles.circulo, ativo ? styles.circuloAtivo : styles.circuloInativo]}>
                  <Ionicons 
                    name={passo.icone} 
                    size={18} 
                    color={destaque ? "#000" : ativo ? "#00cc66" : "#666"} 
                  />
                </View>
                {index < passos.length - 1 && (
                  <View style={[styles.linha, index < passoAtual ? styles.linhaAtiva : styles.linhaInativa]} />
                )}
              </View>

              {/* Direita: Textos descritivos */}
              <View style={styles.colunaDireita}>
                <Text style={[styles.tituloPasso, destaque ? styles.textoDestaque : ativo ? styles.textoAtivo : styles.textoInativo]}>
                  {passo.titulo}
                </Text>
                <Text style={[styles.subPasso, ativo ? styles.subAtivo : styles.textoInativo]}>
                  {passo.sub}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Botão para voltar lá pro começo do app */}
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => navigation.navigate("Delivery")}
      >
        <Text style={styles.textoBotao}>Voltar para o Início</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 25, justifyContent: "space-between" },
  header: { alignItems: "center", marginTop: 20 },
  tituloTela: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  timeline: { marginTop: 40, flex: 1, paddingHorizontal: 10 },
  passoContainer: { flexDirection: "row", minHeight: 80 },
  colunaEsquerda: { alignItems: "center", marginRight: 15 },
  circulo: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 2 },
  circuloAtivo: { backgroundColor: "#00cc66", borderColor: "#00cc66" },
  circuloInativo: { backgroundColor: "#111", borderColor: "#444" },
  linha: { width: 2, flex: 1, my: 2 },
  linhaAtiva: { backgroundColor: "#00cc66" },
  linhaInativa: { backgroundColor: "#444" },
  colunaDireita: { flex: 1, paddingTop: 4 },
  tituloPasso: { fontSize: 16, fontWeight: "bold" },
  textoDestaque: { color: "#ff6b00" }, // Laranja no passo que está acontecendo agora
  textoAtivo: { color: "#00cc66" },     // Verde nos passos que já passaram
  textoInativo: { color: "#555" },       // Cinza apagado no que ainda vai acontecer
  subPasso: { fontSize: 13, marginTop: 4 },
  subAtivo: { color: "#aaa" },
  botaoVoltar: { backgroundColor: "#111", padding: 18, borderRadius: 18, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "#333" },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
