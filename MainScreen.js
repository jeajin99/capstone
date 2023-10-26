import React from 'react';
import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundButton from './RoundButton';

const MainScreen = () => {
    const navigation = useNavigation();
        return (
            <View style={Styles.container}>
                <View style={Styles.topLogo}>
                <Text style={Styles.logo}>Categorie</Text>
                <View style={Styles.horizontalLine} />
                </View>

                <Text style={Styles.HomeText}>+ 버튼 : 바코드 찍는 창으로 넘어감</Text>
                    <RoundButton onPress={() => navigation.navigate('Scanner')} />
            </View>
        );
};

const Styles = {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 0,
      paddingVertical: 20,
    },
    topLogo: {
        alignItems: 'left',
        marginTop: 20
      },
      logo: {
        fontSize: 40,
        fontWeight: 'bold',
      },
      horizontalLine: {
        height: 0.5, 
        backgroundColor: '#000', // 선의 색상
        marginVertical: 10, // 선 위아래 여백 조절
    }
  };
export default MainScreen;