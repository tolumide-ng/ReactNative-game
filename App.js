import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/startGameScreen";

export default function App() {
	return (
		<View style={styles.screen}>
			<Header title={"Guess a Number"} />
			<StartGameScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	scree: {
		flex: 1,
	},
});
