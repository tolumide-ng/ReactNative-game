import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOver = props => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over</TitleText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode="cover"
				/>
				{/* <Image source={{uri: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiQ-72zyIjmAhUssaQKHRnzCcAQjRx6BAgBEAQ&url=https%3A%2F%2Fgithub.com%2Ftolumide-ng&psig=AOvVaw3W1U4U5ANgomW_NlyZ_o0J&ust=1574881291961371'}} /> */}
			</View>

			{/* <BodyText>Number of rounds: {props.rounds}</BodyText>
			<BodyText>Number: {props.userNumber}</BodyText> */}
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed{" "}
					<Text style={Colors.primary}>{props.rounds} </Text> rounds
					to guess the number{" "}
					<Text style={Colors.primary}> {props.userNumber}</Text>
				</BodyText>
			</View>

			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
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
	resultContainer: {
		marginHorizontal: 20,
		marginVertical: 10,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		borderRadius: 200,
		borderWidth: 3,
		borderColor: "black",
		width: "80%",
		height: 300,
		overflow: "hidden",
		marginVertical: 30,
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
	resultText: {
		textAlign: "center",
		fontSize: 20,
	},
});

export default GameOver;
