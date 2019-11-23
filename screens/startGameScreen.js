import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";

const StartGameScreen = () => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = inputText => {
		console.log("this is the inpuText", inputText);
		setEnteredValue(inputText.replace(/[^0-9\.]+/g, ""));
	};

	const resetInputHadler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a new Game!</Text>
				<Card style={styles.inputContainer}>
					<Text>Select a Number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								onPress={() => {}}
								color={Colors.primary}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								onPress={resetInputHadler}
								color={Colors.accent}
							/>
						</View>
					</View>
				</Card>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		padding: 10,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		padding: 15,
	},
	button: {
		width: 100,
	},
	input: {
		width: 40,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default StartGameScreen;
