import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const utcancun = {
  longitude: -86.84692404976826,
  latitude: 21.048448600243574,
};

const pueblosMagicos = [
  {
    id: "1",
    name: "Izamal",
    description:
      "Conocida como la ciudad amarilla y hogar del convento de San Antonio de Padua.",
    image: require("../../assets/image/izamal.jpg"),
    latitude: 20.935,
    longitude: -89.009,
  },
  {
    id: "2",
    name: "Valladolid",
    description:
      "Hermosa ciudad colonial con un impresionante cenote en su centro.",
    image: require("../../assets/image/valladolid.jpg"),
    latitude: 20.688,
    longitude: -88.201,
  },
  {
    id: "3",
    name: "Sisal",
    description:
      "Un encantador puerto con playas vírgenes y un fuerte histórico.",
    image: require("../../assets/image/sisal.png"),
    latitude: 21.165,
    longitude: -90.025,
  },
  {
    id: "4",
    name: "Maní",
    description:
      "Famoso por su historia y su increíble gastronomía, especialmente la cochinita pibil.",
    image: require("../../assets/image/mani.png"),
    latitude: 20.432,
    longitude: -89.39,
  },
];

export default function Map() {
  const mapRef = useRef(null);

  const navigateToLocation = (latitude, longitude) => {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: utcancun.latitude,
          longitude: utcancun.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={utcancun} title="UT Cancún" />
        {pueblosMagicos.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={{ latitude: pueblo.latitude, longitude: pueblo.longitude }}
            title={pueblo.name}
          />
        ))}
      </MapView>
      <FlatList
        data={pueblosMagicos}
        horizontal
        style={styles.listContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateToLocation(item.latitude, item.longitude)}
            >
              <Text style={styles.buttonText}>Ver en Mapa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    position: "absolute",
    bottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: "gray",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
