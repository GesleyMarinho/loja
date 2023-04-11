import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as SQLite from "expo-sqlite";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

const db = SQLite.openDatabase(
  { name: "loja.db" },
  console.log("banco de dados criado com sucesso!")
);
export default function App() {
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [referencia, setReferencia] = useState("");

  const createTable = () => {
    return (
      "CREATE TABLE IF NOT EXISTS " +
        "CLIENTES " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT,NOME TEXT, TELEFONE INTEGER, RUA TEXT,NUMERO INTEGER,BAIRRO TEXT,REFERENCIA TEXT);",
      console.log("tabela criada com sucesso")
    );
  };

  const salvarCadastro = async () => {
    console.log(nome, telefone, rua, numero, bairro, referencia);

    if (
      nome == "" ||
      rua == "" ||
      telefone == "" ||
      bairro == "" ||
      referencia == "" ||
      numero == ""
    ) {
      alert("Alerta! Você deixou algum dos campos vázios!");
    } else {
      try {
        await db.transaction(async (tx) => {
          await tx.executeSql(createTable());
          await tx.executeSql(
            "INSERT INTO CLIENTES (nome, telefone, rua, numero, bairro, referencia) VALUES (?, ?, ?, ?, ?, ?)",
            [nome, telefone, rua, numero, bairro, referencia],
            console.log("Dados Inseridos com Sucesso")
          );
        });
      } catch (error) {
        console.log("Erro ao inserir o cliente: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}> Telefone </Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.label}>Rua</Text>
        <TextInput style={styles.input} value={rua} onChangeText={setRua} />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
        />

        <Text style={styles.label}>Referencia</Text>
        <TextInput
          style={styles.input}
          value={referencia}
          onChangeText={setReferencia}
        />

        <TouchableOpacity
          style={styles.salvarCadastrar}
          onPress={() => salvarCadastro()}
        >
          <Text style={styles.salvar}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 20,
    backgroundColor: "#fff",
  },
  salvarCadastrar: {
    marginTop: 15,
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  salvar: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  inputNumero: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 10,
    width: "30%",
  },
});