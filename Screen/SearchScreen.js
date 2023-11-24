import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('식품');

  const goBack = () => {
    navigation.goBack();
  };

  const updateSearch = (text) => {
    setSearch(text);
    fetchProductDataFromFirestore(selectedCategory, text);
  };

  const fetchProductDataFromFirestore = async (category = selectedCategory, searchTerm = '') => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const productsRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("product")
        .doc("cate")
        .collection(category);
  
      const querySnapshot = await productsRef.get();
      const products = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          prnm: data.prname,
          data: data.brnum,
          deadline: data.deadline,
        });
      });
  

      setSearchResults(products.filter(item =>
        item.data.includes(searchTerm) || item.prnm.includes(searchTerm)
      ));
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.goBackButtonContainer} onPress={goBack}>
          <Text style={styles.goBackButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textForm}
          placeholder={'바코드 번호, 제품명을 입력하세요.'}
          value={search}
          onChangeText={updateSearch}
        />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.searchResultItem}>
            <Text>{item.prnm}</Text>
            <Text>{item.data}</Text>
            <Text>{item.deadline}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  goBackButtonContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textForm: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default SearchScreen;