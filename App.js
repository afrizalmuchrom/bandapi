import { View, Text,TouchableOpacity, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

 const handleGethotel = async () => {

  const today = () => new Date();

  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  };

  let token = 'ya29.a0AXooCgviB8L3eoZj0LzrWoSkfDRYFKkpbpD0RfMCmfKiaockF7Fl2G8OI0qm_Les6CswolicozwzGh1bLvtx3u_ntoRjHWhF7K5FNTVJoH7NRK43U_-X3UIPWIU02vSy2IwakCrknkXgOtGNXOveFY0OFFQX8CQasZn2aCgYKAfQSARISFQHGX2MiFcydz80mMeA6C-G3pFaGmQ0171';

  try {
      const response = await fetch('https://fitness.googleapis.com/fitness/v1/users/me/sessions?startTime='+yesterday().toISOString().split('T')[0]+'T00:00:00.000Z&endTime='+today().toISOString().split('T')[0]+'T23:59:59.999Z', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }});

      const json = await response.json();
      return json;
        
  } catch (error) {
    console.error(error);
  }
  };




  const todate = (date) => {
    let full= new Date(date);
    let bln = full.getMonth()+1;
    let hr = full.getDate();
    let thn = full.getFullYear();
    let jam = full.getHours();
    let mnt = full.getMinutes();
    return hr+'/'+bln+'/'+thn+'  '+jam+':'+mnt;
  }

  
  let form = {nama: 'izal', nrp: 123456, email: 'izal060794@gmail.com'}

  
export default function App() {

  const [data, setData] = React.useState({});
  const [nama, onChangeNama] = React.useState(form.nama);
  const [email, onChangeEmail] = React.useState(form.email);
  const [number, onChangeNumber] = React.useState(form.nrp);
  // const [data, setData] = useState(ses.session[0]);

  const ses = {
    session : [
      { 
        id: 'healthkkit-0231321321-sfsfsd',
        name: 'tidur',
        startTimeMillis: "1716300840000",
        endTimeMillis: "1716327000000",
      },
      { 
        id: 'healthkkit-0231321321-sfsfsd',
        name: 'tidur',
        startTimeMillis: "1716300840000",
        endTimeMillis: "1716327000000",
      }
    ]
  }

  AsyncStorage.getItem('form').then(
    (value) => {
      console.log(JSON.parse(value))
      onChangeNama(JSON.parse(value).nama);
      onChangeEmail(JSON.parse(value).email);
      onChangeNumber(JSON.parse(value).nrp);

    }
  );

  const getbut = () => {

    handleGethotel().then(
      (val) => {
        console.log(val)
        // console.log(val)
        setData(ses.session[0]);
        // setData(val.session[0]);
        
    },[]);

    console.log('geting')

  }

  const sentdata = () => {

    AsyncStorage.setItem('form', JSON.stringify({nama: nama, nrp: number, email: email}))

  }



  function diff_hours(dt2, dt1) 
 {
  // Calculate the difference in milliseconds between the two provided Date objects by subtracting the milliseconds value of dt1 from the milliseconds value of dt2
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
 }
  const getjam = (a,b)=>{
    dt1 = new Date(a);
    dt2 = new Date(b);
    return diff_hours(dt1, dt2); 
  }


  const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
    idperangkat,
  }) => (
    <View style={{padding: 20, flex: 1, marginTop:100, backgroundColor:'aliceblue'}}>
      <Text style={[styles.label,{fontWeight:'bold'}]}>{label}</Text>
      <View style={{flexDirection:'column'}}>
        <TouchableOpacity
        onPress={getbut}
        style={[styles.buttonget,{width:'100%', marginBottom:4}]}>
          <Text
            style={[
              styles.label,
            ]}>
           Durasi Tidur {getjam(values[1],values[0])} Jam
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {
        values.map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}>
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}>
              {todate(value).toString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={styles.labelfoot}>{idperangkat}</Text> */}
      <View>
      <TextInput
          key='nrp'
          style={styles.input}
          onChangeText={text => onChangeNumber({text})}
          value={number}
          placeholder="NRP"
          keyboardType="numeric"
        />

        <TextInput
          key='nama'
          style={styles.input}
          onChangeText={onChangeNama}
          placeholder="Nama"
          value={nama}
        />

        <TextInput
          key='email'
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
        
      </View>
      <View style={{flexDirection:'column'}}>
      <TouchableOpacity
      onPress={sentdata}
      style={[styles.button,styles.selected,{width:'100%'}]}>
        <Text
          style={[
            styles.label,{fontWeight:'bold'}
          ]}>
          📤 KIRIM DATA
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <PreviewLayout
      label="INFORMASI"
      values={[Number(data.startTimeMillis), Number(data.endTimeMillis)]}
      idperangkat={data.id}
      >

    </PreviewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    minWidth: '48%',
    textAlign: 'center',
  },
  buttonget: {
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: 'coral',
    textAlign:'center',
    fontWeight:'bold',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  labelfoot: {
    textAlign: 'center',
    margin: 3,
    fontSize: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
