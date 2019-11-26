import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = props => <Text style={style.body}>{props.children}</Text>;

const styles = StyleSheet.create({
	body: {
		fontFamily: "open-sans-bold",
	},
});

export default BodyText;
