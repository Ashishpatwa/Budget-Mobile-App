import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Header from '../components/header';
import {addBudget} from '../redux/addItemsSlice';
import {useAppDispatch} from '../redux/store';
import {Picker} from '@react-native-picker/picker';
import Footer from '../components/footer';

const BudgetEntry = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [useMonth, setMonth] = useState('January');
  const [useName, setName] = useState('');
  const [usePlannedAmount, setPlannedAmount] = useState('');
  const [useActualAmount, setActualAmount] = useState('');

  const [errName, setErrName] = useState('');
  const [errPlannedAmount, setErrPlannedAmount] = useState('');
  const [errActualAmount, setErrActualAmount] = useState('');

  const dispatch = useAppDispatch();
  const payload = {
    name: useName,
    plannedAmount: usePlannedAmount,
    actualAmount: useActualAmount,
    month: useMonth,
  };

  const handleMonth = (itemValue: string) => {
    setMonth(itemValue);
  };

  const handleSave = () => {
    let nameError = '';
    let plannedAmountError = '';
    let actualAmountError = '';

    {
      !useName
        ? (nameError = 'Please enter a name')
        : !isNaN(parseInt(useName))
        ? (nameError = 'Please enter a String')
        : (nameError = '');
    }

    {
      !usePlannedAmount
        ? (plannedAmountError = 'Please fill an Amount')
        : isNaN(parseInt(usePlannedAmount))
        ? (plannedAmountError = 'Please enter a value')
        : (plannedAmountError = '');
    }

    {
      !useActualAmount
        ? (actualAmountError = 'Please fill an Amount')
        : isNaN(parseInt(useActualAmount))
        ? (actualAmountError = 'Please enter a value')
        : parseInt(usePlannedAmount) < parseInt(useActualAmount)
        ? (actualAmountError =
            'Actual amount must be smaller than planned Amount')
        : (actualAmountError = '');
    }

    setErrName(nameError);
    setErrPlannedAmount(plannedAmountError);
    setErrActualAmount(actualAmountError);

    if (!nameError && !plannedAmountError && !actualAmountError) {
      setName('');
      setActualAmount('');

      dispatch(addBudget(payload));
    }
  };

  return (
    <View style={{backgroundColor: '#f1f1f1', position: 'relative'}}>
      <Header name="Budget Entry" />

      <View style={styles.container}>
        <View style={{paddingBottom: 22, paddingTop: 10}}>
          <Text style={{fontSize: 22, fontWeight: '500', fontStyle: 'italic'}}>
            Add your budget:--{' '}
          </Text>
        </View>

        <View style={styles.horizontalContainer}>
          <View style={{flex: 1}}>
            <View style={{paddingBottom: 25}}>
              <Text style={styles.horizontalLabelStyle}>Month</Text>
            </View>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={useMonth}
                style={{color: '#494949'}}
                onValueChange={handleMonth}>
                <Picker.Item
                  label="January"
                  style={styles.picker}
                  value="January"
                />
                <Picker.Item
                  label="February"
                  style={styles.picker}
                  value="February"
                />
                <Picker.Item
                  label="March"
                  style={styles.picker}
                  value="March"
                />
                <Picker.Item
                  label="April"
                  style={styles.picker}
                  value="April"
                />
                <Picker.Item label="May" style={styles.picker} value="May" />
                <Picker.Item label="June" style={styles.picker} value="June" />
                <Picker.Item label="July" style={styles.picker} value="July" />
                <Picker.Item
                  label="August"
                  style={styles.picker}
                  value="August"
                />
                <Picker.Item
                  label="September"
                  style={styles.picker}
                  value="September"
                />
                <Picker.Item
                  label="October"
                  style={styles.picker}
                  value="October"
                />
                <Picker.Item
                  label="November"
                  style={styles.picker}
                  value="November"
                />
                <Picker.Item
                  label="December"
                  style={styles.picker}
                  value="December"
                />
              </Picker>
              {/* <Text>{useMonth}</Text> */}
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={{paddingBottom: 25}}>
              <Text style={styles.horizontalLabelStyle}>Planned Amount</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                value={usePlannedAmount}
                onChangeText={text => setPlannedAmount(text)}
                keyboardType="numeric"
                placeholder="Enter an Amount"
              />
              {errPlannedAmount ? (
                <Text style={styles.errorMessage}>{errPlannedAmount}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelStyle}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              value={useName}
              onChangeText={text => setName(text)}
              placeholder="Enter a Name"
            />
            {errName ? (
              <Text style={styles.errorMessage}>{errName}</Text>
            ) : null}
          </View>
        </View>

        {/* <View style={styles.row}>
    <Text style={styles.labelStyle}>Planned Amount</Text>
    <View style={styles.inputContainer}>
      <TextInput style={styles.inputStyle} value={usePlannedAmount} onChangeText={(text)=> setPlannedAmount(text)} keyboardType="numeric"  placeholder='Enter an Amount'/>
      {errPlannedAmount ? <Text style={styles.errorMessage}>{errPlannedAmount}</Text> : null}
    </View>
  </View> */}

        <View style={styles.row}>
          <Text style={styles.labelStyle}>Actual Amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              value={useActualAmount}
              onChangeText={text => setActualAmount(text)}
              keyboardType="numeric"
              placeholder="Enter an Amount"
            />
            {errActualAmount ? (
              <Text style={styles.errorMessage}>{errActualAmount}</Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            gap: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 35,
          }}>
          <TouchableOpacity
            onPress={() => handleSave()}
            style={{backgroundColor: '#2f7fe1e8', borderRadius: 10, flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                padding: 9,
                textAlign: 'center',
              }}>
              {' '}
              Save{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Show Items')}
            style={{backgroundColor: '#2f7fe1e8', borderRadius: 10, flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                padding: 9,
                textAlign: 'center',
              }}>
              {' '}
              Show Items{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    fontSize: 21,
  },
  titleContainer: {
    paddingTop: 52,
    paddingBottom: 150,
    paddingLeft: 20,
    backgroundColor: '#f04e4eeb',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },

  textStyle: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 35,
  },
  container: {
    height: 500,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    marginTop: -125,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputContainer: {
    height: 45,
    flex: 1.2,
  },
  labelStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  inputStyle: {
    fontSize: 18,
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  horizontalContainer: {
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 30,
  },
  horizontalLabelStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },

  saveButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingTop: 50,
    paddingBottom: 50,
    // paddingBottom: 10
  },

  showButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingTop: 50,
    paddingBottom: 50,
  },
  errorMessage: {
    color: 'red',
    fontSize: 17,
    paddingLeft: 0,
    // backgroundColor: 'gray',
    paddingTop: 2,
  },
});

export default BudgetEntry;
