import React from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import {useAppDispatch, useAppSelector} from '../redux/store';
import cardContainer from '../styles/Cardcontainer';
import Footer from '../components/footer';

const ShowItems = () => {
  const showItems = useAppSelector(state => state.items.budgetItems);

  const monthWiseData = showItems.reduce((accumulator: any, item) => {
    if (!accumulator[item.month]) {
      accumulator[item.month] = [];
    }
    accumulator[item.month].push(item);
    return accumulator;
  }, {});

  return (
    <View style={{backgroundColor: '#f1f1f1'}}>
      <Header name="Show Items" />

      <View style={cardContainer.container}>
        {Object.keys(monthWiseData).map(month => (
          <View key={month}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                textAlign: 'center',
                paddingBottom: 20,
                paddingTop: 30,
              }}>
              {month}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                paddingLeft: 0,
                marginBottom: 15,
              }}>
              {' '}
              Planned Amount: {monthWiseData[month][0].plannedAmount}
            </Text>

            {/* <View style={{flex:1, flexDirection: 'row', paddingBottom: 20}}>
        <Text style={{fontSize: 20, fontWeight: '500', flex: 1, paddingLeft: 20}}>Planned Amount:</Text>
        <Text style={{fontSize: 20, fontWeight: '500', flex: 1, paddingLeft: 20}}> {monthWiseData[month][0].plannedAmount}</Text>
    </View> */}

            <FlatList
              data={monthWiseData[month]}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        flex: 1,
                        paddingLeft: 20,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        flex: 1,
                        paddingLeft: 20,
                      }}>
                      {' '}
                      {item.actualAmount}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ))}
      </View>
      <Footer />
    </View>
  );
};

export default ShowItems;
