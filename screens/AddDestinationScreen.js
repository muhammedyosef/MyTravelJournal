import { View, TextInput, StyleSheet, Image, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { DestinationContext } from "../store/context/DestinationContext";
import * as ImagePicker from "expo-image-picker";
import { ThemeContext } from "../store/context/ThemContext";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  //   image: Yup.string().required("Image URI is required"),
});
const AddDestinationScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { addDestination } = useContext(DestinationContext);
  const { colors } = useContext(ThemeContext);

  async function verifyPermissionHandler() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant storage permission to use this app"
      );
      return false;
    }
    return true;
  }
  const pickImage = async () => {
    const hasPermission = await verifyPermissionHandler();

    if (!hasPermission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);
          console.log("Image:", image);
          addDestination({ ...values, image });
          navigation.goBack();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
              style={{
                marginBottom: 16,
                backgroundColor: colors.buttonBackground,
              }}
              textStyle={{ color: colors.buttonText }}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 200, marginBottom: 16 }}
              />
            )}
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.text },
              ]}
              placeholder="Title"
              placeholderTextColor={colors.text}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            {touched.title && errors.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.cardBackground, color: colors.text },
              ]}
              placeholder="Description"
              placeholderTextColor={colors.text}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            {touched.image && errors.image && (
              <Text style={styles.error}>{errors.image}</Text>
            )}
            <Button title="Add Destination" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
export default AddDestinationScreen;
