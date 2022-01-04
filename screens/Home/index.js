import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import HttpClient from '../../network';

LogBox.ignoreAllLogs();
function News(props) {
  const [newsData, setNewsData] = useState([]);
  const [loaded, setLoaded] = useState(true);

  async function fetchNewsData(src) {
    setLoaded(false);
    setNewsData([]);
    HttpClient.get(`/top-headlines?sources=${src}`)
      .then(response => {
        if (response.status === 200) {
          setNewsData(response.data.articles);
        } else {
          setNewsData(null);
        }
        setLoaded(true);
      })
      .catch(error => {
        if (__DEV__) {
          console.log('error ==>', error);
        }
      });
  }

  const renderNewsCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate({
            name: 'NewsDetails',
            params: {
              url: item.url,
            },
          })
        }
        style={styles.cardContainer}>
        <Image
          source={{
            uri: item.urlToImage, //'https://www.gannett-cdn.com/presto/2022/01/03/USAT/a5f875ca-3abd-47f0-94f3-f66a047af0ea-AP_White_House.jpg?auto=webp&crop=5808,3267,x0,y295&format=pjpg&width=1200',
          }}
          style={styles.cardImg}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.subtitle}>Adam ghazalley</Text>
          <Text style={styles.datetime}>
            {moment(item.publishedAt).format('MMM DD')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHorizontalNewsCard = ({item, index}) => {
    return (
      <View style={styles.horizontalCardContainer}>
        <Text style={styles.cardtitle}>BASED ON YOUR READING HISTORY</Text>
        <View style={styles.cardDescription}>
          <Text style={styles.cardDescriptionText}>{item.title}</Text>
          <Image
            source={{
              uri: item.urlToImage,
            }}
            style={styles.cardDescriptionImg}
          />
        </View>
        <Text style={styles.name}>Chris Bank</Text>
        <Text style={styles.name}>
          {moment(item.publishedAt).format('MMM DD')}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    fetchNewsData('usa-today');
  }, []);

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </SafeAreaView>
    );
  } else if (!newsData?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.primaryText}>No data found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatlistStyle}
        data={newsData}
        renderItem={renderNewsCard}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={newsData}
        renderItem={renderHorizontalNewsCard}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
  cardContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ddd',
    elevation: 5,
    shadowOpacity: 0.1,
  },
  cardImg: {
    width: 300,
    height: 100,
  },
  cardDetails: {
    marginLeft: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 20,
  },
  datetime: {
    fontSize: 10,
    fontWeight: '400',
    color: '#757575',
  },
  flatlistStyle: {marginVertical: 30},
  horizontalCardContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  cardtitle: {color: '#757575', fontSize: 12},
  cardDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDescriptionText: {fontWeight: 'bold', fontSize: 16, flex: 0.7},
  cardDescriptionImg: {width: 65, height: 65, flex: 0.3},
  name: {color: '#757575', fontSize: 12, fontWeight: '400'},
});

export default News;
