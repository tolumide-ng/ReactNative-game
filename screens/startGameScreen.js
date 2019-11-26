import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";

const StartGameScreen = props => {
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
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invlaid Number!",
				"Number has to be between 1 and 99",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: resetInputHadler,
					},
				]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected: </Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					title="START GAME"
					onPress={() => props.onStartGame(selectedNumber)}
				/>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a new Game!</Text>
				<Card style={styles.inputContainer}>
					<BodyText>Select a Number</BodyText>
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
								onPress={resetInputHadler}
								color={Colors.primary}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								onPress={confirmInputHandler}
								color={Colors.accent}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
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
		fontFamily: "open-sans-bold",
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
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
});

export default StartGameScreen;
