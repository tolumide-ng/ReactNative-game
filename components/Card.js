import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

const Card = props => {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26, // Needed to work on iOS
		shadowRadius: 6,
		backgroundColor: "white",
		elevation: 12, // Needed to work on android
		padding: 20,
		borderRadius: 10,
	},
});

export default Card;
