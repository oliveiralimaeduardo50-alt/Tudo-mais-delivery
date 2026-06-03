import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "./screens/Inicio";
import EditarLocal from "./screens/EditarLocal";
import ConfirmarEntrega from "./screens/ConfirmarEntrega";
import PedidoFinalizado from "./screens/PedidoFinalizado";
import Acompanhamento from "./screens/Acompanhamento";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
  name="Delivery"
  component={Inicio}
  options={{ headerShown: false }}
/>
        <Stack.Screen
          name="EditarEndereco"
          component={EditarLocal}
          options={{ title: "Alterar Endereço" }}
        />
        <Stack.Screen
  name="ConfirmarEntrega"
  component={ConfirmarEntrega}
  options={{ headerShown: false }}
  />

<Stack.Screen
  name="PedidoFinalizado"
  component={PedidoFinalizado}
  options={{ headerShown: false }}
  onPress={() =>
  navigation.reset({
    index: 0,
    routes: [{ name: "PedidoFinalizadoD" }],

    
  })
}
  />
  <Stack.Screen
    name="Acompanhamento"
    component={Acompanhamento}
    options={{ headerShown: false}}
    />
    
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
