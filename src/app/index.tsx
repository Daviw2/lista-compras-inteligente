import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SECOES = ["Mercearia", "Hortifruti", "Carnes", "Limpeza", "Padaria"];

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSection, setSelectedSection] = useState(SECOES[0]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("@lista_compras_v2");
      if (storedItems) setItems(JSON.parse(storedItems));
    } catch (e) {
      console.error(e);
    }
  };

  const saveItems = async (itemsToSave) => {
    try {
      await AsyncStorage.setItem(
        "@lista_compras_v2",
        JSON.stringify(itemsToSave),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const addItem = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Erro", "Preencha o nome e o preço do produto.");
      return;
    }

    const formattedPrice = parseFloat(price.replace(",", "."));
    if (isNaN(formattedPrice) || formattedPrice <= 0) {
      Alert.alert("Erro", "Digite um preço válido.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      price: formattedPrice,
      section: selectedSection,
      inCart: false,
    };

    setItems([...items, newItem]);
    setName("");
    setPrice("");
  };

  const toggleStatus = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalValue = items
    .filter((item) => item.inCart)
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  // Ordena por seção para ficar organizado
  const pendingItems = items
    .filter((item) => !item.inCart)
    .sort((a, b) => a.section.localeCompare(b.section));

  const inCartItems = items
    .filter((item) => item.inCart)
    .sort((a, b) => a.section.localeCompare(b.section));

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemDetails}
        onPress={() => toggleStatus(item.id)}
      >
        <View style={[styles.checkbox, item.inCart && styles.checkboxActive]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemName, item.inCart && styles.itemStrike]}>
            {item.name}
          </Text>
          <View style={styles.itemSubRow}>
            <Text style={styles.sectionBadge}>{item.section}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras Inteligente</Text>
        <Text style={styles.totalText}>Total no Carrinho: R$ {totalValue}</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Ex: Maçã, Sabão..."
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
            placeholder="R$ 0,00"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sectionSelector}
        >
          {SECOES.map((sec) => (
            <TouchableOpacity
              key={sec}
              style={[
                styles.sectionChip,
                selectedSection === sec && styles.sectionChipActive,
              ]}
              onPress={() => setSelectedSection(sec)}
            >
              <Text
                style={[
                  styles.sectionChipText,
                  selectedSection === sec && styles.sectionChipTextActive,
                ]}
              >
                {sec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Pendentes ({pendingItems.length})</Text>
      <FlatList
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum item pendente.</Text>
        }
      />

      <Text style={styles.sectionTitle}>
        No Carrinho ({inCartItems.length})
      </Text>
      <FlatList
        data={inCartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Carrinho vazio.</Text>
        }
      />
    </KeyboardAvoidingView>
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
  totalText: { fontSize: 18, color: "#fff", marginTop: 5, fontWeight: "600" },
  formContainer: { paddingHorizontal: 20, paddingTop: 15 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  sectionSelector: { flexDirection: "row", marginTop: 10, marginBottom: 5 },
  sectionChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
  },
  sectionChipActive: { backgroundColor: "#6200EE" },
  sectionChipText: { color: "#333", fontSize: 13, fontWeight: "500" },
  sectionChipTextActive: { color: "#fff", fontWeight: "bold" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 10,
    color: "#333",
  },
  list: { paddingHorizontal: 20, flex: 1 },
  emptyText: { color: "#999", fontStyle: "italic", marginTop: 5, fontSize: 13 },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    alignItems: "center",
    elevation: 1,
  },
  itemDetails: { flexDirection: "row", alignItems: "center", flex: 1 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6200EE",
    marginRight: 12,
  },
  checkboxActive: { backgroundColor: "#6200EE" },
  itemName: { fontSize: 16, fontWeight: "500", color: "#222" },
  itemStrike: { textDecorationLine: "line-through", color: "#888" },
  itemSubRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  sectionBadge: {
    backgroundColor: "#EDE7F6",
    color: "#6200EE",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  itemPrice: { fontSize: 14, color: "#666", fontWeight: "bold" },
  deleteText: {
    color: "#E53935",
    fontWeight: "bold",
    padding: 8,
    fontSize: 16,
  },
});
