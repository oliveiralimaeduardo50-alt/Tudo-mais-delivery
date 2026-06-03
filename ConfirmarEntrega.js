import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const metodos = [
  { id: "pix", nome: "Pix", icone: "qr-code-outline" },
  { id: "cartao", nome: "Cartão de Crédito/Débido (App)", icone: "card-outline" },
  { id: "dinheiro", nome: "Dinheiro na Entrega", icone: "cash-outline" },
];


export default function ConfirmarEntrega({ navigation }) {
  const [pagamento, setPagamento] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  
  
  // Estados para o cartão simulado
  const [numCartao, setNumCartao] = useState("");
  const [cvv, setCvv] = useState("");
  

  function tratarBotaoConfirmar() {
    if (!pagamento) {
      Alert.alert("Atenção", "Por favor, selecione uma forma de pagamento antes de continuar!");
      return;
    }

    if (pagamento === "dinheiro") {
      // Dinheiro não precisa de tela de pagamento, vai direto!
      navigation.navigate("PedidoFinalizado");
    } else {
      // Abre a janelinha (modal) para Pix ou Cartão
      setModalVisivel(true);
    }
  }

  function finalizarComSucesso() {
    setModalVisivel(false);
    navigation.navigate("PedidoFinalizado");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSimulado}>
        <Text style={styles.logoSimulada}>TudoMais+</Text>
        <Text style={styles.subtituloSimulado}>Limpeza, Descartáveis e Variedades</Text>
      </View>

      <View style={styles.secaoPagamento}>
        <Text style={styles.tituloSeccion}>💳 Escolha a Forma de Pagamento</Text>
        
        {metodos.map((metodo) => {
          const selecionado = pagamento === metodo.id;
          return (
            
            <TouchableOpacity
              key={metodo.id}
              style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
              onPress={() => setPagamento(metodo.id)}
              activeOpacity={0.7}
            >
              <View style={styles.opcaoEsquerda}>
                <Ionicons 
                  name={metodo.icone} 
                  size={22} 
                  color={selecionado ? "#ff6b00" : "#ffffff"} 
                />
                <Text style={[styles.textoOpcao, selecionado && styles.textoSelecionado]}>
                  {metodo.nome}
                </Text>
              </View>
              
              <View style={[styles.checkCircle, selecionado && styles.checkCircleSelecionado]}>
                {selecionado && <View style={styles.checkInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      

      <TouchableOpacity 
        style={[styles.botaoConfirmar, !pagamento && styles.botaoDesabilitado]} 
        onPress={tratarBotaoConfirmar}
      >
        <Text style={styles.textoBotao}>Confirmar entrega</Text>
      </TouchableOpacity>

      {/* MODAL DE PAGAMENTO SIMULADO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <TouchableOpacity 
              style={styles.botaoFecharModal} 
              onPress={() => setModalVisivel(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            {pagamento === "pix" ? (
              // TELA SIMULADA DO PIX
              <View style={styles.blocoPagamento}>
                <Ionicons name="qr-code" size={80} color="#ff6b00" />
                <Text style={styles.modalTitulo}>Pagamento via Pix</Text>
                <Text style={styles.modalSubtitulo}>Copie o código abaixo para pagar no app do seu banco:</Text>
                
                <View style={styles.boxPix}>
                  <Text style={styles.textoPix} numberOfLines={1}>
                    00020101021226830014br.gov.bcb.pix2561tudomaislimpeza...
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.botaoCopiar}
                  onPress={() => Alert.alert("Copiado!", "Código Pix copiado com sucesso.")}
                >
                  <Ionicons name="copy-outline" size={18} color="#fff" />
                  <Text style={styles.textoBotaoCopiar}>Copiar Código</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoSucessoModal} onPress={finalizarComSucesso}>
                  <Text style={styles.textoBotao}>Já paguei / Confirmar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // TELA SIMULADA DO CARTÃO
              <View style={styles.blocoPagamento}>
                <Ionicons name="card" size={70} color="#ff6b00" />
                <Text style={styles.modalTitulo}>Cartão de Crédito</Text>
                
                <TextInput 
                  style={styles.inputCartao}
                  placeholder="Número do Cartão (xxxx xxxx xxxx xxxx)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={numCartao}
                  onChangeText={setNumCartao}
                />

                <TextInput 
                  style={styles.inputCartao}
                  placeholder="Código de Segurança (CVV)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={3}
                  value={cvv}
                  onChangeText={setCvv}
                />

                <TouchableOpacity style={styles.botaoSucessoModal} onPress={finalizarComSucesso}>
                  <Text style={styles.textoBotao}>Pagar e Finalizar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20, justifyContent: "space-between" },
  headerSimulado: { alignItems: "center", marginTop: 20 },
  logoSimulada: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  subtituloSimulado: { color: "#aaa", fontSize: 12 },
  secaoPagamento: { marginTop: 30, backgroundColor: "#111111", padding: 20, borderRadius: 18 },
  tituloSeccion: { color: "#ffffff", fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  opcao: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#1e1e1e", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "transparent" },
  opcaoSelecionada: { borderColor: "#ff6b00" },
  opcaoEsquerda: { flexDirection: "row", alignItems: "center", gap: 12 },
  textoOpcao: { color: "#ffffff", fontSize: 16 },
  textoSelecionado: { color: "#ff6b00", fontWeight: 'bold' },
  checkCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#fff", justifyContent: "center", alignItems: "center" },
  checkCircleSelecionado: { borderColor: "#ff6b00" },
  checkInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#ff6b00" },
  botaoConfirmar: { backgroundColor: "#ff6b00", padding: 18, borderRadius: 18, alignItems: "center", marginBottom: 20 },
  botaoDesabilitado: { backgroundColor: "#555555" },
  textoBotao: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  
  // ESTILOS DO MODAL
  modalFundo: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "flex-end" },
  modalConteudo: { backgroundColor: "#161616", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 400 },
  botaoFecharModal: { alignSelf: "flex-end", padding: 5 },
  blocoPagamento: { alignItems: "center", width: "100%", marginTop: 10, gap: 15 },
  modalTitulo: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  modalSubtitulo: { color: "#aaa", textAlign: "center", fontSize: 14, paddingHorizontal: 10 },
  boxPix: { backgroundColor: "#222", padding: 12, borderRadius: 8, width: "100%", borderWidth: 1, borderColor: "#333" },
  textoPix: { color: "#00cc66", fontSize: 12 },
  botaoCopiar: { flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: "#333", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  textoBotaoCopiar: { color: "#fff", fontSize: 14, fontWeight: "600" },
  botaoSucessoModal: { backgroundColor: "#00cc66", padding: 16, borderRadius: 18, width: "100%", alignItems: "center", marginTop: 15 },
  inputCartao: { backgroundColor: "#222", color: "#fff", width: "100%", padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: "#333" }
});
