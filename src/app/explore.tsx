import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o Projeto</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lista de Compras Inteligente</Text>
        <Text style={styles.text}>
          Aplicativo multiplataforma desenvolvido para gerenciamento de compras
          de supermercado em tempo real.
        </Text>

        <Text style={styles.sectionTitle}>Tecnologias Utilizadas:</Text>
        <Text style={styles.bullet}>• React Native & Expo SDK</Text>
        <Text style={styles.bullet}>• Expo Router (Navegação em Abas)</Text>
        <Text style={styles.bullet}>• AsyncStorage (Persistência Local)</Text>
        <Text style={styles.bullet}>• React Hooks (useState / useEffect)</Text>

        <Text style={styles.sectionTitle}>Funcionalidades:</Text>
        <Text style={styles.bullet}>• Categorização por seções do mercado</Text>
        <Text style={styles.bullet}>• Cálculo automático do carrinho</Text>
        <Text style={styles.bullet}>• Salvamento offline no dispositivo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 40 },
  header: {
    padding: 20,
    backgroundColor: "#6200EE",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  text: { fontSize: 14, color: "#555", lineHeight: 20 },
  bullet: { fontSize: 14, color: "#444", marginTop: 4, fontWeight: "500" },
});
