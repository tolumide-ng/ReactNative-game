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
			<View>#{numOfRounds}</View>
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
		<View style={styles.screen}>
			<Text>Opponent's Guess: </Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" color="white" size={24} />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name="md-add" color="white" size={24} />
				</MainButton>
			</Card>
			<View style={styles.list}>
				<ScrollView>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		// flex: 1,
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
		width: "80%",
	},
	listItem: {
		flex: 1,
		borderColor: "#ccc",
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GameScreen;
