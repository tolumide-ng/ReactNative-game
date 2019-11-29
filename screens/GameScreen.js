import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;

	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return randomNumber;
};

const renderListItem = (value, numOfRounds) => {
	return (
		<View key={value} style={styles.listItem}>
			<View>
				<Text>#{numOfRounds}</Text>
			</View>
			<Text>{value}</Text>
		</View>
	);
};

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoise);

	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "Haha! we both know that was wrong", [
				{ text: "sorry", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds(curRounds => curRounds + 1);
		setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
	};

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<View style={styles.screen}>
				<Text>Opponent's Guess: </Text>
				<NumberContainer>{currentGuess}</NumberContainer>
				<Card style={styles.buttonContainer}>
					<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
						<Ionicons name="md-remove" color="white" size={24} />
					</MainButton>
					<MainButton
						onPress={nextGuessHandler.bind(this, "greater")}
					>
						<Ionicons name="md-add" color="white" size={24} />
					</MainButton>
				</Card>
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) =>
							renderListItem(guess, pastGuesses.length - index)
						)}
					</ScrollView>
					{/* <ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) => (
							<Text>{}</Text>
						))}
					</ScrollView> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "90%",
	},
	list: {
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		flexGrow: 1,
	},
	listContainer: { flex: 1, width: "80%" },
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		// flex: 1,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "60%",
	},
});

export default GameScreen;
