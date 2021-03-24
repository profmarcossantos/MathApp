import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground } from 'react-native';

const App = () => {
  //states servem para chamar a renderização do componente
  // useState trabalha com dois valores
  // variável e outro é a função que altera a variável
  const [valor1, setValor1] = useState(0)
  const [valor2, setValor2] = useState(0)
  const [operacao, setOperacao] = useState("+")
  const [resultado, setResultado] = useState('')
  const [formula, setFormula] = useState('')
  const [mensagem, setMensagem] = useState("")
  const [erros, setErros] = useState(0)
  const [acertos, setAcertos] = useState(0)


  // Arrow Function = Função Normal
  const sortearNumero = () => {
    setResultado("")
    let sorteio = parseInt(Math.random() * 10)
    setValor1(sorteio)
    sorteio = parseInt(Math.random() * 10)
    setValor2(sorteio)
    sortearOperacao()
  }

  const sortearOperacao = () => {
    //let operacoes = ["+", "-", "*", "/"]
    let sorteio = parseInt(Math.random() * 4)
    //setOperacao(operacoes[sorteio])

    if (sorteio === 0) setOperacao("+")
    else if (sorteio === 1) setOperacao("-")
    else if (sorteio === 2) setOperacao("*")
    else if (sorteio === 3) setOperacao("/")

  }

  const corrigir = () => {
    let correto = 0
    if (operacao === "+")
      correto = valor1 + valor2
    else if (operacao === "-")
      correto = valor1 - valor2
    else if (operacao === "*")
      correto = valor1 * valor2
    else if (operacao === "/")
      correto = valor1 / valor2

    setFormula(`${valor1} ${operacao} ${valor2} = ${correto}`)
    if (correto == resultado) {
      setMensagem("Acertou....")
      setAcertos(acertos + 1)
    } else {
      setMensagem("Errou....")
      setErros(erros + 1)
    }

    sortearNumero()

  }


  // método construtor (+ou-) , executa na abertura da view
  useLayoutEffect(() => {
    console.log("Inicializando a View....")
    sortearNumero()


  }, [])


  // toda vez que houver uma mudança de state será executado o return!
  return (
    <ImageBackground source={require("./assets/background.png")} style={{ width: "100%", height: "100%" }} >
      <View style={styles.container}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ fontSize: 30 }}>Aprenda a Calcular!</Text>
        </View>
        <View style={{ backgroundColor: "green", padding: 5, minWidth: 300, alignItems: "center" }}>
          <Text style={{ color: "white" }}>Acertos: {acertos}</Text>
        </View>
        <View style={{ backgroundColor: "red", padding: 5, minWidth: 300, alignItems: "center" }}>
          <Text style={{ color: "white" }}>Erros: {erros}</Text>
        </View>
        <Text style={{ fontSize: 46, fontWeight: "bold" }}>{mensagem}</Text>
        <Text>{formula}</Text>
        <Text style={styles.valor}> {valor1} </Text>
        <Text> {operacao} </Text>
        <Text style={styles.valor}> {valor2} </Text>
        <Text>=</Text>
        <TextInput
          placeholder="0"
          style={styles.valor}
          keyboardType="numeric"
          value={resultado}
          onChangeText={(conteudo) => setResultado(conteudo)}
        />
        <Button
          title="Corrigir"
          onPress={corrigir}

        />


        <StatusBar style="auto" />
      </View>
    </ImageBackground>

  );



}
export default App;


// folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, valor: {
    fontSize: 46
  }
});
