import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { setRecoveryProps } from "expo/build/ErrorRecovery/ErrorRecovery";

const GameOver = props => {
	return (
		<View style={styles.screen}>
			<Text>The Game is Over</Text>
			<Text>Number of rounds: {props.rounds}</Text>
			<Text>Number: {props.userNumber}</Text>
			<Button title="NEW GAME" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
});

export default GameOver;
