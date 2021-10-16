import React, { useState, useEffect } from 'react'
import Textarea from 'react-native-textarea';
import { View, StyleSheet, Text } from 'react-native';

function CertificationInput(props) {
  const { handleCertification, certificationData } = props;

  const [valueText, setValueText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (handleCertification) {
      !error && handleCertification(valueText)
    }
  }, [])

  useEffect(() => {
    certificationData && setValueText(certificationData);
  }, [certificationData])

  const handleChangeText = (e) => {
    setValueText(e);
    // console.log(e);
  }

  const handleSubmitText = () => {
    handleCertification && handleCertification(valueText, null);
    setError('');
  }

  const handleCheckErr = () => {
    setError('Độ dài trưởng phải lớn hơn 10 kí tự');
    handleCertification && handleCertification(null, 'Độ dài trưởng phải lớn hơn 30 kí tự')
  }

  const handleValidate = () => {
    (valueText.length < 10) ? handleCheckErr() : handleSubmitText()
  }

  return (
    <View>
      <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={handleChangeText}
        defaultValue={valueText}
        maxLength={120}
        placeholder={'Nhập các chứng chỉ bạn có'}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
        onBlur={handleValidate}
      />
      <Text style={styles.textError}>{error && error}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  textareaContainer: {
    width: '100%',
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5,
    fontSize: 17,
    fontFamily: 'Gluten-ExtraLight'
  },
  textError: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#A12121'
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  labelText: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Gluten-ExtraLight'
  },
});
export default CertificationInput
