import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { Audio } from "expo-av";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FIREBASE_APP } from "../../FirebaseConfig";

interface Music {
  title: string;
  url: string;
}

const MusicPlayer: React.FC = () => {
  const [musicData, setMusicData] = useState<Music[]>([]);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  useEffect(() => {
    const fetchMusicData = async () => {
      const storage = getStorage(FIREBASE_APP);
      const musicList: Music[] = [];
      const filePaths = [
        "music/ThienLyOiPianoVersion-JackJ97-13880274.mp3", // Đường dẫn chính xác đến tệp nhạc
      ];

      try {
        for (const path of filePaths) {
          const url = await getDownloadURL(ref(storage, path));
          musicList.push({ title: path.split("/").pop() || "Unnamed", url });
        }
        setMusicData(musicList);
      } catch (error) {
        console.error("Error fetching music data:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu nhạc.");
      }
    };

    fetchMusicData();
  }, []);

  const playMusic = async (url: string) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={musicData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Button title={item.title} onPress={() => playMusic(item.url)} />
        )}
      />
    </View>
  );
};

export default MusicPlayer;
