import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMusicData = async () => {
      const storage = getStorage(FIREBASE_APP);
      const musicList: Music[] = [];
      const filePaths = [
        "music/Là Ai Mang Nắng Đi Xa.mp3",
        "music/Hẹn Em Dưới Ánh Trăng.mp3",
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

    // Dừng âm thanh khi component unmount
    return () => {
      stopMusic();
    };
  }, []);

  const playMusic = async (url: string, index: number) => {
    if (sound) {
      await stopMusic(); // Dừng âm thanh hiện tại nếu có
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    setCurrentIndex(index);
    await newSound.playAsync();
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Giải phóng tài nguyên
      setSound(undefined); // Đặt sound về undefined
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % musicData.length;
    playMusic(musicData[nextIndex].url, nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    playMusic(musicData[prevIndex].url, prevIndex);
  };

  const handleLogout = async () => {
    await stopMusic(); // Dừng nhạc khi đăng xuất
    // Thực hiện các hành động đăng xuất khác ở đây
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <FlatList
        data={musicData}
        keyExtractor={(item) => item.url}
        renderItem={({ item, index }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item.title}
              onPress={() => playMusic(item.url, index)}
            />
          </View>
        )}
      />
      {isPlaying && (
        <View style={styles.controls}>
          <Button title="Previous" onPress={previousTrack} />
          <Button title="Stop Music" onPress={stopMusic} />
          <Button title="Next" onPress={nextTrack} />
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    width: "100%",
  },
});

export default MusicPlayer;
