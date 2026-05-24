import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Inicio({ navigation }) {
  const [address, setAddress] = useState(
    "Conjuto, B\nTaguatinga - DF"
  );

  return (
    <View style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* ✅ LOGO NO TOPO */}
<View style={styles.logoContainer}>
  <Image
    source={require("../logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />
</View>

        <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingTop: 100 }}
    >
          {/* CARD ENDEREÇO */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.icon}>
                <Ionicons name="location" size={22} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Entregar em</Text>
                <Text style={styles.address}>{address}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.changeButton}
              onPress={() =>
                navigation.navigate("EditarEndereco", {
                  address,
                  onSave: (novoEndereco) => setAddress(novoEndereco),
                })
              }
            >
              <Text style={styles.changeText}>Alterar endereço</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color="#ff6b00" />
            <Text style={styles.infoText}>
              Entrega estimada: 30-45 min
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="bicycle-outline" size={20} color="#ff6b00" />
            <Text style={styles.infoText}>
              Frete: R$ 9,90 - 12,90
            </Text>
          </View>

          <TouchableOpacity
  style={styles.confirmButton}
  onPress={() =>
    navigation.navigate("ConfirmarEntrega", {
      address,
    })
  }
>
            <Text style={styles.confirmText}>Confirmar entrega</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
    borderWidth: 8,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 120,
    marginBottom:0,
  },

  logo: {
    width: 250,
    height: 200,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  icon: {
    backgroundColor: "#FF0000",
    padding: 12,
    borderRadius: 14,
  },

  label: {
    fontSize: 13,
    color: "#888",
  },

  address: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },

  changeButton: {
    marginTop: 15,
    backgroundColor: "#fff3ea",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  changeText: {
    color: "#ff6b00",
    fontWeight: "bold",
  },

  infoCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    elevation: 3,
  },

  infoText: {
    fontSize: 15,
    fontWeight: "600",
  },

  confirmButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "#ff6b00",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
