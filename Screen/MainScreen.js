import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RoundButton from '../RoundButton';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [scannedItems, setScannedItems] = useState([]);

  useEffect(() => {
    if (route.params?.barcodeData) {
      setScannedItems(prevItems => [...prevItems, route.params.barcodeData]);
    }
  }, [route.params?.barcodeData]);

  const Searchbt = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={Styles.container}>
      <Header onSearchPress={Searchbt} />
      <View style={Styles.horizontalLine} />
      <ScannedItemList scannedItems={scannedItems} />
      <RoundButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

const Header = ({ onSearchPress }) => (
  <View style={Styles.topRow}>
    <View style={Styles.logoContainer}>
      <Text style={Styles.logo}>Categorie</Text>
    </View>
    <TouchableOpacity onPress={onSearchPress}>
      <Image
        style={Styles.search}
        source={require('../assets/search.png')}
      />
    </TouchableOpacity>
  </View>
);

const ScannedItemList = ({ scannedItems }) => (
  <FlatList
    data={scannedItems}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
    <View style={Styles.scannedItem}>
      <View style={Styles.itemInfo}>
        <Text style={Styles.prnm}>{`${item.prnm}`}</Text>
        <Text style={Styles.deadline}>{`${item.deadline}`}</Text>
        <Text>{`${item.data}`}</Text>
      </View>
      <Image
        style={Styles.itemImage}
        source={require('../assets/post.png')} // 이미지 경로를 정확하게 입력해주세요.
      />
    </View>
    )}
  />
);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 10,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  search: {
    width: 30,
    height: 30,
  },
  HomeText: {
    marginTop: 20,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  scannedItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },scannedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemImage: {
    width: 80, // 이미지의 너비 조정
    height: 80, // 이미지의 높이 조정
    borderRadius: 25, // 원형 이미지로 보이도록 설정
  },
  prnm: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  deadline:{
    textDecorationLine: 'underline',
  }
});

export default MainScreen;
