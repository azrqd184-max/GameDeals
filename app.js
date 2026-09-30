import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const GAMES = [
  { name: "Cyberpunk 2077", store: "Steam", price: "$29.99" },
  { name: "Forza Horizon 5", store: "Steam", price: "$39.99" },
  { name: "EA SPORTS FC", store: "EA", price: "$34.99" },
  { name: "Grand Theft Auto V", store: "Steam", price: "$14.99" },
  { name: "Red Dead Redemption 2", store: "Rockstar", price: "$19.99" },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredGames = GAMES.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (name) => {
    setFavorites((old) =>
      old.includes(name)
        ? old.filter((item) => item !== name)
        : [...old, name]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎮 GameDeals</Text>
      <Text style={styles.subtitle}>قارن أسعار الألعاب واكتشف التخفيضات</Text>

      <TextInput
        style={styles.search}
        placeholder="ابحث عن لعبة..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView>
        {filteredGames.map((game) => {
          const favorite = favorites.includes(game.name);

          return (
            <View style={styles.card} key={game.name}>
              <View style={{ flex: 1 }}>
                <Text style={styles.gameName}>{game.name}</Text>
                <Text style={styles.store}>{game.store}</Text>
                <Text style={styles.price}>{game.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.favorite}
                onPress={() => toggleFavorite(game.name)}
              >
                <Text style={styles.favoriteText}>
                  {favorite ? "❤️" : "♡"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {filteredGames.length === 0 && (
          <Text style={styles.noResults}>ما لقيتش هاد اللعبة 😕</Text>
        )}
      </ScrollView>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>🏠 الرئيسية</Text>
        <Text style={styles.bottomText}>❤️ المفضلة ({favorites.length})</Text>
        <Text style={styles.bottomText}>👤 الحساب</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090d",
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  logo: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: 14,
    marginBottom: 20,
  },
  search: {
    backgroundColor: "#181820",
    color: "#ffffff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#181820",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  gameName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  store: {
    color: "#999999",
    marginTop: 5,
  },
  price: {
    color: "#ff4f8b",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
  },
  favorite: {
    padding: 10,
  },
  favoriteText: {
    fontSize: 28,
  },
  noResults: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 17,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#292933",
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomText: {
    color: "#bbbbbb",
    fontSize: 12,
  },
});
